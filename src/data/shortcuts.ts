export interface Shortcut {
  id: string;
  key: string;
  description: string;
  usage: number;
  category?:
  | 'editor'
  | 'navigation'
  | 'command'
  | 'search'
  | 'other'
  | 'ai'
  | 'layout'
  | 'terminal'
  | 'debug'
  | 'editing'
  | 'multicursor'
  | 'file'
  | 'preview'
  | 'language'
  | 'tab'
  | 'view'
  | 'bookmark'
  | 'developer'
  | 'system'
  | 'window'
  | 'help';
}

export const defaultShortcuts: Record<string, Shortcut[]> = {
  'Google Chrome': [
    { id: 'chrome-1', key: 'Command+T', description: 'New Tab', usage: 0, category: 'tab' },
    { id: 'chrome-2', key: 'Command+W', description: 'Close Tab', usage: 0, category: 'tab' },
    { id: 'chrome-3', key: 'Command+L', description: 'Focus Address Bar', usage: 0, category: 'navigation' },
    { id: 'chrome-4', key: 'Command+R', description: 'Reload Page', usage: 0, category: 'navigation' },
    { id: 'chrome-5', key: 'Command+Shift+R', description: 'Hard Reload', usage: 0, category: 'navigation' },
    { id: 'chrome-6', key: 'Command+[', description: 'Go Back', usage: 0, category: 'navigation' },
    { id: 'chrome-7', key: 'Command+]', description: 'Go Forward', usage: 0, category: 'navigation' },
    { id: 'chrome-8', key: 'Command+Y', description: 'Show History', usage: 0, category: 'navigation' },
    { id: 'chrome-9', key: 'Command+Shift+B', description: 'Toggle Bookmarks Bar', usage: 0, category: 'view' },
    { id: 'chrome-10', key: 'Command+Option+B', description: 'Show Bookmarks', usage: 0, category: 'view' },
    { id: 'chrome-11', key: 'Command+Shift+J', description: 'Show Downloads', usage: 0, category: 'view' },
    { id: 'chrome-12', key: 'Command+F', description: 'Find in Page', usage: 0, category: 'search' },
    { id: 'chrome-13', key: 'Command+D', description: 'Bookmark Current Page', usage: 0, category: 'bookmark' },
    { id: 'chrome-14', key: 'Command+Shift+T', description: 'Reopen Closed Tab', usage: 0, category: 'tab' },
    { id: 'chrome-15', key: 'Command+1-8', description: 'Switch to Tab 1-8', usage: 0, category: 'tab' },
    { id: 'chrome-16', key: 'Command+9', description: 'Switch to Last Tab', usage: 0, category: 'tab' },
    { id: 'chrome-17', key: 'Command+Option+I', description: 'Open Developer Tools', usage: 0, category: 'developer' },
    { id: 'chrome-18', key: 'Command+Option+U', description: 'View Page Source', usage: 0, category: 'developer' }
  ],
  'Visual Studio Code': [
    { id: 'vscode-1', key: 'Command+P', description: 'Quick Open File', usage: 0, category: 'navigation' },
    { id: 'vscode-2', key: 'Command+Shift+P', description: 'Command Palette', usage: 0, category: 'command' },
    { id: 'vscode-3', key: 'Command+/', description: 'Toggle Line Comment', usage: 0, category: 'editing' },
    { id: 'vscode-4', key: 'Command+B', description: 'Toggle Sidebar', usage: 0, category: 'view' },
    { id: 'vscode-5', key: 'Command+\\', description: 'Split Editor', usage: 0, category: 'layout' },
    { id: 'vscode-6', key: 'Command+J', description: 'Toggle Terminal', usage: 0, category: 'terminal' },
    { id: 'vscode-7', key: 'Command+K Z', description: 'Zen Mode', usage: 0, category: 'view' },
    { id: 'vscode-8', key: 'Command+Shift+E', description: 'Show Explorer', usage: 0, category: 'navigation' },
    { id: 'vscode-9', key: 'Command+Shift+F', description: 'Find in Files', usage: 0, category: 'search' },
    { id: 'vscode-10', key: 'Command+F', description: 'Find', usage: 0, category: 'search' },
    { id: 'vscode-11', key: 'Option+Up', description: 'Move Line Up', usage: 0, category: 'editing' },
    { id: 'vscode-12', key: 'Option+Down', description: 'Move Line Down', usage: 0, category: 'editing' },
    { id: 'vscode-13', key: 'Command+Enter', description: 'Insert Line Below', usage: 0, category: 'editing' },
    { id: 'vscode-14', key: 'Command+Shift+Enter', description: 'Insert Line Above', usage: 0, category: 'editing' },
    { id: 'vscode-15', key: 'Command+Shift+[', description: 'Previous Editor', usage: 0, category: 'navigation' },
    { id: 'vscode-16', key: 'Command+Shift+]', description: 'Next Editor', usage: 0, category: 'navigation' }
  ],
  'System': [
    { id: 'system-1', key: 'Command+C', description: 'Copy', usage: 0, category: 'system' },
    { id: 'system-2', key: 'Command+V', description: 'Paste', usage: 0, category: 'system' },
    { id: 'system-3', key: 'Command+X', description: 'Cut', usage: 0, category: 'system' },
    { id: 'system-4', key: 'Command+Z', description: 'Undo', usage: 0, category: 'system' },
    { id: 'system-5', key: 'Command+Shift+Z', description: 'Redo', usage: 0, category: 'system' },
    { id: 'system-6', key: 'Command+A', description: 'Select All', usage: 0, category: 'system' },
    { id: 'system-7', key: 'Command+S', description: 'Save', usage: 0, category: 'system' },
    { id: 'system-8', key: 'Command+O', description: 'Open', usage: 0, category: 'system' },
    { id: 'system-9', key: 'Command+N', description: 'New', usage: 0, category: 'system' },
    { id: 'system-10', key: 'Command+Q', description: 'Quit Application', usage: 0, category: 'system' },
    { id: 'system-11', key: 'Command+Tab', description: 'Switch Application', usage: 0, category: 'system' },
    { id: 'system-12', key: 'Command+Space', description: 'Spotlight Search', usage: 0, category: 'system' },
    { id: 'system-13', key: 'Command+Control+F', description: 'Toggle Full Screen', usage: 0, category: 'system' },
    { id: 'system-14', key: 'Command+H', description: 'Hide Application', usage: 0, category: 'system' },
    { id: 'system-15', key: 'Command+M', description: 'Minimize Window', usage: 0, category: 'system' }
  ],
  'Slack': [
    { id: 'slack-1', key: 'Command+K', description: 'Quick Switcher', usage: 0, category: 'navigation' },
    { id: 'slack-2', key: 'Command+/', description: 'Show Shortcuts', usage: 0, category: 'help' },
    { id: 'slack-3', key: 'Command+Shift+K', description: 'Browse DMs', usage: 0, category: 'navigation' },
    { id: 'slack-4', key: 'Command+Shift+A', description: 'All Unreads', usage: 0, category: 'navigation' },
    { id: 'slack-5', key: 'Command+[', description: 'Back in History', usage: 0, category: 'navigation' },
    { id: 'slack-6', key: 'Command+]', description: 'Forward in History', usage: 0, category: 'navigation' }
  ],
  // Finder 访达
  'Finder': [
    { id: 'finder-1', key: 'Command+N', description: 'New Finder Window', usage: 0, category: 'window' },
    { id: 'finder-2', key: 'Command+Shift+N', description: 'New Folder', usage: 0, category: 'file' },
    { id: 'finder-3', key: 'Command+Delete', description: 'Move to Trash', usage: 0, category: 'file' },
    { id: 'finder-4', key: 'Command+F', description: 'Find', usage: 0, category: 'search' },
    { id: 'finder-5', key: 'Command+T', description: 'New Tab', usage: 0, category: 'tab' },
    { id: 'finder-6', key: 'Command+O', description: 'Open', usage: 0, category: 'system' },
    { id: 'finder-7', key: 'Command+W', description: 'Close Window', usage: 0, category: 'system' },
    { id: 'finder-8', key: 'Command+I', description: 'Show Info', usage: 0, category: 'system' },
    { id: 'finder-9', key: 'Command+D', description: 'Copy', usage: 0, category: 'system' },
    { id: 'finder-10', key: 'Command+Shift+A', description: 'Making a Stand-in', usage: 0, category: 'system' },
    { id: 'finder-11', key: 'Command+Y', description: 'Quick Look', usage: 0, category: 'system' },
    { id: 'finder-12', key: 'Command+P', description: 'Print', usage: 0, category: 'system' },
    { id: 'finder-13', key: 'Command+R', description: 'Show Original', usage: 0, category: 'file' },
    { id: 'finder-14', key: 'Command+Shift+T', description: 'Add to Sidebar', usage: 0, category: 'navigation' },
    { id: 'finder-15', key: 'Command+E', description: 'Roll out', usage: 0, category: 'navigation' },
    { id: 'finder-16', key: 'Command+Shift+Delete', description: 'Empty the Trash', usage: 0, category: 'file' },
    { id: 'finder-17', key: 'Command+,', description: 'Settings', usage: 0, category: 'system' },
    { id: 'finder-18', key: 'Command+H', description: 'Hide application', usage: 0, category: 'system' },
    { id: 'finder-19', key: 'Command+Option+H', description: 'Hide other applications', usage: 0, category: 'system' },
    { id: 'finder-20', key: 'Command+M', description: 'Minimize Window', usage: 0, category: 'system' },
    { id: 'finder-21', key: 'Command+Shift+G', description: 'Go to directory', usage: 0, category: 'system' },
    { id: 'finder-22', key: 'Command+Shift+T', description: 'Show tabs', usage: 0, category: 'system' },
    { id: 'finder-23', key: 'Command+Shift+P', description: 'Show preview', usage: 0, category: 'system' },
    { id: 'finder-24', key: 'Command+C', description: 'Copy', usage: 0, category: 'system' },
    { id: 'finder-25', key: 'Command+X', description: 'Cut', usage: 0, category: 'system' },
    { id: 'finder-26', key: 'Command+V', description: 'Paste', usage: 0, category: 'system' },
    { id: 'finder-27', key: 'Command+A', description: 'Select All', usage: 0, category: 'system' },
    { id: 'finder-28', key: 'Command+S', description: 'Save', usage: 0, category: 'system' },
    { id: 'finder-29', key: 'Command+Z', description: 'Undo', usage: 0, category: 'system' },
    { id: 'finder-30', key: 'Command+Shift+Z', description: 'Redo', usage: 0, category: 'system' }
  ],
  'Cursor': [
    {
      id: 'cursor-1',
      key: 'Command+Shift+P',
      description: 'Open Command Palette',
      usage: 0,
      category: 'command'
    },
    {
      id: 'cursor-2',
      key: 'Command+B',
      description: 'Toggle Sidebar',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-3',
      key: 'Command+P',
      description: 'Quick Open File',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-4',
      key: 'Command+K',
      description: 'Open AI Command',
      usage: 0,
      category: 'ai'
    },
    {
      id: 'cursor-5',
      key: 'Command+I',
      description: 'AI Inline Suggestion',
      usage: 0,
      category: 'ai'
    },
    {
      id: 'cursor-6',
      key: 'Command+L',
      description: 'AI Line Edit',
      usage: 0,
      category: 'ai'
    },
    {
      id: 'cursor-7',
      key: 'Command+\\',
      description: 'Split Editor',
      usage: 0,
      category: 'layout'
    },
    {
      id: 'cursor-8',
      key: 'Command+W',
      description: 'Close Editor',
      usage: 0,
      category: 'layout'
    },
    {
      id: 'cursor-9',
      key: 'Command+K Z',
      description: 'Toggle Zen Mode',
      usage: 0,
      category: 'layout'
    },
    {
      id: 'cursor-10',
      key: 'Command+Shift+E',
      description: 'Show Explorer',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-11',
      key: 'Command+Shift+F',
      description: 'Find in Files',
      usage: 0,
      category: 'search'
    },
    {
      id: 'cursor-12',
      key: 'Command+Shift+G',
      description: 'Go to Source Control',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-13',
      key: 'Command+J',
      description: 'Toggle Terminal',
      usage: 0,
      category: 'terminal'
    },
    {
      id: 'cursor-14',
      key: 'Command+Shift+Y',
      description: 'Toggle Debug Console',
      usage: 0,
      category: 'debug'
    },
    {
      id: 'cursor-15',
      key: 'Command+/',
      description: 'Toggle Line Comment',
      usage: 0,
      category: 'editing'
    },
    {
      id: 'cursor-16',
      key: 'Option+Shift+F',
      description: 'Format Document',
      usage: 0,
      category: 'editing'
    },
    {
      id: 'cursor-17',
      key: 'Command+[',
      description: 'Outdent Line',
      usage: 0,
      category: 'editing'
    },
    {
      id: 'cursor-18',
      key: 'Command+]',
      description: 'Indent Line',
      usage: 0,
      category: 'editing'
    },
    {
      id: 'cursor-19',
      key: 'Option+Command+Up',
      description: 'Add Cursor Above',
      usage: 0,
      category: 'multicursor'
    },
    {
      id: 'cursor-20',
      key: 'Option+Command+Down',
      description: 'Add Cursor Below',
      usage: 0,
      category: 'multicursor'
    },
    {
      id: 'cursor-21',
      key: 'Command+S',
      description: 'Save File',
      usage: 0,
      category: 'file'
    },
    {
      id: 'cursor-22',
      key: 'Command+Option+S',
      description: 'Save All Files',
      usage: 0,
      category: 'file'
    },
    {
      id: 'cursor-23',
      key: 'Command+F',
      description: 'Find',
      usage: 0,
      category: 'search'
    },
    {
      id: 'cursor-24',
      key: 'Command+H',
      description: 'Replace',
      usage: 0,
      category: 'search'
    },
    {
      id: 'cursor-25',
      key: 'Command+Click',
      description: 'Go to Definition',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-26',
      key: 'Command+Shift+O',
      description: 'Go to Symbol',
      usage: 0,
      category: 'navigation'
    },
    {
      id: 'cursor-27',
      key: 'Command+K V',
      description: 'Open Markdown Preview',
      usage: 0,
      category: 'preview'
    },
    {
      id: 'cursor-28',
      key: 'Command+K M',
      description: 'Change Language Mode',
      usage: 0,
      category: 'language'
    }
  ],
  " 飞书 ": [
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
    { id: 'feishu-13', key: 'Ctrl+ 滚轮 ', description: 'Zoom in/out', usage: 0 },
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
