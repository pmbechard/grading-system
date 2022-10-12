import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    // FIXME: fetch on every change is dangerous
    fetchCategories(subjectRef.current?.value || '');
  });

  return (
    <section className='landing-page-container'>
      <h2>Hi, {getUser}</h2>
      <button onClick={logOut}>Sign Out</button>

      <div className='landing-page-options-area'>
        <button>Manage Grade Weights</button>

        <label htmlFor='quarter-selection'>Choose a quarter: </label>
        <select id='quarter-selection'>
          <option value='q1'>Q1</option>
          <option value='q2'>Q2</option>
          <option value='q3'>Q3</option>
          <option value='q4'>Q4</option>
        </select>

        <label htmlFor='subject-selection'>Choose a subject: </label>
        <select id='subject-selection' ref={subjectRef}>
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

        <label htmlFor='category-selection'>Choose a category: </label>
        <select id='category-selection' ref={categoryRef}>
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
      </div>
    </section>
  );
};

export default LandingPage;
