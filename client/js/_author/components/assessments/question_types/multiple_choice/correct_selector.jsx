import React      from 'react';
import _          from 'lodash';
import types      from '../../../../../constants/question_types';
import Radio      from '../question_common/option_radio';
import CheckBox   from '../question_common/option_checkbox';

export default function correctSelector(props) {
  // The null is for reflection questions
  if (_.includes([types.reflection, types.multipleReflection], props.itemType)) { return null; }
  if (props.itemType === types.multipleAnswer) {
    return (
      <CheckBox
        id={props.id}
        itemId={props.itemId}
        isCorrect={props.isCorrect}
        updateChoice={props.updateChoice}
      />
    );
  }
  return (
    <Radio
      id={props.id}
      itemId={props.itemId}
      isCorrect={props.isCorrect}
      updateChoice={props.updateChoice}
    />
  );
}

correctSelector.propTypes = {
  itemType: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  itemId: React.PropTypes.string,
  isCorrect: React.PropTypes.bool,
  updateChoice: React.PropTypes.func.isRequired,
};
