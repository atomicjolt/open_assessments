import React            from 'react';
import MultipleChoice   from './multiple_choice';

export default function (props) {

  const content = () => {
    switch (props.type) {
      case 'multipleChoice':
        return <MultipleChoice {...props} />;
      default:
        return null;
    }
  };

  return (
    <div>
      Question
      {content()}
    </div>
  );
}
