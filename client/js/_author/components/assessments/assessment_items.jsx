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
          topItem={index === 0}
          bottomItem={index === (props.items.length - 1)}
          isActive={props.activeItem === item.id}
          reorderActive={props.reorderActive}
          activateItem={props.activateItem}
          toggleReorder={props.toggleReorder}
          updateItem={props.updateItem}
          updateChoice={props.updateChoice}
          deleteAssessmentItem={props.deleteAssessmentItem}
          moveItem={props.moveItem}
          createChoice={props.createChoice}
        />
      ))}
    </div>
  );
}

AssessmentItems.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  moveItem: React.PropTypes.func.isRequired,
  createChoice: React.PropTypes.func.isRequired,
};
