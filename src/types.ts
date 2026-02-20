export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  power: number;
  type: 'click' | 'auto';
}

export interface GameSettings {
  showFloatingText: boolean;
  enableAnimations: boolean;
  theme: 'neon' | 'matrix' | 'classic';
}

export interface ResearchUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  power: number;
  type: 'click_mult' | 'auto_mult' | 'cost_reduction';
}

export interface GameState {
  currency: number;
  totalCurrencyEarned: number;
  clickCount: number;
  upgrades: Record<string, number>; // upgradeId -> level
  research: Record<string, number>; // researchId -> level
  lastSave: number;
  settings?: GameSettings;
  prestigeCurrency: number;
  prestigeCount: number;
}

export const UPGRADES: Upgrade[] = [
  {
    id: 'basic_click',
    name: 'Sharpened Finger',
    description: 'Increases click power by 1.',
    baseCost: 10,
    costMultiplier: 1.15,
    power: 1,
    type: 'click'
  },
  {
    id: 'auto_clicker',
    name: 'Nano-Bot',
    description: 'Clicks for you once every second.',
    baseCost: 50,
    costMultiplier: 1.15,
    power: 1,
    type: 'auto'
  },
  {
    id: 'mega_click',
    name: 'Hydraulic Press',
    description: 'Increases click power by 10.',
    baseCost: 500,
    costMultiplier: 1.2,
    power: 10,
    type: 'click'
  },
  {
    id: 'factory',
    name: 'Click Factory',
    description: 'Generates 25 clicks per second.',
    baseCost: 2000,
    costMultiplier: 1.18,
    power: 25,
    type: 'auto'
  },
  {
    id: 'quantum_processor',
    name: 'Quantum Processor',
    description: 'Generates 150 clicks per second.',
    baseCost: 15000,
    costMultiplier: 1.22,
    power: 150,
    type: 'auto'
  },
  {
    id: 'data_store',
    name: 'Neural DataStore',
    description: 'A massive array of servers generating 1000 clicks per second.',
    baseCost: 100000,
    costMultiplier: 1.25,
    power: 1000,
    type: 'auto'
  },
  {
    id: 'dyson_swarm',
    name: 'Dyson Swarm',
    description: 'Harness the power of a star to generate 5000 clicks per second.',
    baseCost: 1000000,
    costMultiplier: 1.3,
    power: 5000,
    type: 'auto'
  },
  {
    id: 'galactic_network',
    name: 'Galactic Network',
    description: 'Connect the galaxy to generate 25000 clicks per second.',
    baseCost: 10000000,
    costMultiplier: 1.35,
    power: 25000,
    type: 'auto'
  }
];

export const RESEARCH_UPGRADES: ResearchUpgrade[] = [
  {
    id: 'optimized_synapse',
    name: 'Optimized Synapse',
    description: 'Increases click power by 25% per level.',
    cost: 10,
    power: 0.25,
    type: 'click_mult'
  },
  {
    id: 'parallel_processing',
    name: 'Parallel Processing',
    description: 'Increases auto-income by 25% per level.',
    cost: 25,
    power: 0.25,
    type: 'auto_mult'
  },
  {
    id: 'efficient_coding',
    name: 'Efficient Coding',
    description: 'Reduces upgrade costs by 5% per level.',
    cost: 50,
    power: 0.05,
    type: 'cost_reduction'
  }
];

