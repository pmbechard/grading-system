import React, { useRef, useState } from 'react';
import Student from './interfaces/StudentInterface';

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

  const quarterRef = useRef<HTMLSelectElement>(null);
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const assignmentRef = useRef<HTMLSelectElement>(null);

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
      <select
        id='quarter-selection'
        defaultValue=''
        ref={quarterRef}
        onChange={() =>
          setQuarter(quarterRef.current?.value || 'Select a Quarter')
        }
      >
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
        onChange={() => {
          handleSubjectChange(subjectRef.current?.value || '');
          setSubject(subjectRef.current?.value || 'Select a Subject');
        }}
        disabled={getQuarter === 'Select a Quarter'}
      >
        <option disabled value=''>
          Select a Subject
        </option>
        {getSubjects.map((subject) => {
          return (
            <option key={subject} value={subject}>
              {subject}
            </option>
          );
        })}
      </select>
      <select
        id='category-selection'
        ref={categoryRef}
        defaultValue='Select a Category'
        onChange={() =>
          setCategory(categoryRef.current?.value || 'Select a Category')
        }
        disabled={getSubject === 'Select a Subject'}
      >
        <option value='Select a Category' disabled>
          Select a Category
        </option>
        {getCategories.map((category) => {
          return (
            <option key={category} value={category}>
              {category}
            </option>
          );
        })}
      </select>

      <select
        id='assignment-selection'
        ref={assignmentRef}
        disabled={getCategory === 'Select a Category'}
        defaultValue='Select an Assignment'
        onChange={() =>
          setAssignment(assignmentRef.current?.value || 'Select an Assignment')
        }
      >
        <option disabled value='Select an Assignment'>
          Select an Assignment
        </option>
        {getAssignments(getQuarter, getSubject, getCategory).map(
          (assignment) => {
            return (
              <option key={assignment} value={assignment}>
                {assignment}
              </option>
            );
          }
        )}
      </select>
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
