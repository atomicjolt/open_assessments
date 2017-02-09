import React            from 'react';
import _                from 'lodash';
import EditableItem     from './editable_item';

export default function AssessmentQuestions(props) {
  return (
    <div>
      {_.map(props.items, (item, index) => (
        <EditableItem
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
