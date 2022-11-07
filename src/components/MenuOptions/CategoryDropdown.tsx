import React, { useRef } from 'react';
import { CurrentStateObj } from '../Interfaces/Reducer';

interface Props {
  currentState: CurrentStateObj;
  dispatch: React.Dispatch<any>;
  disabled: boolean;
  includeAllCategories: boolean;
}

const CategoryDropdown: React.FC<Props> = ({
  currentState,
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
      {currentState.categoryList?.map((category) => {
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
