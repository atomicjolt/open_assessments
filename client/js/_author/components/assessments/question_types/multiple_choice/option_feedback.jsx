import React    from 'react';
import Editor   from '../../../common/oea_editor';

export default function optionFeedback(props) {

  return (
    <div className="author--c-input author--c-input-label--left author--c-feedback">
      <label htmlFor="feedback1">Feedback</label>
      <Editor
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
