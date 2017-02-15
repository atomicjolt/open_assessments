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
          editItem={(field, value) => props.editItem(index, field, value)}
          updateItem={props.updateItem}
          deleteAssessmentItem={props.deleteAssessmentItem}
        />
      ))}
    </div>
  );
}

AssessmentItems.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired
};
