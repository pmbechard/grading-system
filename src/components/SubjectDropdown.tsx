import React, { useRef } from 'react';

interface Props {
  handleSubjectChange: (subject: string) => void;
  getSubjects: string[];
  disabled: boolean;
  setSubject: React.Dispatch<React.SetStateAction<string>>;
}

const SubjectDropdown: React.FC<Props> = ({
  handleSubjectChange,
  getSubjects,
  disabled,
  setSubject,
}) => {
  const subjectRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='subject-selection'
      ref={subjectRef}
      defaultValue=''
      onChange={() => {
        handleSubjectChange(subjectRef.current?.value || '');
        setSubject(subjectRef.current?.value || 'Select a Subject');
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
