import React, { useRef, useState } from 'react';

interface Props {
  getSubjects: string[];
  handleSubjectChange: (subject: string) => void;
  getCategories: string[];
}

const ManageGradeStructure: React.FC<Props> = ({
  getSubjects,
  handleSubjectChange,
  getCategories,
}) => {
  const [getSubject, setSubject] = useState<string>('Select a Subject');
  const [getCategory, setCategory] = useState<string>('Select a Category');

  const subjectRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);

  const [getOption, setOption] = useState<string>('');

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
      {getOption === 'Add Categories' && (
        <p>Subject dropdown and Quarter checkboxes</p>
      )}
      {getOption === 'Remove Categories' && (
        <p>Subject dropdown and Quarter checkboxes???</p>
      )}
      {getOption === 'Add Assignments' && (
        <p>Subject dropdown, Category dropdown, quarter dropdown</p>
      )}
      {getOption === 'Remove Assignments' && (
        <p>Subject dropdown, Category dropdown, quarter dropdown</p>
      )}
    </div>
  );
};

export default ManageGradeStructure;
