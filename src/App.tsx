import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

// FIXME:
import subjects from './data/subjects.json';
import students from './data/students.json';
import teachers from './data/teacher.json';

import Subject from './components/Interfaces/SubjectInterface';
import Student from './components/Interfaces/StudentInterface';

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

  const getStudentsBySubject = (subject: string): string[] => {
    const studentList: string[] = [];

    students.students.forEach((student) => {
      student.grades.forEach((grade) => {
        if (grade.class === subject) studentList.push(student.name);
      });
    });

    return studentList;
  };

  const getAssignments = (
    quarter: string,
    subject: string,
    category: string = 'All Categories'
  ): string[] => {
    if (!quarter || !subject || !category) return [];
    try {
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
    } catch (e) {
      return [];
    }
  };

  const getQuarterlyGrade = (
    student: string,
    subject: string,
    quarter: string
  ) => {
    const studentAssignments = students.students
      .filter((item) => item.name === student)[0]
      .grades.filter((grade) => grade.class === subject)[0].assignments;

    let subjectAssignments: string[];
    subjects.classes
      .filter((item) => item.subject === subject)[0]
      .categories.forEach((category) => {
        category.assignments.forEach((assignment) => {
          if (assignment.quarter.includes(quarter))
            subjectAssignments.push(assignment.name);
        });
      });

    // FIXME: move all grading data into subjects and simplify student JSON ?
  };

  const getStudentObj = (name: string): Student => {
    return students.students.filter(
      (student) => student.name === name
    )[0] as Student;
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
          setCategoriesForSubject={setCategoriesForSubject}
          setStudentsBySubject={setStudentsBySubject}
          getStudents={getStudents}
          getAssignments={getAssignments}
          getStudentObj={getStudentObj}
          getStudentsBySubject={getStudentsBySubject}
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
