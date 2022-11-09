import { CurrentStateObj } from './Interfaces/Reducer';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterDropdown from './MenuOptions/QuarterDropdown';
import SubjectDropdown from './MenuOptions/SubjectDropdown';

interface Props {
  currentState: CurrentStateObj;
  dispatch: React.Dispatch<any>;
  getSubjectList: string[];
  readStudents: (subject: string) => Promise<string[]>;
  readCategories: (quarter: string, subject: string) => Promise<string[]>;
  readAssignments: (
    quarter: string,
    subject: string,
    category: string
  ) => Promise<string[]>;
  readGrades: (
    subject: string,
    category: string,
    assignment: string
  ) => Promise<
    {
      name: string;
      grade: string;
    }[]
  >;
}

const ViewGrades: React.FC<Props> = ({
  currentState,
  dispatch,
  getSubjectList,
  readStudents,
  readCategories,
  readAssignments,
  readGrades,
}) => {
  return (
    <div className='view-grades-container'>
      <div className='view-grades-options'>
        <QuarterDropdown dispatch={dispatch} />

        <SubjectDropdown
          currentState={currentState}
          getSubjects={getSubjectList}
          disabled={!currentState.selectedQuarter}
          dispatch={dispatch}
          readStudents={readStudents}
          readCategories={readCategories}
        />
        <CategoryDropdown
          currentState={currentState}
          dispatch={dispatch}
          disabled={!currentState.selectedSubject}
          includeAllCategories={true}
          readAssignments={readAssignments}
        />
      </div>
      {currentState.selectedSubject && (
        <table>
          <thead>
            <tr>
              <th scope='col' rowSpan={2}>
                Name
              </th>
              <th rowSpan={2}>Annual Total</th>
              <th rowSpan={2}>Quarterly Total</th>

              {/* LIST OUT ALL MATCHING CATEGORIES AS <th> ELEMENTS */}
              {currentState.selectedCategory === 'All Categories' ? (
                currentState.categoryList?.map((category) => {
                  return (
                    <th
                      key={`category-${category}`}
                      colSpan={currentState.assignmentList?.length}
                    >
                      {category}
                    </th>
                  );
                })
              ) : (
                <th
                  key={`category-${currentState.selectedCategory}`}
                  colSpan={currentState.assignmentList?.length}
                >
                  {currentState.selectedCategory}
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {/* LIST OUT STUDENT NAMES AND ASSIGNMENT HEADINGS IN EACH ROW */}
            {(currentState.studentList || []).map((student) => {
              return (
                <>
                  <tr key={student}>
                    <td rowSpan={2}>{student}</td>
                    <td rowSpan={2}>100</td>
                    <td rowSpan={2}>100</td>

                    {currentState.assignmentList?.map((assignment) => {
                      return (
                        <td
                          key={`${currentState.selectedCategory}-${assignment}`}
                        >
                          {assignment}
                        </td>
                      );
                    })}
                  </tr>

                  {/* LIST OUT STUDENT GRADES FOR EACH ASSIGNMENT */}
                  {/* FIXME: issue with grades objects*/}
                  <tr key={`${student}-grades`}>
                    {}
                    {/* {Object.values(currentState.grades || {}).map((item) => {
                      if (item.name === student) return <td>{item.grade}</td>;
                      else return <td>1</td>;
                    })} */}
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewGrades;
