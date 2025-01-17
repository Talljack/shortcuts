import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentApp {
  name: string;
  lastUsed: Date;
  visits: number;
}

interface RecentAppsStore {
  apps: RecentApp[];
  selectedApp: RecentApp | null;
  currentWindow: string | null;
  addApp: (appName: string) => void;
  clearHistory: () => void;
  setSelectedApp: (app: RecentApp | null) => void;
  setCurrentWindow: (appName: string | null) => void;
}

export const useRecentApps = create<RecentAppsStore>()(
  persist(
    (set) => ({
      apps: [],
      selectedApp: null,
      currentWindow: null,
      addApp: (appName: string) => set((state) => {
        const existingApp = state.apps.find(app => app.name === appName);
        if (existingApp) {
          return {
            ...state,
            apps: state.apps.map(app =>
              app.name === appName
                ? { ...app, lastUsed: new Date(), visits: app.visits + 1 }
                : app
            ).sort((a, b) => b.visits - a.visits)
          };
        }
        return {
          ...state,
          apps: [...state.apps, {
            name: appName,
            lastUsed: new Date(),
            visits: 1
          }].sort((a, b) => b.visits - a.visits).slice(0, 10) // Keep only top 10
        };
      }),
      clearHistory: () => set({ apps: [], selectedApp: null }),
      setSelectedApp: (app) => set({ selectedApp: app }),
      setCurrentWindow: (appName) => set({ currentWindow: appName })
    }),
    {
      name: 'recent-apps-storage'
    }
  )
);
