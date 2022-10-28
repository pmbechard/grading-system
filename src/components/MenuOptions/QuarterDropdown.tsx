import React, { useRef } from 'react';

interface Props {
  setQuarter: React.Dispatch<React.SetStateAction<string>>;
}

const QuarterDropdown: React.FC<Props> = ({ setQuarter }) => {
  const quarterRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='quarter-selection'
      defaultValue=''
      ref={quarterRef}
      onChange={() =>
        setQuarter(quarterRef.current?.value || 'Select a Quarter')
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
