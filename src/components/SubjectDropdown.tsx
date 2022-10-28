import React, { useRef, useState } from 'react';

interface Props {
  handleSubjectChange: (subject: string) => void;
  getSubjects: string[];
  getQuarter: string;
}

const SubjectDropdown: React.FC<Props> = ({
  handleSubjectChange,
  getSubjects,
  getQuarter,
}) => {
  const [getSubject, setSubject] = useState<string>('Select a Subject');

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
      disabled={getQuarter === 'Select a Quarter'}
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
