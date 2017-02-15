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
          topItem={index === 0}
          bottomItem={index === (props.items.length - 1)}
          isActive={props.activeItem === item.id}
          reorderActive={props.reorderActive}
          activateItem={props.activateItem}
          toggleReorder={props.toggleReorder}
          editItem={(field, value) => props.editItem(index, field, value)}
          updateItem={props.updateItem}
          deleteAssessmentItem={props.deleteAssessmentItem}
          moveItem={props.moveItem}
        />
      ))}
    </div>
  );
}

AssessmentQuestions.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  updateItem: React.PropTypes.func,
  moveItem: React.PropTypes.func.isRequired,
};
