import { Input } from 'antd';
interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ShortcutSearch = ({ value, onChange }: Props) => {
  return (
    <div className="relative flex w-full">
      <Input.Search
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search shortcuts by name or key combination..."
  />
    </div>
  );
};

export default ShortcutSearch; 
