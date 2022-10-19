import React, { useRef, useState } from 'react';

interface Props {
  getSubjects: string[];
  getCategories: string[];
  handleSubjectChange: (subject: string) => void;
  getStudents: string[];
  getAssignments: (
    quarter: string,
    subject: string,
    category?: string
  ) => string[];
}

const ViewGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  handleSubjectChange,
  getStudents,
  getAssignments,
}) => {
  const [getQuarter, setQuarter] = useState<string>('Select a Quarter');
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('All Categories');

  const quarterRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

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
        defaultValue='All Categories'
        onChange={() =>
          setCategory(categoryRef.current?.value || 'All Categories')
        }
        disabled={getSubject === 'Select a Subject'}
      >
        <option value='All Categories'>All Categories</option>
        {getCategories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>
      {subjectRef.current?.value && (
        <table>
          <thead>
            <tr>
              <th scope='col' rowSpan={2}>
                Name
              </th>
              <th rowSpan={2}>Annual Total</th>
              <th rowSpan={2}>Quarterly Total</th>
              {getCategories.map((category) => {
                if (
                  categoryRef.current?.value === category ||
                  categoryRef.current?.value === 'All Categories'
                )
                  return (
                    <th
                      key={category}
                      colSpan={
                        getAssignments(getQuarter, getSubject, category).length
                      }
                    >
                      {category}
                    </th>
                  );
              })}
            </tr>
          </thead>
          <tbody>
            {getStudents.map((student) => {
              return (
                <tr key={student}>
                  <td>{student}</td>
                  <td>100</td>
                  <td>100</td>
                  {getCategories.map((category) => {
                    if (
                      category === getCategory ||
                      getCategory === 'All Categories'
                    ) {
                      return getAssignments(
                        getQuarter,
                        getSubject,
                        category
                      ).map((assignment) => {
                        return (
                          <td key={`${category}-${assignment}`}>
                            {assignment}
                          </td>
                        );
                      });
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewGrades;
