import subjects from '../../data/subjects.json';
import students from '../../data/students.json';

// REDUCER

export interface CurrentStateObj {
  selectedSubject?: string;
  selectedQuarter?: string;
  selectedCategory?: string;
  selectedAssignment?: string;
  studentList?: string[] | Promise<string[]>;
  categoryList?: string[] | Promise<string[]>;
  assignmentList?: string[] | Promise<string[]>;
  grades?:
    | { name: string; grade: string }[]
    | Promise<{ name: string; grade: string }[]>;
}

export const reducer = (state: CurrentStateObj, action: any) => {
  switch (action.type) {
    case 'changeSubject':
      const getStudentData = async () => {
        const studentData = await readStudents(action.payload);
        return studentData;
      };
      return {
        selectedQuarter: state.selectedQuarter || '',
        selectedSubject: action.payload,
        studentList: getStudentData(),
      };
    case 'changeQuarter':
      const getCategoryData = async () => {
        const categoryData = await readCategories(
          action.payload,
          state.selectedSubject || ''
        );
        return categoryData;
      };
      return {
        selectedSubject: state.selectedSubject || '',
        studentList: state.studentList || [],
        selectedQuarter: action.payload,
        categoryList: getCategoryData(),
      };
    case 'changeCategory':
      const getAssignmentData = async () => {
        const assignmentData = await readAssignments(
          state.selectedQuarter || '',
          state.selectedSubject || '',
          state.selectedCategory || ''
        );
        return assignmentData;
      };
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: action.payload,
        assignmentList: getAssignmentData(),
      };
    case 'changeAssignment':
      const getGradesData = async () => {
        const gradesData = await readGrades(
          state.selectedSubject || '',
          state.selectedCategory || '',
          state.selectedAssignment || ''
        );
        return gradesData;
      };
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: state.selectedCategory,
        assignmentList: state.assignmentList,
        selectedAssignment: action.payload,
        grades: getGradesData(),
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
