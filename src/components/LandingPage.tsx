import React, { useRef } from 'react';

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
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const handleSubjectChange = () => {
    fetchCategories(subjectRef.current?.value || '');
  };

  return (
    <section className='landing-page-container'>
      <div className='user-info-area'>
        <h2>Hi, {getUser}</h2>
        <button onClick={logOut}>Sign Out</button>
      </div>

      <div className='landing-page-options-area'>
        <button>Manage Grade Weights</button>

        <select id='quarter-selection' defaultValue=''>
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
          onChange={handleSubjectChange}
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

        <select id='category-selection' ref={categoryRef} defaultValue=''>
          <option disabled value=''>
            Select a Category
          </option>
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

        <button>Enter Grades</button>
      </div>
    </section>
  );
};

export default LandingPage;
