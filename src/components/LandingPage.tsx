import React, { useState } from 'react';
import EnterGrades from './EnterGrades';
import ManageGrades from './ManageGrades';

interface Props {
  getUser: string;
  logOut: () => Promise<void>;
  getSubjects: string[];
  getCategories: string[];
  fetchCategories: (subject: string) => Promise<void>;
}

const LandingPage: React.FC<Props> = ({
  getUser,
  logOut,
  getSubjects,
  getCategories,
  fetchCategories,
}) => {
  const [showEnterGrades, setShowEnterGrades] = useState<boolean>(true);

  const handleTabSwitch = () => {
    setShowEnterGrades(!showEnterGrades);
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
            className={`tab ${showEnterGrades ? 'disabled' : ''}`}
            onClick={handleTabSwitch}
          >
            Enter Grades
          </button>
          <button
            className={`tab ${showEnterGrades ? '' : 'disabled'}`}
            onClick={handleTabSwitch}
          >
            Manage Grades
          </button>
        </div>

        {showEnterGrades && (
          <EnterGrades
            getSubjects={getSubjects}
            getCategories={getCategories}
            fetchCategories={fetchCategories}
          />
        )}
        {!showEnterGrades && (
          <ManageGrades
            getSubjects={getSubjects}
            getCategories={getCategories}
            fetchCategories={fetchCategories}
          />
        )}
      </div>
    </section>
  );
};

export default LandingPage;
