import React     from 'react';
import localize  from '../../locales/localize';

function addQuestionButton(props) {
  const strings = props.localizeStrings('addQuestionButton');
  return (
    <div className="au-c-question-add">
      <button
        onClick={props.newItem}
        className="au-c-question-add__button"
      >
        {strings.addQuestion}
      </button>
    </div>
  );
}

addQuestionButton.propTypes = {
  newItem: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(addQuestionButton);