export interface ChangelogEntry {
  version: string;
  date: string;
  sections: {
    newContent?: string[];
    improvements?: string[];
    enhancements?: string[];
    qol?: string[];
    bugFixes?: string[];
    errorFixes?: string[];
    overhaul?: string[];
  };
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.1.0',
    date: 'Thursday, April 23rd, 2026',
    sections: {
      newContent: [
        'Research Expansion: Spend your Neural Shards on permanent Research Upgrades for massive multipliers.',
        'New Tiers: Added Dyson Swarm and Galactic Network high-tier upgrades.',
        'Multi-Buy: Toggle between buying 1, 10, or 100 upgrades at once.'
      ],
      improvements: [
        'UI Refinement: Added visual indicators for active multipliers.',
        'Performance: Optimized game loop for high-speed auto-clicking.'
      ]
    }
  },
  {
    version: '1.0.1',
    date: 'Thursday, April 16th, 2026',
    sections: {
      bugFixes: [
        'Data Integrity: Fixed an issue where loading old save files could result in "NaN" values due to missing prestige data.',
        'Number Formatting: Added safety checks to the number formatter to prevent "NaNk" displays.'
      ]
    }
  },
  {
    version: '1.0.0',
    date: 'Thursday, April 16th, 2026',
    sections: {
      newContent: [
        'Neural Reset (Prestige): Unlock the ability to reboot your system for permanent Neural Shards.',
        'Neural Shards: Each shard provides a permanent +1% boost to all income.',
        'Research Tab: A new interface to manage your prestige progress and view advanced statistics.'
      ],
      overhaul: [
        'Major Version 1.0: The game has reached its first major milestone with the introduction of the prestige loop.'
      ],
      improvements: [
        'Balanced early game costs to account for prestige multipliers.',
        'Enhanced visual feedback for massive credit gains.'
      ]
    }
  },
  {
    version: '0.9.0',
    date: 'Thursday, April 9th, 2026',
    sections: {
      newContent: [
        'Settings Menu: Customize your experience with toggles for floating text, animations, and visual themes.',
        'Visual Themes: Added "Matrix" and "Classic" themes alongside the default "Neon" look.',
        'UI Overhaul: Completely redesigned the interface for a more "Specialist Tool" aesthetic, featuring improved data density and technical accents.'
      ],
      improvements: [
        'Optimized rendering for floating text and animations.',
        'Refined the layout for better scannability of technical data.'
      ]
    }
  },
  {
    version: '0.8.0',
    date: 'Thursday, April 2nd, 2026',
    sections: {
      improvements: [
        'Game Balancing: Adjusted upgrade costs and power outputs for a smoother progression curve.',
        'Economy Tuning: Lowered cost multipliers for high-tier upgrades to make late-game goals more achievable.'
      ]
    }
  },
  {
    version: '0.7.0',
    date: 'Thursday, March 26th, 2026',
    sections: {
      bugFixes: [
        'Upgrade Scrolling: Fixed a layout issue where the upgrades list could fail to scroll correctly on certain mobile devices.',
        'Layout Stability: Ensured the upgrades panel correctly fills the available viewport height.'
      ]
    }
  },
  {
    version: '0.6.0',
    date: 'Thursday, March 19th, 2026',
    sections: {
      bugFixes: [
        'Mobile Scrolling: Fixed an issue where content could be cut off at the top on small screens due to centering.',
        'Viewport Fix: Switched to dynamic viewport units (dvh) to prevent UI jumping when mobile browser bars appear/disappear.'
      ],
      qol: [
        'Added smooth momentum scrolling for iOS devices.',
        'Prevented accidental pull-to-refresh while interacting with the game.'
      ]
    }
  },
  {
    version: '0.5.0',
    date: 'Thursday, March 12th, 2026',
    sections: {
      overhaul: [
        'Global Scrolling: All game panels now support vertical scrolling, ensuring full accessibility on extremely small screens or zoomed-in views.'
      ],
      qol: [
        'Improved scrollbar styling for a more consistent "Neon" look across all scrollable areas.'
      ]
    }
  },
  {
    version: '0.4.0',
    date: 'Thursday, March 5th, 2026',
    sections: {
      newContent: [
        'Neural DataStore: A new high-tier upgrade that provides massive auto-generation power.',
        'Data Management: Improved server-side sync indicators.'
      ],
      enhancements: [
        'Added a new icon for the DataStore upgrade.'
      ]
    }
  },
  {
    version: '0.3.0',
    date: 'Thursday, February 26th, 2026',
    sections: {
      qol: [
        'Short Number Formatting: Large values are now formatted for better readability (e.g., 1.5k, 2.3M).',
        'Keyboard Support: You can now use the Spacebar or Enter key to click the main generator.',
        'Visual Polish: Improved contrast for upgrade costs and levels.'
      ],
      improvements: [
        'Refined the number animation logic for smoother performance.'
      ]
    }
  },
  {
    version: '0.2.0',
    date: 'Thursday, February 19th, 2026',
    sections: {
      newContent: [
        'Mobile optimization: The game now adapts to smaller screens with a responsive layout.',
        'Mobile Navigation: Added a bottom navigation bar for quick access to Upgrades and Clicker on mobile.'
      ],
      improvements: [
        'Optimized touch interactions for mobile devices.',
        'Improved UI layout for better scannability on desktop and mobile.'
      ],
      qol: [
        'Categorized changelog for better readability.',
        'Increased touch target sizes for better mobile accessibility.'
      ],
      overhaul: [
        'Responsive layout engine implemented to support diverse device sizes.'
      ]
    }
  },
  {
    version: '0.1.0',
    date: 'Thursday, February 12th, 2026',
    sections: {
      newContent: [
        'Initial release of Clicker Tycoon: Neon Genesis.',
        'Added basic clicking mechanics.',
        'Implemented 5 unique upgrades.'
      ],
      enhancements: [
        'Server-side persistence enabled.',
        'Added dynamic UI with Framer Motion.'
      ]
    }
  }
];
