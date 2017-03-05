import React      from 'react';
import _          from 'lodash';

export default class SingleFeedback extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object
  };

  updateItem(e) {
    this.props.updateItem({
      question: {
        correctFeedback: { text: e.target.value }
      }
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
              onBlur={e => this.updateItem(e)}
              defaultValue={_.get(this.props.item, 'question.correctFeedback.text')}
            />
            <div className="author--c-input__bottom" />
          </div>
        </div>
      </div>
    );
  }
}
