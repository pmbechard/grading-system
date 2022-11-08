import React, { useReducer, useState } from 'react';
import { initialState, reducer } from './Interfaces/Reducer';

import ViewGrades from './ViewGrades';

interface Props {
  logOut: () => Promise<void>;
  getTeacher: string;
  getSubjectList: string[];
  readStudents: (subject: string) => Promise<string[]>;
  readCategories: (quarter: string, subject: string) => Promise<string[]>;
  readAssignments: (
    quarter: string,
    subject: string,
    category: string
  ) => Promise<string[]>;
  readGrades: (
    subject: string,
    category: string,
    assignment: string
  ) => Promise<
    {
      name: string;
      grade: string;
    }[]
  >;
}

const LandingPage: React.FC<Props> = ({
  logOut,
  getTeacher,
  getSubjectList,
  readStudents,
  readCategories,
  readAssignments,
  readGrades,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [getTab, setTab] = useState<string>('view');

  const handleTabSwitch = (tab: string) => {
    setTab(tab);
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
            currentState={state}
            dispatch={dispatch}
            getSubjectList={getSubjectList}
            readStudents={readStudents}
            readCategories={readCategories}
            readAssignments={readAssignments}
            readGrades={readGrades}
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
