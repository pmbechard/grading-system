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
        ...state,
        selectedQuarter: action.payload,
      };
    case 'changeSubject':
      return {
        ...state,
        selectedSubject: action.payload.selectedSubject,
        studentList: action.payload.studentList,
        categoryList: action.payload.categoryList,
        selectedCategory: 'All Categories',
      };
    case 'changeCategory':
      return {
        ...state,
        selectedCategory: action.payload.selectedCategory,
        assignmentList: action.payload.assignmentList,
      };
    case 'changeAssignment':
      return {
        ...state,
        selectedAssignment: action.payload.selectedAssignment,
        grades: action.payload.grades,
      };
    default:
      return { ...state } as CurrentStateObj;
  }
};

export const initialState = { selectedSubject: '' } as CurrentStateObj;
