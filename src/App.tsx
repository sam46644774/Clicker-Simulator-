import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MousePointer2, 
  Zap, 
  TrendingUp, 
  History, 
  Save, 
  RefreshCw,
  ChevronRight,
  Cpu,
  Factory,
  Bot,
  LayoutGrid,
  MousePointerClick,
  Database
} from 'lucide-react';
import { GameState, UPGRADES, Upgrade, CHANGELOG } from './types';

const SAVE_ID = 'player_one'; 

const formatNumber = (num: number) => {
  if (num < 1000) return Math.floor(num).toString();
  const suffixes = ['', 'k', 'M', 'B', 'T', 'P', 'E'];
  const suffixNum = Math.floor(("" + Math.floor(num)).length / 3);
  let shortValue: string | number = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};

export default function App() {
  const [state, setState] = useState<GameState>({
    currency: 0,
    totalCurrencyEarned: 0,
    clickCount: 0,
    upgrades: {},
    lastSave: Date.now()
  });

  const [floatingTexts, setFloatingTexts] = useState<{ id: number; x: number; y: number; value: number }[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [activeTab, setActiveTab] = useState<'clicker' | 'upgrades'>('clicker');

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        // Prevent scrolling with space
        if (e.code === 'Space') e.preventDefault();
        
        // Trigger click if modal is not open
        if (!showChangelog) {
          const clickerBtn = document.getElementById('main-clicker-btn');
          if (clickerBtn) {
            clickerBtn.click();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showChangelog]);

  // Load game
  useEffect(() => {
    const loadGame = async () => {
      try {
        const res = await fetch(`/api/save/${SAVE_ID}`);
        if (res.ok) {
          const data = await res.json();
          setState(data);
        }
      } catch (e) {
        console.error("Failed to load save", e);
      }
    };
    loadGame();
  }, []);

  // Save game
  const saveGame = useCallback(async (currentState: GameState) => {
    setIsSaving(true);
    try {
      await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: SAVE_ID, data: currentState })
      });
    } catch (e) {
      console.error("Failed to save", e);
    } finally {
      setTimeout(() => setIsSaving(false), 1000);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame(state);
    }, 30000);
    return () => clearInterval(interval);
  }, [state, saveGame]);

  // Calculate stats
  const clickPower = 1 + UPGRADES
    .filter(u => u.type === 'click')
    .reduce((acc, u) => acc + (state.upgrades[u.id] || 0) * u.power, 0);

  const autoPower = UPGRADES
    .filter(u => u.type === 'auto')
    .reduce((acc, u) => acc + (state.upgrades[u.id] || 0) * u.power, 0);

  // Game Loop for Auto-Clickers
  useEffect(() => {
    if (autoPower === 0) return;
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        currency: prev.currency + autoPower,
        totalCurrencyEarned: prev.totalCurrencyEarned + autoPower
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoPower]);

  const handleMainClick = (e: React.MouseEvent | React.TouchEvent) => {
    const value = clickPower;
    setState(prev => ({
      ...prev,
      currency: prev.currency + value,
      totalCurrencyEarned: prev.totalCurrencyEarned + value,
      clickCount: prev.clickCount + 1
    }));

    const id = Date.now();
    let x, y;
    if ('clientX' in e) {
      x = e.clientX;
      y = e.clientY;
    } else {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    setFloatingTexts(prev => [...prev, { id, x, y, value }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 1000);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const currentLevel = state.upgrades[upgrade.id] || 0;
    const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));

    if (state.currency >= cost) {
      setState(prev => ({
        ...prev,
        currency: prev.currency - cost,
        upgrades: {
          ...prev.upgrades,
          [upgrade.id]: currentLevel + 1
        }
      }));
    }
  };

  const getUpgradeCost = (upgrade: Upgrade) => {
    const currentLevel = state.upgrades[upgrade.id] || 0;
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, currentLevel));
  };

  const getIcon = (id: string) => {
    switch(id) {
      case 'basic_click': return <MousePointer2 className="w-5 h-5" />;
      case 'auto_clicker': return <Bot className="w-5 h-5" />;
      case 'mega_click': return <Zap className="w-5 h-5" />;
      case 'factory': return <Factory className="w-5 h-5" />;
      case 'quantum_processor': return <Cpu className="w-5 h-5" />;
      case 'data_store': return <Database className="w-5 h-5" />;
      default: return <TrendingUp className="w-5 h-5" />;
    }
  };

  const renderChangelogSection = (title: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-6">
        <h4 className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-1 h-1 bg-emerald-500 rounded-full" />
          {title}
        </h4>
        <ul className="space-y-2 pl-3 border-l border-zinc-800">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-zinc-400 leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-zinc-950 text-zinc-100 overflow-hidden overscroll-none">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-display uppercase tracking-wider text-emerald-400 neon-glow">Neon Genesis</h1>
            <p className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">v0.8.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-zinc-800/50 rounded-full border border-zinc-700/50">
            <Database className={`w-3 h-3 ${isSaving ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">DataStore Sync</span>
          </div>
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Auto-Income</span>
            <span className="text-lg font-mono font-bold text-emerald-400">+{formatNumber(autoPower)}/s</span>
          </div>
          <div className="hidden sm:block h-8 w-[1px] bg-zinc-800" />
          <div className="flex gap-1 sm:gap-2">
            <button 
              onClick={() => setShowChangelog(true)}
              className="p-2 sm:p-3 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Changelog"
            >
              <History className="w-5 h-5" />
            </button>
            <button 
              onClick={() => saveGame(state)}
              disabled={isSaving}
              className="p-2 sm:p-3 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
              title="Save Game"
            >
              {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col sm:flex-row overflow-hidden pb-20 sm:pb-0">
        {/* Left Panel: The Clicker */}
        <section className={`flex-1 flex flex-col items-center justify-start sm:justify-center relative p-6 sm:p-12 border-r border-zinc-900 overflow-y-auto custom-scrollbar overscroll-contain touch-pan-y ${activeTab === 'clicker' ? 'flex' : 'hidden sm:flex'}`}>
          <div className="absolute top-6 sm:top-12 left-6 sm:left-12">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] sm:text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Total Earned</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-zinc-300">{formatNumber(state.totalCurrencyEarned)}</span>
            </div>
          </div>

          <div className="text-center mb-8 sm:mb-12">
            <motion.div 
              key={state.currency}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl sm:text-7xl font-display text-white mb-2 tracking-tighter"
            >
              {formatNumber(state.currency)}
            </motion.div>
            <div className="text-emerald-500 font-mono text-xs sm:text-sm uppercase tracking-[0.3em]">Credits</div>
          </div>

          <motion.button
            id="main-clicker-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onMouseDown={handleMainClick}
            onTouchStart={handleMainClick}
            className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-zinc-900 border-2 border-emerald-500/30 flex items-center justify-center group cursor-pointer overflow-hidden neon-border touch-none"
          >
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-emerald-500/10 animate-pulse" />
            </div>
            <Zap className="w-16 h-16 sm:w-24 sm:h-24 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
          </motion.button>

          <div className="mt-8 sm:mt-12 flex gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Click Power</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-zinc-300">+{clickPower}</div>
            </div>
            <div className="text-center sm:hidden">
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Auto/s</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-emerald-400">+{autoPower}</div>
            </div>
            <div className="text-center">
              <div className="text-[9px] sm:text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Total Clicks</div>
              <div className="text-lg sm:text-xl font-mono font-bold text-zinc-300">{state.clickCount.toLocaleString()}</div>
            </div>
          </div>

          {/* Floating Texts */}
          <AnimatePresence>
            {floatingTexts.map(t => (
              <span 
                key={t.id} 
                className="floating-text absolute font-mono font-bold text-emerald-400 text-xl z-50 pointer-events-none"
                style={{ left: t.x - 10, top: t.y - 20 }}
              >
                +{t.value}
              </span>
            ))}
          </AnimatePresence>
        </section>

        {/* Right Panel: Upgrades */}
        <aside className={`w-full sm:w-[400px] bg-zinc-900/30 flex flex-col overflow-hidden overscroll-contain ${activeTab === 'upgrades' ? 'flex' : 'hidden sm:flex'}`}>
          <div className="p-4 sm:p-6 border-b border-zinc-800">
            <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.2em] text-zinc-400">Upgrades & Tech</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar">
            {UPGRADES.map((upgrade) => {
              const cost = getUpgradeCost(upgrade);
              const canAfford = state.currency >= cost;
              const level = state.upgrades[upgrade.id] || 0;

              return (
                <button
                  key={upgrade.id}
                  onClick={() => buyUpgrade(upgrade)}
                  disabled={!canAfford}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 group relative overflow-hidden min-h-[100px] ${
                    canAfford 
                      ? 'bg-zinc-900 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80' 
                      : 'bg-zinc-900/50 border-zinc-800/50 opacity-60 grayscale cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex gap-3 sm:gap-4">
                      <div className={`p-2.5 sm:p-3 rounded-lg ${canAfford ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                        {getIcon(upgrade.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-zinc-200 text-sm sm:text-base">{upgrade.name}</h3>
                          <span className="text-[9px] sm:text-[10px] font-mono bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">LVL {level}</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 leading-relaxed">{upgrade.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-1.5">
                      <Zap className={`w-3 h-3 ${canAfford ? 'text-emerald-500' : 'text-zinc-600'}`} />
                      <span className={`text-xs sm:text-sm font-mono font-bold ${canAfford ? 'text-emerald-400' : 'text-zinc-500'}`}>
                        {formatNumber(cost)}
                      </span>
                    </div>
                    <div className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${canAfford ? 'text-emerald-500' : 'text-zinc-600'}`}>
                      Purchase <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Progress bar background for next level */}
                  <div className="absolute bottom-0 left-0 h-[2px] bg-emerald-500/30 transition-all duration-300" style={{ width: `${Math.min(100, (state.currency / cost) * 100)}%` }} />
                </button>
              );
            })}
          </div>
        </aside>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around h-20 px-4 z-30">
        <button 
          onClick={() => setActiveTab('clicker')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'clicker' ? 'text-emerald-400' : 'text-zinc-500'}`}
        >
          <MousePointerClick className="w-6 h-6" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Clicker</span>
        </button>
        <button 
          onClick={() => setActiveTab('upgrades')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'upgrades' ? 'text-emerald-400' : 'text-zinc-500'}`}
        >
          <LayoutGrid className="w-6 h-6" />
          <span className="text-[10px] font-mono uppercase tracking-widest">Upgrades</span>
        </button>
      </nav>

      {/* Changelog Modal */}
      <AnimatePresence>
        {showChangelog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChangelog(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            >
              <div className="p-5 sm:p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900">
                <h2 className="text-lg sm:text-xl font-display uppercase tracking-wider text-emerald-400">System Logs</h2>
                <button 
                  onClick={() => setShowChangelog(false)}
                  className="text-zinc-500 hover:text-white transition-colors p-2 min-w-[44px] min-h-[44px]"
                >
                  Close
                </button>
              </div>
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1">
                {CHANGELOG.slice(0, 1).map((entry) => (
                  <div key={entry.version} className="mb-10 last:mb-0">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-6">
                      <span className="text-lg font-mono font-bold text-zinc-200">v{entry.version}</span>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{entry.date}</span>
                    </div>
                    
                    {renderChangelogSection('Overhaul', entry.sections.overhaul)}
                    {renderChangelogSection('New Content', entry.sections.newContent)}
                    {renderChangelogSection('Improvements', entry.sections.improvements)}
                    {renderChangelogSection('Enhancements', entry.sections.enhancements)}
                    {renderChangelogSection('QoL', entry.sections.qol)}
                    {renderChangelogSection('Bug Fixes', entry.sections.bugFixes)}
                    {renderChangelogSection('Error Fixes', entry.sections.errorFixes)}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar {
          -webkit-overflow-scrolling: touch;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3f3f46;
        }
      `}</style>
    </div>
  );
}
