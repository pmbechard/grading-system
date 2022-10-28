import React, { useState } from 'react';
import Student from './Interfaces/StudentInterface';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterDropdown from './MenuOptions/QuarterDropdown';
import SubjectDropdown from './MenuOptions/SubjectDropdown';

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
  getStudentObj: (name: string) => Student;
}

const ViewGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  handleSubjectChange,
  getStudents,
  getAssignments,
  getStudentObj,
}) => {
  const [getQuarter, setQuarter] = useState<string>('Select a Quarter');
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('All Categories');

  return (
    <div className='view-grades-container'>
      <div className='view-grades-options'>
        <QuarterDropdown setQuarter={setQuarter} />

        <SubjectDropdown
          handleSubjectChange={handleSubjectChange}
          getSubjects={getSubjects}
          disabled={getQuarter === 'Select a Quarter'}
          setSubject={setSubject}
        />
        <CategoryDropdown
          getCategories={getCategories}
          setCategory={setCategory}
          disabled={getSubject === 'Select a Subject'}
        />
      </div>
      {getSubject !== 'Select a Subject' && (
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
                  getCategory === category ||
                  getCategory === 'All Categories'
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
                <>
                  <tr key={student}>
                    <td rowSpan={2}>{student}</td>
                    <td rowSpan={2}>100</td>
                    <td rowSpan={2}>100</td>
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
                  <tr key={`${student}-grades`}>
                    {getStudentObj(student).grades.map((grade) => {
                      if (getSubject === grade.class) {
                        return grade.assignments.map((assignment) => {
                          if (
                            assignment.category === getCategory ||
                            getCategory === 'All Categories'
                          )
                            return (
                              <td
                                key={`${student}-${assignment}-${assignment.grade}`}
                              >
                                {assignment.grade}
                              </td>
                            );
                        });
                      }
                    })}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewGrades;
