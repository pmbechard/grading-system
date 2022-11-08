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
    case 'changeQuarter':
      return {
        selectedQuarter: action.payload,
      };
    case 'changeSubject':
      return {
        selectedQuarter: state.selectedQuarter || '',
        selectedSubject: action.payload.selectedSubject,
        studentList: action.payload.studentList,
        categoryList: action.payload.categoryList,
      };
    case 'changeCategory':
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: action.payload.selectedCategory,
        assignmentList: action.payload.assignmentList,
      };
    case 'changeAssignment':
      return {
        selectedSubject: state.selectedSubject,
        studentList: state.studentList,
        selectedQuarter: state.selectedQuarter,
        categoryList: state.categoryList,
        selectedCategory: state.selectedCategory,
        assignmentList: state.assignmentList,
        selectedAssignment: action.payload.selectedAssignment,
        grades: action.payload.grades,
      };
    default:
      return { ...state } as CurrentStateObj;
  }
};

export const initialState = { selectedSubject: '' } as CurrentStateObj;
