import React      from 'react';
import _          from 'lodash';
import guid       from '../../../../../utils/guid';
import Editor     from '../../../common/oea_editor';

export default class SingleFeedback extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object
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
    this.editorScopeId = _.get(this.props.item, 'question.correctFeedback.answerId', guid());
  }

  updateItem(text, fileIds) {
    this.props.updateItem({
      question: {
        correctFeedback: { text, fileIds }
      },
    });
  }

  render() {
    return (
      <div className="author--c-question__feedback">
        <div className="author--c-input author--c-input-label--left author--c-feedback">
          <label htmlFor="feedbackCorrect">Feedback</label>
          <Editor
            fileIds={_.get(this.props.item, 'question.correctFeedback.fileIds')}
            text={_.get(this.props.item, 'question.correctFeedback.text')}
            bankId={this.props.item.bankId}
            uploadScopeId={this.editorScopeId}
            onBlur={(text, fileIds) => this.updateItem(text, fileIds)}
          />
        </div>
      </div>
    );
  }
}
