import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

// FIXME:
import subjects from './data/subjects.json';
import students from './data/students.json';
import teachers from './data/teacher.json';

import Subject from './components/interfaces/SubjectInterface';
import Student from './components/interfaces/StudentInterface';

function App() {
  const [getUser, setUser] = useState<string>('');
  const [getSubjects, setSubjects] = useState<string[]>([]);
  const [getCategories, setCategories] = useState<string[]>([]);
  const [getStudents, setStudents] = useState<string[]>([]);

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
    const subjectsData = subjects.classes as Subject[];
    setSubjects(subjectsData.map((item) => item.subject));
  };

  const setCategoriesForSubject = async (subject: string): Promise<void> => {
    const categoriesData = (subjects.classes as Subject[]).filter(
      (item) => item.subject === subject
    )[0].categories;
    setCategories(categoriesData.map((item) => item.category));
  };

  const setStudentsBySubject = async (subject: string): Promise<void> => {
    const studentList: string[] = [];

    students.students.forEach((student) => {
      student.grades.forEach((grade) => {
        if (grade.class === subject) studentList.push(student.name);
      });
    });

    setStudents(studentList);
  };

  const getAssignments = (
    quarter: string,
    subject: string,
    category: string = 'All Categories'
  ): string[] => {
    quarter = quarter.slice(1);
    const assignmentsList: string[] = [];
    subjects.classes
      .filter((item) => item.subject === subject)[0]
      .categories.forEach((cat) => {
        if (cat.category === category || category === 'All Categories') {
          cat.assignments.forEach((assignment) => {
            if (assignment.quarter.includes(quarter)) {
              assignmentsList.push(assignment.name);
            }
          });
        }
      });
    return assignmentsList;
  };

  const getStudentObj = (name: string): Student => {
    return students.students.filter((student => student.name === name))[0] as Student;
  }
  return (
    <>
      <Header />
      {getUser ? (
        <LandingPage
          getUser={getUser}
          logOut={logOut}
          getSubjects={getSubjects}
          getCategories={getCategories}
          setCategoriesForSubject={setCategoriesForSubject}
          setStudentsBySubject={setStudentsBySubject}
          getStudents={getStudents}
          getAssignments={getAssignments}
          getStudentObj={getStudentObj}
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
