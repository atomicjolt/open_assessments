import React        from 'react';
import Feedback     from '../question_common/single_feedback';
import ImageOrder   from './image_order';
import SaveOptions  from '../question_common/save_option_button';

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
    save: React.PropTypes.func,
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
          updateItem={item => this.props.updateItem(item, true)}
          feedbackType="correctFeedback"
          feedback={question.correctFeedback}
          labelText="Correct Feedback"
          bankId={this.props.item.bankId}
        />
        <Feedback
          updateItem={item => this.props.updateItem(item, true)}
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
        <SaveOptions save={this.props.save} />
        <div className="au-c-question__feedback">
          { this.getFeedback() }
        </div>
      </div>
    );
  }
}
