import React, { useRef } from 'react';

interface Props {
  getCategories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  includeAllCategories: boolean;
}

const CategoryDropdown: React.FC<Props> = ({
  getCategories,
  setCategory,
  disabled,
  includeAllCategories,
}) => {
  const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='category-selection'
      ref={categoryRef}
      defaultValue={includeAllCategories ? 'All Categories' : ''}
      onChange={() =>
        setCategory(categoryRef.current?.value || 'All Categories')
      }
      disabled={disabled}
    >
      {includeAllCategories ? (
        <option value='All Categories'>All Categories</option>
      ) : (
        <option disabled value=''>
          Select a Category
        </option>
      )}
      {getCategories.map((category) => {
        return (
          <option key={category} value={category}>
            {category}
          </option>
        );
      })}
    </select>
  );
};

export default CategoryDropdown;
