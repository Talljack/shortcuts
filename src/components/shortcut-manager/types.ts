export interface ActiveWindow {
  name: string;
  title: string;
  path: string;
}

export interface ShortcutProgress {
  shortcutId: string;
  progress: number;
  lastPracticed: Date;
} 
