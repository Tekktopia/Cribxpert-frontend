import React from 'react';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <SearchX size={80} className="mb-4 text-gray-400" strokeWidth={1.5} />,
  title = 'No properties found',
  description = "Try adjusting your filters to find what you're looking for.",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {icon}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default EmptyState;
