import React, { useRef } from 'react';

interface Props {
  getCategories: string[];
  dispatch: React.Dispatch<any>;
  disabled: boolean;
  includeAllCategories: boolean;
}

const CategoryDropdown: React.FC<Props> = ({
  getCategories,
  dispatch,
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
        dispatch({
          type: 'changeCategory',
          payload: categoryRef.current?.value,
        })
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
