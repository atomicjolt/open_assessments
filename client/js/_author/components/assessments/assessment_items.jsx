import React            from 'react';
import _                from 'lodash';
import Question         from './question_types/_question';

export default function AssessmentItems(props) {
  return (
    <div>
      {_.map(_.compact(props.items), (item, index) => (
        <Question
          key={index}
          item={item}
          itemIndex={index}
          updateItem={props.updateItem}
          updateChoice={props.updateChoice}
          updateAnswer={props.updateAnswer}
          deleteAssessmentItem={props.deleteAssessmentItem}
        />
      ))}
    </div>
  );
}

AssessmentItems.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  updateChoice: React.PropTypes.func.isRequired,
  updateAnswer: React.PropTypes.func.isRequired,
};
