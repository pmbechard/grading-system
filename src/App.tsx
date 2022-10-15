import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

// FIXME:
import students from './data/students.json';
import teachers from './data/teacher.json';
import classes from './data/classes.json';

import ClassesInterface from './components/interfaces/ClassesInterface';

function App() {
  const [getUser, setUser] = useState<string>('');
  const [getSubjects, setSubjects] = useState<string[]>([]);
  const [getCategories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const logIn = async (): Promise<void> => {
    // FIXME: Add log in functionality
    setTimeout(() => setUser(teachers['john@school.com'].name), 500);
  };

  const logOut = async (): Promise<void> => {
    // FIXME: Add log out functionality
    setTimeout(() => setUser(''), 500);
  };

  const fetchSubjects = async (): Promise<void> => {
    // FIXME:
    const classesObj = classes as ClassesInterface;
  };

  const getCategoriesForSubject = async (subject: string): Promise<void> => {
    // FIXME:
    // const classObj = classes.classes.
    // setCategories(classObj.categories);
  };

  return (
    <>
      <Header />
      {getUser ? (
        <LandingPage
          getUser={getUser}
          logOut={logOut}
          getSubjects={getSubjects}
          getCategories={getCategories}
          getCategoriesForSubject={getCategoriesForSubject}
        />
      ) : (
        <div className='log-in-area'>
          <button onClick={logIn}>Sign In</button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default App;
