import React, { useRef } from 'react';

interface Props {
  getSubjects: string[];
  disabled: boolean;
  dispatch: React.Dispatch<any>;
}

const SubjectDropdown: React.FC<Props> = ({
  getSubjects,
  disabled,
  dispatch,
}) => {
  const subjectRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='subject-selection'
      ref={subjectRef}
      defaultValue=''
      onChange={() => {
        dispatch({ type: 'changeSubject', payload: subjectRef.current?.value });
      }}
      disabled={disabled}
    >
      <option disabled value=''>
        Select a Subject
      </option>
      {getSubjects.map((subject) => {
        return (
          <option key={subject} value={subject}>
            {subject}
          </option>
        );
      })}
    </select>
  );
};

export default SubjectDropdown;
