import React, { useState } from 'react';
import Student from './Interfaces/StudentInterface';
import AssignmentDropdown from './MenuOptions/AssignmentDropdown';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterDropdown from './MenuOptions/QuarterDropdown';
import SubjectDropdown from './MenuOptions/SubjectDropdown';

interface Props {
  getSubjects: string[];
  getCategories: string[];
  handleSubjectChange: (subject: string) => void;
  getAssignments: (
    quarter: string,
    subject: string,
    category?: string
  ) => string[];
  getStudentsBySubject: (subject: string) => string[];
  getStudentObj: (name: string) => Student;
}

const EnterGrades: React.FC<Props> = ({
  getSubjects,
  getCategories,
  handleSubjectChange,
  getAssignments,
  getStudentsBySubject,
  getStudentObj,
}) => {
  const [getQuarter, setQuarter] = useState<string>('Select a Quarter');
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('Select a Category');
  const [getAssignment, setAssignment] = useState<string>(
    'Select an Assignment'
  );
  const [getStudentGrades, setStudentGrades] =
    useState<{ name: string; grade: string }[]>();

  const handleGetGrades = () => {
    const studentList = getStudentsBySubject(getSubject);
    let studentObjList: Student[] = [];
    studentList.forEach((student) => {
      studentObjList.push(getStudentObj(student));
    });

    let studentGradeObjList: { name: string; grade: string }[] = [];
    studentObjList.forEach((student) => {
      studentGradeObjList.push({
        name: student.name,
        grade: getGrade(student.name, getAssignment),
      });
    });
    setStudentGrades(studentGradeObjList);
  };

  const getGrade = (name: string, assignment: string) => {
    try {
      const studentGrades = getStudentObj(name).grades.filter((grade) => {
        return grade.class === getSubject;
      })[0];
      return studentGrades.assignments.filter(
        (item) => item.name === assignment
      )[0].grade;
    } catch (e) {
      return '-';
    }
  };

  const handleGradeChange = (name: string, grade: string) => {
    getStudentGrades?.forEach((student) => {
      if (student.name === name) student.grade = grade;
    });
  };

  const commitGradeChanges = () => {
    // FIXME: push changes to db
  };

  return (
    <div className='enter-grades-container'>
      <QuarterDropdown setQuarter={setQuarter} />
      <SubjectDropdown
        handleSubjectChange={handleSubjectChange}
        getSubjects={getSubjects}
        disabled={getQuarter === 'Select a Quarter'}
        setSubject={setSubject}
      />
      <CategoryDropdown
        getCategories={getCategories}
        setCategory={setCategory}
        disabled={getSubject === 'Select a Subject'}
      />
      <AssignmentDropdown
        setAssignment={setAssignment}
        disabled={getCategory === 'Select a Category'}
        assignmentList={getAssignments(getQuarter, getSubject, getCategory)}
      />
      <button
        disabled={getAssignment === 'Select an Assignment'}
        onClick={handleGetGrades}
      >
        Enter Grades
      </button>

      {getStudentGrades && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {getStudentGrades?.map((student) => (
                <tr key={`${student.name}-${student.grade}`}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type='text'
                      defaultValue={student.grade}
                      onChange={(e) =>
                        handleGradeChange(student.name, e.currentTarget.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={commitGradeChanges}>Save</button>
        </>
      )}
    </div>
  );
};

export default EnterGrades;
