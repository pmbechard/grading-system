import React, { useReducer, useState } from 'react';
import { initialState, reducer } from './Interfaces/Reducer';

import EnterGrades from './EnterGrades';
import ManageGradeStructure from './ManageGradeStructure';
import ViewGrades from './ViewGrades';

interface Props {
  logOut: () => Promise<void>;
  getTeacher: string;
  getSubjectList: string[];
}

const LandingPage: React.FC<Props> = ({
  logOut,
  getTeacher,
  getSubjectList,
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
