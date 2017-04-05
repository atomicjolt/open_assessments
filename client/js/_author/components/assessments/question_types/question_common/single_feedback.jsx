import React      from 'react';
import _          from 'lodash';
import Editor     from '../../../common/oea_editor';

export default class SingleFeedback extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    feedbackType: React.PropTypes.string.isRequired,
    bankId: React.PropTypes.string.isRequired,
    feedback: React.PropTypes.shape({
      text: React.PropTypes.string,
    }),
    labelText: React.PropTypes.string,
  };

  updateItem(text, fileIds) {
    this.props.updateItem({
      question: {
        [this.props.feedbackType]: { text, fileIds }
      },
    });
  }

  render() {
    return (
      <div className="au-c-input au-c-input-label--left au-c-feedback">
        <label htmlFor="feedbackCorrect">{this.props.labelText}</label>
        <Editor
          textSize="smaller"
          fileIds={_.get(this.props.feedback, 'fileIds')}
          text={_.get(this.props.feedback, 'text')}
          bankId={this.props.bankId}
          onBlur={(text, fileIds) => this.updateItem(text, fileIds)}
        />
      </div>
    );
  }
}
