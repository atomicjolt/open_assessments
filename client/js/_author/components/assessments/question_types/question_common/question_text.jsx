import React      from 'react';

export default function questionText(props) {
  return (
    <div className="c-input c-question-text">
      <label htmlFor={`question_text_${props.id}`} />
      <div className="c-input__contain">
        <input
          className="c-text-input c-text-input--medium c-wysiwyg"
          id={`question_name_${props.id}`}
          type="text"
          placeholder="Question Text"
          tabIndex="-1"
          defaultValue={props.text}
          onBlur={e => props.updateItem({ description: e.target.value })}
        />
        <div className="c-input__bottom" />
      </div>
    </div>
  );
}

questionText.propTypes = {
  id: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  updateItem: React.PropTypes.func.isRequired,
};
