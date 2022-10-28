import React, { useRef } from 'react';

interface Props {
  setAssignment: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  assignmentList: string[];
}

const AssignmentDropdown: React.FC<Props> = ({ setAssignment, disabled, assignmentList }) => {
  const assignmentRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='assignment-selection'
      ref={assignmentRef}
      disabled={disabled}
      defaultValue='Select an Assignment'
      onChange={() =>
        setAssignment(assignmentRef.current?.value || 'Select an Assignment')
      }
    >
      <option disabled value='Select an Assignment'>
        Select an Assignment
      </option>
      {assignmentList.map((assignment) => {
        return (
          <option key={assignment} value={assignment}>
            {assignment}
          </option>
        );
      })}
    </select>
  );
};

export default AssignmentDropdown;
