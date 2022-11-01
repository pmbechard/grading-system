import React, { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

import subjects from './data/subjects.json';
import students from './data/students.json';
import teachers from './data/teachers.json';

import Subject from './components/Interfaces/SubjectInterface';
import Student from './components/Interfaces/StudentInterface';

function App() {
  const [getTeacher, setTeacher] = useState<string>('');
  const [getStudents, setStudents] = useState<string[]>([]);
  const [getSubjects, setSubjects] = useState<string[]>([]);
  const [getCategories, setCategories] = useState<string[]>([]);
  const [getAssignments, setAssignments] = useState<string[]>([]);

  useEffect(() => {}, []);

  const logIn = async (): Promise<void> => {
    setTimeout(() => setTeacher(teachers.teachers[0].name), 500);
  };

  const logOut = async (): Promise<void> => {
    setTimeout(() => setTeacher(''), 500);
  };

  // const fetchSubjects = async (): Promise<void> => {
  //   // FIXME:
  //   const subjectsData = subjects.classes as Subject[];
  //   setSubjects(subjectsData.map((item) => item.subject));
  // };

  // const setCategoriesForSubject = async (subject: string): Promise<void> => {
  //   const categoriesData = (subjects.classes as Subject[]).filter(
  //     (item) => item.subject === subject
  //   )[0].categories;
  //   setCategories(categoriesData.map((item) => item.category));
  // };

  // const setStudentsBySubject = async (subject: string): Promise<void> => {
  //   const studentList: string[] = [];

  //   students.students.forEach((student) => {
  //     student.grades.forEach((grade) => {
  //       if (grade.class === subject) studentList.push(student.name);
  //     });
  //   });

  //   setStudents(studentList);
  // };

  // const getStudentsBySubject = (subject: string): string[] => {
  //   const studentList: string[] = [];

  //   students.students.forEach((student) => {
  //     student.grades.forEach((grade) => {
  //       if (grade.class === subject) studentList.push(student.name);
  //     });
  //   });

  //   return studentList;
  // };

  // const getAssignments = (
  //   quarter: string,
  //   subject: string,
  //   category: string = 'All Categories'
  // ): string[] => {
  //   if (!quarter || !subject || !category) return [];
  //   try {
  //     quarter = quarter.slice(1);
  //     const assignmentsList: string[] = [];
  //     subjects.classes
  //       .filter((item) => item.subject === subject)[0]
  //       .categories.forEach((cat) => {
  //         if (cat.category === category || category === 'All Categories') {
  //           cat.assignments.forEach((assignment) => {
  //             if (assignment.quarter.includes(quarter)) {
  //               assignmentsList.push(assignment.name);
  //             }
  //           });
  //         }
  //       });
  //     return assignmentsList;
  //   } catch (e) {
  //     return [];
  //   }
  // };

  // const getStudentObj = (name: string): Student => {
  //   return students.students.filter(
  //     (student) => student.name === name
  //   )[0] as Student;
  // };

  // CREATE
  const createCategory = async (quarter: string, subject: string) => {};
  const createAssignment = async (
    quarter: string,
    subject: string,
    category: string
  ) => {};

  // READ
  const readStudents = async (subject: string): Promise<void> => {
    const studentList: string[] = [];
    students.students.forEach((student) => {
      if (student.grades.filter((grade) => grade.class === subject).length > 0)
        studentList.push(student.name);
    });
    setStudents(studentList);
  };
  const readGrades = async (
    subject: string,
    category: string,
    assignment: string
  ) => {
    let gradeList: { name: string; grade: string }[] = [];
    let studentList = students.students
      .filter((student) =>
        student.grades.filter((grade) => grade.class === subject)
      )
      .filter((student) =>
        student.grades[0].assignments.filter(
          (item) => item.assignment === assignment && item.category === category
        )
      );
    studentList.forEach((student) => {
      gradeList.push({
        name: student.name,
        grade: student.grades[0].assignments[0].grade,
      });
    });
    return gradeList;
  };
  const readSubjects = async (teacherName: string): Promise<void> => {
    setSubjects(
      teachers.teachers.filter((teacher) => teacher.name === teacherName)[0]
        .classes
    );
  };
  const readCategories = async (
    quarter: string,
    subject: string
  ): Promise<void> => {
    const categories: string[] = [];
    subjects.classes
      .filter((item) => item.subject === subject)[0]
      .categories.filter((category) => category.quarters.includes(quarter))
      .forEach((i) => categories.push(i.category));
    setCategories(categories);
  };
  const readAssignments = async (
    quarter: string,
    subject: string,
    category: string
  ): Promise<void> => {
    const assignments: string[] = [];
    subjects.classes
      .filter((i) => i.subject === subject)[0]
      .categories.filter((j) => j.quarters.includes(quarter))
      .filter((k) => k.category === category)[0]
      .assignments.filter((m) => m.quarter.includes(quarter))
      .forEach((n) => assignments.push(n.name));
    setAssignments(assignments);
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
          getStudents={getStudents}
          getSubjects={getSubjects}
          getCategories={getCategories}
          getAssignments={getAssignments}

          readCategories={readCategories}
          readAssignments={readAssignments}

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
