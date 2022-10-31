import React, { useEffect, useRef, useState } from 'react';
import AssignmentDropdown from './MenuOptions/AssignmentDropdown';
import CategoryDropdown from './MenuOptions/CategoryDropdown';
import QuarterCheckboxes from './MenuOptions/QuarterCheckboxes';
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
  const [getQuarterCheckBoxSelection, setQuarterCheckBoxSelection] = useState<
    string[]
  >([]);

  const [getNewCategoryInput, setNewCategoryInput] = useState<string>('');
  const [getNewAssignmentInput, setNewAssignmentInput] = useState<string>('');

  const [getOption, setOption] = useState<string>('');

  const newCategoryRef = useRef<HTMLInputElement>(null);
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

  const handleNewCategoryInput = (input: string) => {
    setNewCategoryInput(input);
  };

  return (
    <div className='manage-grade-structure-container'>
      <div className='manage-options-area'>
        <button onClick={(e) => setOption(e.currentTarget.textContent || '')}>
          Add Categories
        </button>
        <button onClick={(e) => setOption(e.currentTarget.textContent || '')}>
          Remove Categories
        </button>
        <button onClick={(e) => setOption(e.currentTarget.textContent || '')}>
          Modify Category Weights
        </button>
        <button onClick={(e) => setOption(e.currentTarget.textContent || '')}>
          Add Assignments
        </button>
        <button onClick={(e) => setOption(e.currentTarget.textContent || '')}>
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
            <QuarterCheckboxes
              getQuarterCheckBoxSelection={getQuarterCheckBoxSelection}
              setQuarterCheckBoxSelection={setQuarterCheckBoxSelection}
            />
            <input
              type='text'
              disabled={getSubject === 'Select a Subject'}
              ref={newCategoryRef}
              onChange={(e) => handleNewCategoryInput(e.currentTarget.value)}
            />
            <button
              className='save-btn'
              disabled={
                getNewCategoryInput.length === 0 &&
                getQuarterCheckBoxSelection.length === 0
              }
            >
              Confirm
            </button>
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
            <CategoryDropdown
              getCategories={getCategories}
              setCategory={setCategory}
              disabled={getSubject === 'Select a Subject'}
              includeAllCategories={false}
            />
            <QuarterCheckboxes
              getQuarterCheckBoxSelection={getQuarterCheckBoxSelection}
              setQuarterCheckBoxSelection={setQuarterCheckBoxSelection}
            />
            <button
              className='remove-btn'
              disabled={getCategory === 'Select a Category'}
            >
              Remove
            </button>
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
              includeAllCategories={false}
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
        {getOption === 'Modify Category Weights' && (
          <>
            <QuarterDropdown setQuarter={setQuarter} />
            <SubjectDropdown
              handleSubjectChange={handleSubjectChange}
              getSubjects={getSubjects}
              disabled={getQuarter === 'Select a Quarter'}
              setSubject={setSubject}
            />
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
              includeAllCategories={false}
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
