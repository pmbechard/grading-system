import React from 'react';

interface Props {
  getQuarterCheckBoxSelection: string[];
  setQuarterCheckBoxSelection: React.Dispatch<React.SetStateAction<string[]>>;
  disabled: boolean;
}

const QuarterCheckboxes: React.FC<Props> = ({
  getQuarterCheckBoxSelection,
  setQuarterCheckBoxSelection,
  disabled,
}) => {
  const handleQuarterCheckboxSelection = (checked: boolean, value: string) => {
    if (checked)
      setQuarterCheckBoxSelection(getQuarterCheckBoxSelection.concat(value));
    else
      setQuarterCheckBoxSelection(
        getQuarterCheckBoxSelection
          .splice(0, getQuarterCheckBoxSelection.indexOf(value))
          .concat(
            getQuarterCheckBoxSelection.splice(
              getQuarterCheckBoxSelection.indexOf(value) + 1
            )
          )
      );
  };
  return (
    <>
      <input
        type='checkbox'
        id='remove-checkbox-q1'
        value='q1'
        onChange={(e) =>
          handleQuarterCheckboxSelection(
            e.currentTarget.checked,
            e.currentTarget.value
          )
        }
        disabled={disabled}
      />
      <label htmlFor='remove-checkbox-q1'>Q1</label>
      <input
        type='checkbox'
        id='remove-checkbox-q2'
        value='q2'
        onChange={(e) =>
          handleQuarterCheckboxSelection(
            e.currentTarget.checked,
            e.currentTarget.value
          )
        }
        disabled={disabled}
      />
      <label htmlFor='remove-checkbox-q2'>Q2</label>
      <input
        type='checkbox'
        id='remove-checkbox-q3'
        value='q3'
        onChange={(e) =>
          handleQuarterCheckboxSelection(
            e.currentTarget.checked,
            e.currentTarget.value
          )
        }
        disabled={disabled}
      />
      <label htmlFor='remove-checkbox-q3'>Q3</label>
      <input
        type='checkbox'
        id='remove-checkbox-q4'
        value='q4'
        onChange={(e) =>
          handleQuarterCheckboxSelection(
            e.currentTarget.checked,
            e.currentTarget.value
          )
        }
        disabled={disabled}
      />
      <label htmlFor='remove-checkbox-q4'>Q4</label>
      <input
        type='checkbox'
        id='remove-checkbox-all'
        value='all'
        onChange={(e) =>
          handleQuarterCheckboxSelection(
            e.currentTarget.checked,
            e.currentTarget.value
          )
        }
        disabled={disabled}
      />
      <label htmlFor='remove-checkbox-all'>All</label>
    </>
  );
};

export default QuarterCheckboxes;
