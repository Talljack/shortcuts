import { Input } from 'antd';
import { SearchIcon } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ShortcutSearch = ({ value, onChange }: Props) => {
  return (
    <div className="flex relative mb-4 w-full">
      <div className="relative w-full">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search shortcuts by name or key combination..."
          className="pr-4 pl-10 w-full h-10 rounded-lg border transition-colors bg-background border-input hover:border-accent-foreground focus:border-accent-foreground focus:outline-none"
        />
        <SearchIcon className="absolute left-3 top-1/2 w-4 h-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
};

export default ShortcutSearch;
