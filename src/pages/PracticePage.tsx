import { useState } from 'react';
import PracticeMode from '@/components/shortcut-manager/PracticeMode';

const PracticePage = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-white">Practice Mode</h1>
      <div className="max-w-3xl mx-auto">
        <PracticeMode activeApp={selectedApp} />
      </div>
    </div>
  );
};

export default PracticePage;
