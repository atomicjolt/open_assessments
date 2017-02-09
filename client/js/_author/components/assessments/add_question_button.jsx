import React    from 'react';

export default function addQuestionButton(props) {
  return (
    <div className="c-question-add">
      <button
        onClick={props.newItem}
        className="c-question-add__button"
      >
        Add Question
      </button>
    </div>
  );
}

addQuestionButton.propTypes = {
  newItem: React.PropTypes.func.isRequired,
};
