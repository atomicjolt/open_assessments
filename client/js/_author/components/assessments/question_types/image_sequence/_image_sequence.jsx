import React      from 'react';
import Feedback    from '../question_common/single_feedback';
import ImageOrder  from './image_order';
import types       from '../../../../../constants/question_types';

export default class ImageSequence extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      bankId: React.PropTypes.string,
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      multipleAnswer: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func,
  };

  getFeedback() {
    const { question, type } = this.props.item;

    return (
      <div className="au-c-question__feedback">
        <Feedback
          updateItem={this.props.updateItem}
          feedbackType="correctFeedback"
          feedback={question.correctFeedback}
          labelText="Correct Feedback"
          bankId={this.props.item.bankId}
        />
        {type === types.reflection || type === types.multipleReflection ?
          null :
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="incorrectFeedback"
            feedback={question.incorrectFeedback}
            labelText="Incorrect Feedback"
            bankId={this.props.item.bankId}
          />
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <ImageOrder />
        <div className="au-c-question__feedback">
          { this.getFeedback() }
        </div>
      </div>
    );
  }
}
