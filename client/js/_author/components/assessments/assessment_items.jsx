import React            from 'react';
import _                from 'lodash';
import Question         from './question_types/_question';

export default function AssessmentQuestions(props) {
  return (
    <div>
      {_.map(props.items, (item, index) => (
        <Question
          key={index}
          {...item}
          itemIndex={index}
          editItem={(field, value) => props.editItem(index, field, value)}
        />
      ))}
    </div>
  );
}

AssessmentQuestions.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired
};