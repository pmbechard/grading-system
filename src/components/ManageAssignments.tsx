import React, { useRef } from 'react';

interface Props {
  getSubjects: string[];
  handleSubjectChange: (subject: string) => void;
}

const ManageAssignments: React.FC<Props> = ({
  getSubjects,
  handleSubjectChange,
}) => {
  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <div className='manage-assignments-container'>
      <div className='manage-options-area'>
        <div className='manage-quarter-selection-area'>
          <span className='label'>Apply to:</span>
          <input type='checkbox' value='q1' id='manage-q1' />
          <label htmlFor='manage-q1'>Q1</label>
          <input type='checkbox' value='q2' id='manage-q2' />
          <label htmlFor='manage-q2'>Q2</label>
          <input type='checkbox' value='q3' id='manage-q3' />
          <label htmlFor='manage-q3'>Q3</label>
          <input type='checkbox' value='q4' id='manage-q4' />
          <label htmlFor='manage-q4'>Q4</label>
          <input type='checkbox' value='all' id='manage-q-all' />
          <label htmlFor='manage-q-all'>All</label>
        </div>

        <div className='manage-subject-selection'>
          <select
            ref={subjectRef}
            defaultValue=''
            onChange={() =>
              handleSubjectChange(subjectRef.current?.value || '')
            }
          >
            <option disabled value=''>
              Select a Subject
            </option>
            {getSubjects.map((subject) => {
              return (
                <option
                  key={subject.replaceAll(' ', '-').toLowerCase()}
                  value={subject}
                >
                  {subject}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ManageAssignments;
