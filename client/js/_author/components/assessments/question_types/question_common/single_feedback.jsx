import React      from 'react';
import genusTypes from '../../../../../constants/genus_types';

function getFeedback(item){
  return getAnswer(item).feedback.text;
}

function getAnswer(item){
  return _.get(
    item,
    ['answers', '0'],
    {
      genusTypeId: genusTypes.answer.rightAnswer,
      feedback: ""
    }
  )
}

export default function feedback(props) {

  function handleBlur(e){
    const answer = getAnswer(props.item);
    const newAnswer = {
      id: answer.id,
      genusTypeId: genusTypes.answer.rightAnswer,
      feedback: e.target.value
    }

    props.updateItem({
      answers:[newAnswer]
    });
  }

  return (
    <div className="c-question__feedback">
      <div className="c-input c-input-label--left c-feedback">
        <label htmlFor="feedbackCorrect">Feedback</label>
        <div className="c-input__contain">
          <input
            className="c-text-input c-text-input--smaller c-wysiwyg"
            id="feedbackCorrect"
            type="text"
            tabIndex="0"
            onBlur={(e) => handleBlur(e)}
            defaultValue={getFeedback(props.item)}/>
          <div className="c-input__bottom" />
        </div>
      </div>
    </div>
  );
}

feedback.propTypes = {
  updateItem: React.PropTypes.func.isRequired,
  item: React.PropTypes.object
};
