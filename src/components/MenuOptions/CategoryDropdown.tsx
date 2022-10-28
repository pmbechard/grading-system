import React, { useRef } from 'react';

interface Props {
  getCategories: string[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

const CategoryDropdown: React.FC<Props> = ({
  getCategories,
  setCategory,
  disabled,
}) => {
  const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='category-selection'
      ref={categoryRef}
      defaultValue='All Categories'
      onChange={() =>
        setCategory(categoryRef.current?.value || 'All Categories')
      }
      disabled={disabled}
    >
      <option value='All Categories'>All Categories</option>
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
