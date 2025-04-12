import { ArrowLeft, Settings2Icon } from 'lucide-react';
type FilterPanelProps = {
  isOpen: boolean;
  handleToggle: () => void;
};
export default function FilterPanel({
  isOpen,
  handleToggle,
}: FilterPanelProps) {
  return (
    <div
      className={`${isOpen ? '-translate-x-0 w-full md:w-1/4 md:max-w-[276px] ' : '-translate-x-full'} md:h-auto z-20 top-0 bg-white absolute md:relative border-r-[1px] pr-2`}
    >
      {isOpen && (
        <div className="flex justify-between">
          <span className="flex">
            <Settings2Icon />
            Filters
          </span>

          <button className="flex" onClick={handleToggle}>
            <ArrowLeft className="-mr-1" />|
          </button>
        </div>
      )}
    </div>
  );
}
