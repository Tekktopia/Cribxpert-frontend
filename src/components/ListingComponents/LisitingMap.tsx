import { useState } from 'react';

const ListingMap = () => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    console.log('Input value:', newValue);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    console.log('Checkbox checked:', isChecked);
  };

  return (
    <form action="#">
      <div className="flex flex-col">
        <label htmlFor="home-address">Home Address</label>
        <input
          onChange={showInput}
          value={inputValue}
          id="home-address"
          placeholder="Enter"
          type="text"
          className="border p-2 rounded"
        />

        <div className="flex items-center mb-4 mt-4">
          <input
            type="checkbox"
            id="hide-address"
            checked={checked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="hide-address">
            Hide exact address until booking confirmation (only neighborhood will be shown)
          </label>
        </div>

        <img
          className="w-[700px] h-[200px]"
          src="/images/Map_Lagos.png"
          alt="map"
        />
      </div>
    </form>
  );
};

export default ListingMap;
