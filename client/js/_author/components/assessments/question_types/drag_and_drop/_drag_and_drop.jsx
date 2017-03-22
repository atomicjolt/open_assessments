import React        from 'react';
import TargetArea   from './target_area';
import DragArea     from './drag_area';
import Feedback     from '../question_common/single_feedback';

export default class DragAndDrop extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
      question: React.PropTypes.shape({}),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const { question, id } = this.props.item;

    return (
      <div>
        <TargetArea
          id={id}
          question={question}
        />
        <div className="au-c-drop-zone__answers__label">Draggable answers</div>
        <DragArea
          dragObjects={question.dragObjects}
        />

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

      </div>
    );
  }
}
