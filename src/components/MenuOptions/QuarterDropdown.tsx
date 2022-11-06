import React, { useRef } from 'react';

interface Props {
  dispatch: React.Dispatch<any>;
}

const QuarterDropdown: React.FC<Props> = ({ dispatch }) => {
  const quarterRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='quarter-selection'
      defaultValue=''
      ref={quarterRef}
      onChange={() =>
        dispatch({
          type: 'changeQuarter',
          payload: quarterRef.current?.value,
        })
      }
    >
      <option disabled value=''>
        Select a Quarter
      </option>
      <option value='q1'>Q1</option>
      <option value='q2'>Q2</option>
      <option value='q3'>Q3</option>
      <option value='q4'>Q4</option>
    </select>
  );
};

export default QuarterDropdown;
