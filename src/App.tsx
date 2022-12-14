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
  const readStudents = async (subject: string): Promise<string[]> => {
    const studentList: string[] = [];
    students.students.forEach((student) => {
      if (student.grades.filter((grade) => grade.class === subject).length > 0)
        studentList.push(student.name);
    });
    return studentList;
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
  const readCategories = async (
    quarter: string,
    subject: string
  ): Promise<string[]> => {
    const categories: string[] = [];
    try {
      let subjectObj = subjects.classes.filter(
        (sub) => sub.subject === subject
      )[0];
      subjectObj.categories.forEach((category) => {
        if (category.quarters.includes(quarter.substring(1)))
          categories.push(category.category);
      });
    } catch (e) {
      return [];
    }
    return categories;
  };
  const readAssignments = async (
    quarter: string,
    subject: string,
    category: string
  ): Promise<string[]> => {
    console.log('here', quarter, subject, category);
    let assignments: string[] = [];
    try {
      const subjectObj = subjects.classes.filter(
        (obj) => obj.subject === subject
      )[0];
      const categoriesObj =
        category === 'All Categories'
          ? subjectObj.categories
          : subjectObj.categories.filter((item) => item.category === category);
      const filteredCategories = categoriesObj.filter((item) =>
        item.quarters.includes(quarter.substring(1))
      );
      filteredCategories.forEach((item) =>
        item.assignments.forEach((ass) => assignments.push(ass.name))
      );
    } catch (e) {
      console.log(assignments);
      console.log(e);
    }
    return assignments;
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
          readStudents={readStudents}
          readCategories={readCategories}
          readAssignments={readAssignments}
          readGrades={readGrades}
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
