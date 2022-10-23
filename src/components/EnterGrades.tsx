import React, { useRef, useState } from 'react';

interface Props {
  getSubjects: string[];
  getCategories: string[];
  handleSubjectChange: (subject: string) => void;
  getAssignments: (
    quarter: string,
    subject: string,
    category?: string
  ) => string[];
}

const EnterGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  handleSubjectChange,
  getAssignments,
}) => {
  const [getQuarter, setQuarter] = useState<string>('Select a Quarter');
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('Select a Category');

  const quarterRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const assignmentRef = useRef<HTMLSelectElement>(null);

  return (
    <div className='enter-grades-container'>
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
      <select
        id='category-selection'
        ref={categoryRef}
        defaultValue='Select a Category'
        onChange={() =>
          setCategory(categoryRef.current?.value || 'Select a Category')
        }
        disabled={getSubject === 'Select a Subject'}
      >
        <option value='Select a Category' disabled>
          Select a Category
        </option>
        {getCategories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      <select
        id='assignment-selection'
        ref={assignmentRef}
        disabled={getCategory === 'Select a Category'}
        defaultValue='Select an Assignment'
      >
        <option disabled value='Select an Assignment'>
          Select an Assignment
        </option>
        {getAssignments(getQuarter, getSubject, getCategory).map(
          (assignment) => {
            return (
              <option key={assignment} value={assignment}>
                {assignment}
              </option>
            );
          }
        )}
      </select>
      <button>Enter Grades</button>
    </div>
  );
};

export default EnterGrades;
