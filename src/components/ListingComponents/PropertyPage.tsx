import React from 'react';

interface PropertyPageProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const PropertyPage: React.FC<PropertyPageProps> = ({
  title,
  setTitle,
  description,
  setDescription,
}) => {
  return (
    <>
      <section className="mb-6">
        <label htmlFor="property-title" className="block mb-2 font-medium p-2">
          Property Title
        </label>
        <input
          id="property-title"
          type="text"
          placeholder="Name of your property"
          className="w-full border border-gray-300 p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>

      <section>
        <label htmlFor="property-description" className="block mb-2 font-medium">
          Property Description
        </label>
        <textarea
          id="property-description"
          placeholder="Describe your property"
          maxLength={2500}
          className="w-full border border-gray-300 p-2 rounded h-40 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="text-sm text-gray-500 mt-1">
          {description.length}/2500 characters
        </p>
      </section>

      <section className="mt-2 bg-[#E6EFF1] rounded-sm p-1">
        <p className="font-medium mb-2">Tips For A Great Description</p>
        <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          <li>Highlight unique features of your property</li>
          <li>Mention nearby attractions, restaurants, or points of interest</li>
          <li>Describe the atmosphere and style of your place</li>
          <li>Include information about the neighborhood</li>
          <li>Be honest about any quirks or limitations</li>
        </ul>
      </section>
    </>
  );
};

export default PropertyPage;
