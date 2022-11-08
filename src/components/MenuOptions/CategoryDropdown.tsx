import React, { useRef } from 'react';
import { CurrentStateObj } from '../Interfaces/Reducer';

interface Props {
  currentState: CurrentStateObj;
  dispatch: React.Dispatch<any>;
  disabled: boolean;
  includeAllCategories: boolean;
  readAssignments: (
    quarter: string,
    subject: string,
    category: string
  ) => Promise<string[]>;
}

const CategoryDropdown: React.FC<Props> = ({
  currentState,
  dispatch,
  disabled,
  includeAllCategories,
  readAssignments,
}) => {
  const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='category-selection'
      ref={categoryRef}
      defaultValue={includeAllCategories ? 'All Categories' : ''}
      onChange={async () => {
        let selectedCategory = categoryRef.current?.value || 'All Categories';
        let assignmentList = await readAssignments(
          currentState.selectedQuarter || '',
          currentState.selectedSubject || '',
          selectedCategory || ''
        );
        dispatch({
          type: 'changeCategory',
          payload: {
            selectedCategory: selectedCategory,
            assignmentList: assignmentList,
          },
        });
      }}
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
