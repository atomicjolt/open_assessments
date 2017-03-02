import React      from 'react';
import _          from 'lodash';
import genusTypes from '../../../../../constants/genus_types';

export default class SingleFeedback extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object
  };

  static getAnswer(item) {
    return _.get(
      item,
      ['answers', '0'],
      {
        genusTypeId: genusTypes.answer.rightAnswer,
        feedback: ''
      }
    );
  }

  static getFeedback(item) {
    return SingleFeedback.getAnswer(item).feedback.text;
  }

  handleBlur(e) {
    const answer = SingleFeedback.getAnswer(this.props.item);
    const newAnswer = {
      id: answer.id,
      genusTypeId: genusTypes.answer.rightAnswer,
      feedback: e.target.value
    };

    this.props.updateItem({
      answers:[newAnswer]
    });
  }

  render() {
    return (
      <div className="author--c-question__feedback">
        <div className="author--c-input author--c-input-label--left author--c-feedback">
          <label htmlFor="feedbackCorrect">Feedback</label>
          <div className="author--c-input__contain">
            <input
              className="author--c-text-input author--c-text-input--smaller author--c-wysiwyg"
              id="feedbackCorrect"
              type="text"
              tabIndex="0"
              onBlur={e => this.handleBlur(e)}
              defaultValue={SingleFeedback.getFeedback(this.props.item)}
            />
            <div className="author--c-input__bottom" />
          </div>
        </div>
      </div>
    );
  }
}
