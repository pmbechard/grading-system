import React, { useState } from 'react';
import EnterGrades from './EnterGrades';
import ManageGradeStructure from './ManageGradeStructure';
import ViewGrades from './ViewGrades';

interface Props {
  logOut: () => Promise<void>;
  getTeacher: string;
  getStudents: string[];
  getSubjects: string[];
  getCategories: string[];
  getAssignments: string[];
  readCategories: (quarter: string, subject: string) => Promise<void>;
  readAssignments: (
    quarter: string,
    subject: string,
    category: string
  ) => Promise<void>;
}

const LandingPage: React.FC<Props> = ({
  logOut,
  getTeacher,
  getStudents,
  getSubjects,
  getCategories,
  getAssignments,
  readCategories,
  readAssignments,
}) => {
  const [getTab, setTab] = useState<string>('view');

  const handleTabSwitch = (tab: string) => {
    setTab(tab);
  };

  const handleSubjectChange = (quarter: string = '', subject: string) => {
    readCategories(quarter, subject);
  };

  const handleCategoryChange = (
    quarter: string,
    subject: string,
    category: string
  ) => {
    readAssignments(quarter, subject, category);
  };

  return (
    <section className='landing-page-container'>
      <div className='user-info-area'>
        <h2>Hi, {getTeacher}</h2>
        <button onClick={logOut}>Sign Out</button>
      </div>

      <div className='landing-page-options-area'>
        <div className='landing-page-tabs'>
          <button
            className={`tab ${getTab === 'view' && 'disabled'}`}
            onClick={() => handleTabSwitch('view')}
          >
            View Grades
          </button>
          <button
            className={`tab ${getTab === 'enter' && 'disabled'}`}
            onClick={() => handleTabSwitch('enter')}
          >
            Enter Grades
          </button>
          <button
            className={`tab ${getTab === 'manage' && 'disabled'}`}
            onClick={() => handleTabSwitch('manage')}
          >
            Manage Grade Structure
          </button>
        </div>

        {getTab === 'view' && (
          <ViewGrades
            getSubjects={getSubjects}
            getCategories={getCategories}
            getStudents={getStudents}
            handleSubjectChange={handleSubjectChange}
            handleCategoryChange={handleCategoryChange}
            getAssignments={getAssignments}
          />
        )}
        {getTab === 'enter' && (
          // <EnterGrades
          //   getSubjects={getSubjects}
          //   getCategories={getCategories}
          //   handleSubjectChange={handleSubjectChange}
          //   getAssignments={getAssignments}
          //   getStudentsBySubject={getStudentsBySubject}
          //   getStudentObj={getStudentObj}
          //   updateGrade={updateGrade}
          // />
          <p>Enter Grades</p>
        )}
        {getTab === 'manage' && (
          // <ManageGradeStructure
          //   getSubjects={getSubjects}
          //   getCategories={getCategories}
          //   handleSubjectChange={handleSubjectChange}
          //   getAssignments={getAssignments}
          // />
          <p>Manage Grade Structure</p>
        )}
      </div>
    </section>
  );
};

export default LandingPage;
