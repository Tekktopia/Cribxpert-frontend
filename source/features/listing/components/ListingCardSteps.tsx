import React from 'react';


export interface ListingCardStepsProps {
  title: string;
  description: string;
  image: string;
}

const ListingCardSteps: React.FC<ListingCardStepsProps> = ({ title, description, image }) => {

  return (
    <div className='' >
        <div className='flex gap-3 justify-center mb-2 '>

      <img
        src={image}
        alt={title}
        className="w-9 h-9 object-cover flex-shrink-0"
        />
        <h2 className="text-[25px] font-semibold mb-2">{title}</h2>
        </div>
      <div>
        <p className="text-neutral lg:max-w-[800px] lg:text-xl">{description}</p>
      </div>
    </div>
  );
};

export default ListingCardSteps;
