import React      from 'react';
import Feedback    from '../question_common/single_feedback';
import ImageOrder  from './image_order';

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
    activateChoice: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      choiceId: null,
    };
  }

  getFeedback() {
    const { question } = this.props.item;

    return (
      <div className="au-c-question__feedback">
        <Feedback
          updateItem={this.props.updateItem}
          feedbackType="correctFeedback"
          feedback={question.correctFeedback}
          labelText="Correct Feedback"
          bankId={this.props.item.bankId}
        />
        <Feedback
          updateItem={this.props.updateItem}
          feedbackType="incorrectFeedback"
          feedback={question.incorrectFeedback}
          labelText="Incorrect Feedback"
          bankId={this.props.item.bankId}
        />
      </div>
    );
  }

  activateChoice(choiceId) {
    this.setState({ activeChoice: choiceId });
  }

  render() {
    return (
      <div>
        <ImageOrder
          {...this.props}
          activateChoice={choiceId => this.activateChoice(choiceId)}
          activeChoice={this.state.activeChoice}
        />
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
          onClick={this.props.save}
        >
          Save
        </button>
        <div className="au-c-question__feedback">
          { this.getFeedback() }
        </div>
      </div>
    );
  }
}
