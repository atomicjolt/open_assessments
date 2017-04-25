import React      from 'react';

export default function optionCheckbox(props) {
  return (
    <div className="au-c-checkbox">
      <input
        type="checkbox"
        id={`option_checkbox_${props.id}`}
        name={`option_checkbox_${props.itemId}`}
        tabIndex="0"
        checked={props.isCorrect}
        onChange={e => props.updateChoice({ isCorrect: e.target.checked })}
      />
      <label htmlFor={`option_checkbox_${props.id}`} />
    </div>
  );
}

optionCheckbox.propTypes = {
  id: React.PropTypes.string.isRequired,
  itemId: React.PropTypes.string,
  isCorrect: React.PropTypes.bool,
  updateChoice: React.PropTypes.func.isRequired,
};
