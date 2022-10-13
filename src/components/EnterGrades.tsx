import React, { useRef } from 'react';

interface Props {
  getSubjects: string[];
  getCategories: string[];
  fetchCategories: (subject: string) => Promise<void>;
}

const EnterGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  fetchCategories,
}) => {
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const handleSubjectChange = () => {
    fetchCategories(subjectRef.current?.value || '');
  };

  return (
    <div className='enter-grades-container'>
      <select id='quarter-selection' defaultValue=''>
        <option disabled value=''>
          Select a Quarter
        </option>
        <option value='q1'>Q1</option>
        <option value='q2'>Q2</option>
        <option value='q3'>Q3</option>
        <option value='q4'>Q4</option>
      </select>
      <select
        id='subject-selection'
        ref={subjectRef}
        defaultValue=''
        onChange={handleSubjectChange}
      >
        <option disabled value=''>
          Select a Subject
        </option>
        {getSubjects.map((subject) => {
          return (
            <option
              key={subject.replaceAll(' ', '-').toLowerCase()}
              value={subject}
            >
              {subject}
            </option>
          );
        })}
      </select>
      <select id='category-selection' ref={categoryRef} defaultValue=''>
        <option disabled value=''>
          Select a Category
        </option>
        {getCategories.map((category) => {
          return (
            <option
              key={category.replaceAll(' ', '-').toLowerCase()}
              value={category}
            >
              {category}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default EnterGrades;
