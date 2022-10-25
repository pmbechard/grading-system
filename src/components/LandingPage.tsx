import React, { useState } from 'react';
import EnterGrades from './EnterGrades';
import Student from './interfaces/StudentInterface';
import ManageGradeStructure from './ManageGradeStructure';
import ViewGrades from './ViewGrades';

interface Props {
  getUser: string;
  logOut: () => Promise<void>;
  getSubjects: string[];
  getCategories: string[];
  setCategoriesForSubject: (subject: string) => Promise<void>;
  setStudentsBySubject: (subject: string) => Promise<void>;
  getStudents: string[];
  getAssignments: (
    quarter: string,
    subject: string,
    category?: string
  ) => string[];
  getStudentObj: (name: string) => Student;
  getStudentsBySubject: (subject: string) => string[];
}

const LandingPage: React.FC<Props> = ({
  getUser,
  logOut,
  getSubjects,
  getCategories,
  setCategoriesForSubject,
  setStudentsBySubject,
  getStudents,
  getAssignments,
  getStudentObj,
  getStudentsBySubject,
}) => {
  const [getTab, setTab] = useState<string>('view');

  const handleTabSwitch = (tab: string) => {
    setTab(tab);
  };

  const handleSubjectChange = (subject: string) => {
    setCategoriesForSubject(subject);
    setStudentsBySubject(subject);
  };

  return (
    <section className='landing-page-container'>
      <div className='user-info-area'>
        <h2>Hi, {getUser}</h2>
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
            handleSubjectChange={handleSubjectChange}
            getStudents={getStudents}
            getAssignments={getAssignments}
            getStudentObj={getStudentObj}
          />
        )}
        {getTab === 'enter' && (
          <EnterGrades
            getSubjects={getSubjects}
            getCategories={getCategories}
            handleSubjectChange={handleSubjectChange}
            getAssignments={getAssignments}
            getStudentsBySubject={getStudentsBySubject}
            getStudentObj={getStudentObj}
          />
        )}
        {getTab === 'manage' && (
          <ManageGradeStructure
            getSubjects={getSubjects}
            getCategories={getCategories}
            handleSubjectChange={handleSubjectChange}
          />
        )}
      </div>
    </section>
  );
};

export default LandingPage;
