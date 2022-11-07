import { CurrentStateObj } from './Interfaces/Reducer';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterDropdown from './MenuOptions/QuarterDropdown';
import SubjectDropdown from './MenuOptions/SubjectDropdown';

interface Props {
  currentState: CurrentStateObj;
  dispatch: React.Dispatch<any>;
  getSubjectList: string[];
}

const ViewGrades: React.FC<Props> = ({
  currentState,
  dispatch,
  getSubjectList,
}) => {
  return (
    <div className='view-grades-container'>
      <div className='view-grades-options'>
        <QuarterDropdown dispatch={dispatch} />

        <SubjectDropdown
          getSubjects={getSubjectList}
          disabled={!currentState.selectedQuarter}
          dispatch={dispatch}
        />
        <CategoryDropdown
          currentState={currentState}
          dispatch={dispatch}
          disabled={!currentState.selectedSubject}
          includeAllCategories={true}
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
                  <tr key={`${student}-grades`}>
                    {Object.values(currentState.grades || {}).map((item) => {
                      if (item.name === student) return <td>{item.grade}</td>;
                      else return <></>;
                    })}
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
