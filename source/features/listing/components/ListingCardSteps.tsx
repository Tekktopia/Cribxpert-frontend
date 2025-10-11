import React from 'react';


export interface ListingCardStepsProps {
  title: string;
  description: string;
  image: string;
}

const ListingCardSteps: React.FC<ListingCardStepsProps> = ({ title, description, image }) => {

  return (
    <div className='' >
        <div className='flex gap-2 justify-center mb-2 items-center'>

      <img
        src={image}
        alt={title}
        className="w-10 h-10 object-cover flex-shrink-0"
        />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        </div>
      <div>
        <p className="text-neutral max-w-2xl">{description}</p>
      </div>
    </div>
  );
};

export default ListingCardSteps;
