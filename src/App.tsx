import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

import subjects from './data/subjects.json';
import students from './data/students.json';
import teachers from './data/teachers.json';

const App = () => {
  const [getTeacher, setTeacher] = useState<string>('');
  const [getSubjectList, setSubjectList] = useState<string[]>([]);

  useEffect(() => {
    fetchSubjects(getTeacher);
  }, [getTeacher]);

  const logIn = async (): Promise<void> => {
    setTimeout(() => setTeacher(teachers.teachers[0].name), 500);
  };
  const logOut = async (): Promise<void> => {
    setTimeout(() => setTeacher(''), 500);
  };

  // CREATE
  const createCategory = async (quarter: string, subject: string) => {};
  const createAssignment = async (
    quarter: string,
    subject: string,
    category: string
  ) => {};

  // READ
  const fetchSubjects = async (teacherName: string): Promise<void> => {
    if (!teacherName) return;
    setSubjectList(
      teachers.teachers.filter((teacher) => teacher.name === teacherName)[0]
        .classes
    );
  };

  // UPDATE
  const updateGrades = async (
    student: string,
    quarter: string,
    subject: string,
    category: string,
    assignment: string
  ) => {};
  const updateCategoryWeights = async (quarter: string, subject: string) => {};

  // DELETE
  const deleteCategory = async (
    quarter: string,
    subject: string,
    category: string
  ) => {};
  const deleteAssignment = async (
    quarter: string,
    subject: string,
    category: string,
    assignment: string
  ) => {};

  return (
    <>
      <Header />
      {getTeacher ? (
        <LandingPage
          logOut={logOut}
          getTeacher={getTeacher}
          getSubjectList={getSubjectList}
        />
      ) : (
        <div className='log-in-area'>
          <button onClick={logIn}>Sign In</button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default App;
