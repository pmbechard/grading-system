import subjects from '../../data/subjects.json';
import students from '../../data/students.json';

// REDUCER

export interface CurrentStateObj {
  selectedSubject?: string;
  selectedQuarter?: string;
  selectedCategory?: string;
  selectedAssignment?: string;
  studentList?: string[];
  categoryList?: string[];
  assignmentList?: string[];
  grades?: { name: string; grade: string }[];
}

export const reducer = (state: CurrentStateObj, action: any) => {
  switch (action.type) {
    case 'changeSubject':
      const getStudentData = async () => {
        studentData = await readStudents(action.payload);
      };
      let studentData;
      getStudentData();
      return {
        selectedQuarter: state.selectedQuarter || '',
        selectedSubject: action.payload,
        studentList: studentData,
      };
    case 'changeQuarter':
      const getCategoryData = async () => {
        categoryData = await readCategories(
          action.payload,
          state.selectedSubject || ''
        );
      };
      let categoryData;
      getCategoryData();
      return {
        selectedSubject: state.selectedSubject || '',
        studentList: state.studentList || [],
        selectedQuarter: action.payload,
        categoryList: categoryData,
      };
    case 'changeCategory':
      const getAssignmentData = async () => {
        assignmentData = await readAssignments(
          state.selectedQuarter || '',
          state.selectedSubject || '',
          state.selectedCategory || ''
        );
      };
      let assignmentData;
      getAssignmentData();
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: action.payload,
        assignmentList: assignmentData,
      };
    case 'changeAssignment':
      const getGradesData = async () => {
        gradesData = await readGrades(
          state.selectedSubject || '',
          state.selectedCategory || '',
          state.selectedAssignment || ''
        );
      };
      let gradesData;
      getGradesData();
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: state.selectedCategory,
        assignmentList: state.assignmentList,
        selectedAssignment: action.payload,
        grades: gradesData,
      };
    default:
      return { ...state } as CurrentStateObj;
  }
};

export const initialState = { selectedSubject: '' } as CurrentStateObj;

// READ FUNCTIONS

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
  subjects.classes
    .filter((item) => item.subject === subject)[0]
    .categories.filter((category) => category.quarters.includes(quarter))
    .forEach((i) => categories.push(i.category));
  return categories;
};
const readAssignments = async (
  quarter: string,
  subject: string,
  category: string
): Promise<string[]> => {
  const assignments: string[] = [];
  subjects.classes
    .filter((i) => i.subject === subject)[0]
    .categories.filter((j) => j.quarters.includes(quarter))
    .filter((k) => k.category === category)[0]
    .assignments.filter((m) => m.quarter.includes(quarter))
    .forEach((n) => assignments.push(n.name));
  return assignments;
};
