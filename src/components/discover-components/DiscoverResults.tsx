type DiscoverResultsProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};
export default function DiscoverResults(props: DiscoverResultsProps) {
  console.log(props);
  return <div>DiscoverResults</div>;
}
