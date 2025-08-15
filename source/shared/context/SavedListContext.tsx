import { PropertyListingCardProps, SavedListContextProps } from '@/types';
import { createContext, useContext, useState } from 'react';

const SavedListContext = createContext<SavedListContextProps | undefined>(
  undefined
);

export const SavedListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [savedList, setSavedList] = useState<PropertyListingCardProps[]>([]);
  const addList = (property: PropertyListingCardProps) => {
    setSavedList((prevList) => [...prevList, property]);
  };
  const removeList = (property: PropertyListingCardProps) => {
    setSavedList((prevList) =>
      prevList.filter((item) => item.id !== property.id)
    );
  };
  return (
    <SavedListContext.Provider value={{ savedList, addList, removeList }}>
      {children}
    </SavedListContext.Provider>
  );
};

export const useSavedList = (): SavedListContextProps => {
  const context = useContext(SavedListContext);
  if (!context) {
    throw new Error('useSavedList must be used within a SavedListProvider');
  }
  return context;
};
