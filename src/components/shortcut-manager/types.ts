export interface ActiveWindow {
  name: string;
  title: string;
  path: string;
}

export interface Shortcut {
  id: string;
  key: string;
  description: string;
  usage: number;
  appName: string;
}

export interface ShortcutProgress {
  shortcutId: string;
  progress: number;
  lastPracticed: Date;
} 
