import React    from 'react';
import Editor   from '../../../common/oea_editor';

export default function optionFeedback(props) {

  return (
    <div className="au-c-input au-c-input-label--left au-c-feedback">
      <label htmlFor="feedback1">Feedback</label>
      <Editor
        textSize="smaller"
        fileIds={props.fileIds}
        text={props.feedback}
        bankId={props.bankId}
        uploadScopeId={props.id}
        onBlur={(text, fileIds) => props.updateChoice({ feedback: text, fileIds })}
      />
    </div>
  );
}

optionFeedback.propTypes = {
  feedback: React.PropTypes.string,
  bankId: React.PropTypes.string.isRequired,
  itemId: React.PropTypes.string.isRequired,
  updateChoice: React.PropTypes.func.isRequired,
};
