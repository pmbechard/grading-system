import React, { useRef } from 'react';

interface Props {
  getSubjects: string[];
  getCategories: string[];
  handleSubjectChange: (subject: string) => void;
}

const ViewGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  handleSubjectChange,
}) => {
  const quarterRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <div className='enter-grades-container'>
      <select id='quarter-selection' defaultValue='' ref={quarterRef}>
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
        onChange={() => handleSubjectChange(subjectRef.current?.value || '')}
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
      <select
        id='category-selection'
        ref={categoryRef}
        defaultValue='All Categories'
      >
        <option value='All Categories'>All Categories</option>
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

      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ViewGrades;
