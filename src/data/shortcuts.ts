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
  ],
  "Bytedance-feishu": [
    { id: 'feishu-1', key: 'Enter', description: 'Send Message', usage: 0 },
    { id: 'feishu-2', key: 'Command+Enter', description: 'Search', usage: 0 },
    { id: 'feishu-3', key: 'Ctrl+Shift+W', description: 'Show/Hide feishu', usage: 0 },
    { id: 'feishu-4', key: 'Ctrl+Shift+A', description: 'Screenshot', usage: 0 },
    { id: 'feishu-5', key: 'Ctrl+F', description: 'Search in current app', usage: 0 },
    { id: 'feishu-6', key: 'Ctrl+Alt+→', description: 'Toggle right search category', usage: 0 },
    { id: 'feishu-7', key: 'Ctrl+Alt+←', description: 'Toggle left search category', usage: 0 },
    { id: 'feishu-8', key: 'Ctrl+/', description: 'Show all shortcuts', usage: 0 },
    { id: 'feishu-9', key: 'F1', description: 'Quit full screen', usage: 0 },
    { id: 'feishu-10', key: 'Ctrl+Shift+Y', description: 'Set status', usage: 0 },
    { id: 'feishu-11', key: 'Ctrl+=', description: 'Zoom in', usage: 0 },
    { id: 'feishu-12', key: 'Ctrl+-', description: 'Zoom out', usage: 0 },
    { id: 'feishu-13', key: 'Ctrl+滚轮', description: 'Zoom in/out', usage: 0 },
    { id: 'feishu-14', key: 'Ctrl+S', description: 'Save image or video', usage: 0 },
    { id: 'feishu-15', key: 'Ctrl+↑', description: 'Toggle to previous message group', usage: 0 },
    { id: 'feishu-16', key: 'Ctrl+↓', description: 'Toggle to next message group', usage: 0 },
    { id: 'feishu-17', key: 'Ctrl+G', description: 'Show/Hide message group', usage: 0 },
    { id: 'feishu-18', key: 'Ctrl+Shift+↑', description: 'Toggle to previous message', usage: 0 },
    { id: 'feishu-19', key: 'Ctrl+Shift+↓', description: 'Toggle to next message', usage: 0 },
    { id: 'feishu-20', key: 'Ctrl+,', description: 'Settings', usage: 0 },
    { id: 'feishu-21', key: 'Ctrl+D', description: 'Complete current message', usage: 0 },
    { id: 'feishu-22', key: 'F1', description: 'Open help', usage: 0 },
    { id: 'feishu-23', key: 'Ctrl+Shift+D', description: 'Toggle miscellaneous', usage: 0 },
    { id: 'feishu-24', key: 'Ctrl+Shift+V', description: 'Toggle camera', usage: 0 },
    { id: 'feishu-25', key: 'Ctrl+Shift+F', description: 'Toggle metting full screen', usage: 0 },
    { id: 'feishu-26', key: 'Ctrl+Shift+M', description: 'Metting resume/hide', usage: 0 },
    { id: 'feishu-27', key: 'Ctrl+Shift+1', description: 'Jump to tab 1', usage: 0 },
    { id: 'feishu-28', key: 'Ctrl+Shift+2', description: 'Jump to tab 2', usage: 0 },
    { id: 'feishu-29', key: 'Ctrl+Shift+3', description: 'Jump to tab 3', usage: 0 },
    { id: 'feishu-30', key: 'Ctrl+Shift+4', description: 'Jump to tab 4', usage: 0 },
    { id: 'feishu-31', key: 'Ctrl+Shift+5', description: 'Jump to tab 5', usage: 0 },
    { id: 'feishu-32', key: 'Ctrl+Shift+6', description: 'Jump to tab 6', usage: 0 },
    { id: 'feishu-33', key: 'Ctrl+Shift+7', description: 'Jump to tab 7', usage: 0 },
    { id: 'feishu-34', key: 'Ctrl+Shift+8', description: 'Jump to tab 8', usage: 0 },
    { id: 'feishu-35', key: 'Ctrl+Shift+9', description: 'Jump to last tab', usage: 0 },
    { id: 'feishu-36', key: 'Ctrl+N', description: 'New Task', usage: 0 },
    { id: 'feishu-37', key: 'Ctrl+=', description: 'Expand Window', usage: 0 },
    { id: 'feishu-38', key: 'Ctrl+-', description: 'Collapse Window', usage: 0 },
    { id: 'feishu-39', key: 'Ctrl+→', description: 'Go ahead', usage: 0 },
    { id: 'feishu-40', key: 'Ctrl+←', description: 'Go back', usage: 0 },
    { id: 'feishu-41', key: 'F5', description: 'Refresh', usage: 0 },
    { id: 'feishu-42', key: 'Ctrl+Shift+C', description: 'Copy current page link', usage: 0 },
    { id: 'feishu-43', key: 'Ctrl+Tab', description: 'Switch to next tab', usage: 0 },
    { id: 'feishu-44', key: 'Ctrl+Shift+Tab', description: 'Switch to previous tab', usage: 0 },
    { id: 'feishu-45', key: 'Ctrl+`', description: 'Switch to the previous active tab', usage: 0 },
    { id: 'feishu-46', key: 'Ctrl+Shift+T', description: 'Reopen closed tab', usage: 0 },
    { id: 'feishu-47', key: 'Ctrl+W', description: 'Close tab', usage: 0 },
    { id: 'feishu-48', key: 'Ctrl+H', description: 'Open history', usage: 0 },
  ]
};
