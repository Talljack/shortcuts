import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ShortcutsManager from '@/components/shortcut-manager/ShortcutManager';
import PracticeMode from '@/components/shortcut-manager/PracticeMode';
import SettingsPage from '@/pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <ShortcutsManager />,
      },
      {
        path: '/practice',
        element: <PracticeMode />,
      },
      {
        path: '/settings',
        element: <SettingsPage />,
      },
    ],
  },
]);
