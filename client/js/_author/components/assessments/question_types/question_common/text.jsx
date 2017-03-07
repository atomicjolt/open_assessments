import React      from 'react';
import Editor     from '../../../common/oea_editor';

export default function questionText(props) {
  return (
    <div className="author--c-input c-question-text">
      <label htmlFor={`question_text_${props.itemId}`} />
      <div className="author--c-text-input--medium">
        <Editor
          fileIds={props.fileIds}
          text={props.text}
          editorKey={props.editorKey}
          onBlur={(val, fileIds) => props.updateItem({ question: { text: val, fileIds } })}
          bankId={props.bankId}
          uploadScopeId={props.itemId}
        />
      </div>
    </div>
  );
}

questionText.propTypes = {
  itemId: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  editorKey: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
  bankId: React.PropTypes.string.isRequired,
};
