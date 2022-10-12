import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

// FIXME:
import sample from './sampleData.json';

function App() {
  const [getUser, setUser] = useState<string>('');
  const [getSubjects, setSubjects] = useState<string[]>([]);
  const [getCategories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const logIn = async (): Promise<void> => {
    // FIXME: Add log in functionality
    setTimeout(() => setUser(sample.user), 500);
  };

  const logOut = async (): Promise<void> => {
    // FIXME: Add log out functionality
    setTimeout(() => setUser(''), 500);
  };

  const fetchSubjects = async (): Promise<void> => {
    // FIXME:
    const subjectList: string[] = [];
    sample.subjects.forEach((obj) => {
      subjectList.push(obj.subject);
    });
    setSubjects(subjectList);
  };

  const fetchCategories = async (subject: string): Promise<void> => {
    // FIXME:
    let categoryList: string[] = [];
    sample.subjects.forEach((obj) => {
      if (obj.subject === subject) {
        obj.categories.forEach((cat) => {
          categoryList.push(cat.category);
        });
      }
    });
    setCategories(categoryList);
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
          fetchCategories={fetchCategories}
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
