import React    from 'react';
import Editor   from '../../../common/oea_editor';
import guid     from '../../../../../utils/guid';

export default class optionFeedback extends React.Component {
  static propTypes = {
    feedback: React.PropTypes.string,
    bankId: React.PropTypes.string.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    id: React.PropTypes.string,
    hidden: React.PropTypes.bool,
    fileIds: React.PropTypes.shape({}),
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
    this.editorScopeId = this.props.id || guid();
  }

  render() {
    const hidden = this.props.hidden ? 'is-hidden' : '';
    return (
      <div className={`au-c-input au-c-input-label--left au-c-feedback ${hidden}`}>
        <label htmlFor="feedback1">Feedback</label>
        <Editor
          textSize="smaller"
          fileIds={this.props.fileIds}
          text={this.props.feedback}
          bankId={this.props.bankId}
          uploadScopeId={this.editorScopeId}
          onBlur={(text, fileIds) => this.props.updateChoice({ feedback: text, fileIds })}
        />
      </div>
    );
  }
}
