import React      from 'react';

export default function optionRadio(props) {
  return (
    <div className="author--c-checkbox">
      <input
        type="checkbox"
        id={`option_radio_${props.id}`}
        name="radio"
        tabIndex="0"
        checked={props.isCorrect}
        onChange={e => props.updateChoice({ isCorrect: e.target.checked })}
      />
      <label htmlFor={`option_radio_${props.id}`} />
    </div>
  );
}

optionRadio.propTypes = {
  id: React.PropTypes.string.isRequired,
  isCorrect: React.PropTypes.bool,
  updateChoice: React.PropTypes.func.isRequired,
};
