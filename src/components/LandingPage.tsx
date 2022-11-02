import React, { useReducer, useState } from 'react';
import EnterGrades from './EnterGrades';
import ManageGradeStructure from './ManageGradeStructure';
import ViewGrades from './ViewGrades';

interface Props {
  logOut: () => Promise<void>;
  getTeacher: string;
  getStudents: string[];
  getSubjects: string[];
  readCategories: (quarter: string, subject: string) => Promise<string[]>;
  readAssignments: (
    quarter: string,
    subject: string,
    category: string
  ) => Promise<string[]>;
}

interface StateObj {
  teacher: string;
  allSubjects: string[];
  selectedSubject?: string;
  selectedStudents?: string[];
  selectedQuarter?: string;
  selectedCategory?: string;
  selectedAssignment?: string;
}

const reducer = (state: StateObj, action) => {
  //FIXME:
};

const LandingPage: React.FC<Props> = ({
  logOut,
  getTeacher,
  getStudents,
  getSubjects,
  readCategories,
  readAssignments,
}) => {
  const initialState = { teacher: getTeacher, allSubjects: getSubjects };
  const [state, dispatch] = useReducer(reducer, initialState);

  const [getTab, setTab] = useState<string>('view');
  const [getQuarter, setQuarter] = useState<string>('');
  const [getSubject, setSubject] = useState<string>('');
  const [getCategories, setCategories] = useState<string[]>([]);
  const [getAssignments, setAssignments] = useState<string[]>([]);

  const handleTabSwitch = (tab: string) => {
    setTab(tab);
  };

  const handleQuarterChange = async (quarter: string) => {
    setQuarter(quarter);
  };

  const handleSubjectChange = async (subject: string) => {
    setSubject(subject);
    const data = await readCategories(getQuarter, subject);
    setCategories(data);
  };

  const handleCategoryChange = async (category: string) => {
    const data = await readAssignments(getQuarter, getSubject, category);
    setAssignments(data);
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
            getStudents={getStudents}
            getQuarter={getQuarter}
            getSubjects={getSubjects}
            getCategories={getCategories}
            getAssignments={getAssignments}
            handleQuarterChange={handleQuarterChange}
            handleSubjectChange={handleSubjectChange}
            handleCategoryChange={handleCategoryChange}
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
