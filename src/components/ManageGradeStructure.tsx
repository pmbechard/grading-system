import React, { useEffect, useRef, useState } from 'react';
import AssignmentDropdown from './MenuOptions/AssignmentDropdown';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterDropdown from './MenuOptions/QuarterDropdown';
import SubjectDropdown from './MenuOptions/SubjectDropdown';

interface Props {
  getSubjects: string[];
  handleSubjectChange: (subject: string) => void;
  getCategories: string[];
  getAssignments: (
    quarter: string,
    subject: string,
    category?: string
  ) => string[];
}

const ManageGradeStructure: React.FC<Props> = ({
  getSubjects,
  handleSubjectChange,
  getCategories,
  getAssignments,
}) => {
  const [getQuarter, setQuarter] = useState<string>('Select a Quarter');
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('Select a Category');
  const [getAssignment, setAssignment] = useState<string>(
    'Select an Assignment'
  );

  const [getNewAssignmentInput, setNewAssignmentInput] = useState<string>('');

  const [getOption, setOption] = useState<string>('');

  const newAssignmentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuarter('Select a Quarter');
    setSubject('Select a Subject');
    setCategory('Select a Category');
    setAssignment('Select an Assignment');
    setNewAssignmentInput('');
  }, [getOption]);

  const handleNewAssignmentInput = (input: string) => {
    setNewAssignmentInput(input);
  };

  return (
    <div className='manage-grade-structure-container'>
      <div className='manage-options-area'>
        <button onClick={() => setOption('Add Categories')}>
          Add Categories
        </button>
        <button onClick={() => setOption('Remove Categories')}>
          Remove Categories
        </button>
        <button onClick={() => setOption('Add Assignments')}>
          Add Assignments
        </button>
        <button onClick={() => setOption('Remove Assignments')}>
          Remove Assignments
        </button>
      </div>
      <div className='manage-dropdown-area'>
        {getOption === 'Add Categories' && (
          <>
            <SubjectDropdown
              handleSubjectChange={handleSubjectChange}
              getSubjects={getSubjects}
              disabled={false}
              setSubject={setSubject}
            />
            <p>Quarter checkboxes?</p>
          </>
        )}
        {getOption === 'Remove Categories' && (
          <>
            <SubjectDropdown
              handleSubjectChange={handleSubjectChange}
              getSubjects={getSubjects}
              disabled={false}
              setSubject={setSubject}
            />
            <p>Quarter checkboxes?</p>
          </>
        )}
        {getOption === 'Add Assignments' && (
          <>
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
            <input
              type='text'
              disabled={getCategory === 'Select a Category'}
              ref={newAssignmentRef}
              onChange={(e) => handleNewAssignmentInput(e.currentTarget.value)}
            />
            <button
              className='save-btn'
              disabled={getNewAssignmentInput.length === 0}
            >
              Confirm
            </button>
          </>
        )}
        {getOption === 'Remove Assignments' && (
          <>
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
              assignmentList={getAssignments(
                getQuarter,
                getSubject,
                getCategory
              )}
            />
            <button
              className='remove-btn'
              disabled={getAssignment === 'Select an Assignment'}
            >
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageGradeStructure;
