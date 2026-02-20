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
    costMultiplier: 1.2,
    power: 1,
    type: 'auto'
  },
  {
    id: 'mega_click',
    name: 'Hydraulic Press',
    description: 'Increases click power by 10.',
    baseCost: 250,
    costMultiplier: 1.3,
    power: 10,
    type: 'click'
  },
  {
    id: 'factory',
    name: 'Click Factory',
    description: 'Generates 10 clicks per second.',
    baseCost: 1000,
    costMultiplier: 1.25,
    power: 10,
    type: 'auto'
  },
  {
    id: 'quantum_processor',
    name: 'Quantum Processor',
    description: 'Generates 100 clicks per second.',
    baseCost: 10000,
    costMultiplier: 1.35,
    power: 100,
    type: 'auto'
  },
  {
    id: 'data_store',
    name: 'Neural DataStore',
    description: 'A massive array of servers generating 500 clicks per second.',
    baseCost: 50000,
    costMultiplier: 1.4,
    power: 500,
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
