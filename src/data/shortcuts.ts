export interface Shortcut {
  id: string;
  key: string;
  description: string;
  usage: number;
  category: 'editor' | 'navigation' | 'search' | 'other';
}

export const defaultShortcuts = {
  'Google Chrome': [
    { id: 'chrome-1', key: 'Ctrl+T', description: 'New Tab', usage: 0 },
    { id: 'chrome-2', key: 'Ctrl+W', description: 'Close Tab', usage: 0 },
    { id: 'chrome-3', key: 'Ctrl+L', description: 'Focus Address Bar', usage: 0 },
    // Add more Chrome shortcuts
  ],
  'Visual Studio Code': [
    { id: 'vscode-1', key: 'Ctrl+P', description: 'Quick Open File', usage: 0 },
    { id: 'vscode-2', key: 'Ctrl+Shift+P', description: 'Command Palette', usage: 0 },
    { id: 'vscode-3', key: 'Ctrl+/', description: 'Toggle Comment', usage: 0 },
    // Add more VS Code shortcuts
  ],
  'Adobe Photoshop': [
    { id: 'ps-1', key: 'V', description: 'Move Tool', usage: 0 },
    { id: 'ps-2', key: 'M', description: 'Rectangular Marquee Tool', usage: 0 },
    { id: 'ps-3', key: 'Ctrl+T', description: 'Free Transform', usage: 0 },
    // Add more Photoshop shortcuts
  ],
  'Cursor': [
    { 
      id: 'cursor-1', 
      key: 'Command+Shift+P', 
      description: 'Open Command Palette', 
      usage: 0,
      category: 'search'
    },
    { 
      id: 'cursor-2', 
      key: 'Command+B', 
      description: 'Toggle Sidebar', 
      usage: 0,
      category: 'navigation'
    },
    { id: 'cursor-3', key: 'Command+Shift+H', description: 'Open History', usage: 0 },
    { id: 'cursor-4', key: 'Command+P', description: 'Quick Open File', usage: 0 },
    { id: 'cursor-5', key: 'Command+\\', description: 'Split Editor', usage: 0 },
    { id: 'cursor-6', key: 'Command+W', description: 'Close Editor', usage: 0 },
    { id: 'cursor-7', key: 'Command+K Z', description: 'Zen Mode', usage: 0 },
    { id: 'cursor-8', key: 'Command+Shift+E', description: 'Show Explorer', usage: 0 },
    { id: 'cursor-9', key: 'Command+Shift+F', description: 'Find in Files', usage: 0 },
    { id: 'cursor-10', key: 'Command+Shift+X', description: 'Show Extensions', usage: 0 },
    { id: 'cursor-11', key: 'Command+J', description: 'Toggle Terminal', usage: 0 },
    { id: 'cursor-12', key: 'Command+K M', description: 'Change Language Mode', usage: 0 }
  ]
};
