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
  // const [getSubject, setSubject] = useState<string>('Select a Subject');
  // const [getCategory, setCategory] = useState<string>('Select a Category');

  // const subjectRef = useRef<HTMLSelectElement>(null);
  // const categoryRef = useRef<HTMLSelectElement>(null);

  return (
    <div className='manage-grade-structure-container'>
      <div className='manage-options-area'>
        <button>Add Categories</button>
        <button>Remove Categories</button>
        <button>Add Assignments</button>
        <button>Remove Assignments</button>
      </div>
    </div>
  );
};

export default ManageGradeStructure;
