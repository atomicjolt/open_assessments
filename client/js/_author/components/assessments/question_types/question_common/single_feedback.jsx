import React      from 'react';
import _          from 'lodash';
import guid       from '../../../../../utils/guid';
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

  constructor(props) {
    super(props);

    /*
    *  The editor needs a unique id to store uploaded things by. If we have an
    *  answer id for this feedback, we use that. But if the feedback is being
    *  entered for the first time, we don't have that, and using the item id
    *  would cause problems if they had uploaded images to the question text. So
    *  we make one using guid() if there is no answer id. This id is never sent
    *  to qbank. We make it here instead of in the editor, because the editor
    *  needs uploadScopeId in the select function.
    */
    this.editorScopeId = _.get(this.props.feedback, 'answerId') || guid();
  }


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
          uploadScopeId={this.editorScopeId}
          onBlur={(text, fileIds) => this.updateItem(text, fileIds)}
        />
      </div>
    );
  }
}
