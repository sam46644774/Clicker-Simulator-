export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  power: number;
  type: 'click' | 'auto';
}

export interface GameState {
  currency: number;
  totalCurrencyEarned: number;
  clickCount: number;
  upgrades: Record<string, number>; // upgradeId -> level
  lastSave: number;
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
