import React, { useRef } from 'react';
import { CurrentStateObj } from '../Interfaces/Reducer';

interface Props {
  currentState: CurrentStateObj;
  getSubjects: string[];
  disabled: boolean;
  dispatch: React.Dispatch<any>;
  readStudents: (subject: string) => Promise<string[]>;
  readCategories: (quarter: string, subject: string) => Promise<string[]>;
}

const SubjectDropdown: React.FC<Props> = ({
  currentState,
  getSubjects,
  disabled,
  dispatch,
  readStudents,
  readCategories,
}) => {
  const subjectRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      id='subject-selection'
      ref={subjectRef}
      defaultValue=''
      onChange={async () => {
        let subject = subjectRef.current?.value;
        let studentList = await readStudents(subject || '');
        let categoryList = await readCategories(
          currentState.selectedQuarter || '',
          subject || ''
        );
        dispatch({
          type: 'changeSubject',
          payload: {
            selectedSubject: subject,
            studentList: studentList,
            categoryList: categoryList,
          },
        });
      }}
      disabled={disabled}
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
  );
};

export default SubjectDropdown;
