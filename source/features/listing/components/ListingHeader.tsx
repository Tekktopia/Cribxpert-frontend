interface ListingHeaderProps {
  onCreateNewListing?: () => void;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({ onCreateNewListing }) => {
  const handleCreateNewListing = () => {
    if (onCreateNewListing) {
      onCreateNewListing();
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Listing</h2>
      <div className="flex gap-4 items-center">
        <button 
          onClick={handleCreateNewListing}
          className="bg-[#1D5C5C] px-4 py-2 rounded-lg text-white text-sm hover:bg-[#155050] transition-colors font-medium"
        >
          Create New Listing
        </button>
      </div>
    </div>
  );
};

export default ListingHeader;


