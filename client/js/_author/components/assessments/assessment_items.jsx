import React            from 'react';
import _                from 'lodash';
import Question         from './question_types/_question';

export default function AssessmentQuestions(props) {
  return (
    <div>
      {_.map(_.compact(props.items), (item, index) => (
        <Question
          key={index}
          item={item}
          itemIndex={index}
          updateItem={props.updateItem}
          updateChoice={props.updateChoice}
        />
      ))}
    </div>
  );
}

AssessmentQuestions.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired
};
