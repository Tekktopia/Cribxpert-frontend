type FilterPanelProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export default function FilterPanel({ isOpen, setIsOpen }: FilterPanelProps) {
  console.log(isOpen, setIsOpen);
  return <div>FilterPanel</div>;
}
