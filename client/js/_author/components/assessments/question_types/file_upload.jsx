import React    from 'react';
import Feedback from './question_common/single_feedback';

export default function FileUpload(props) {
  return (
    <div className="au-c-question__feedback">
      <Feedback
        bankId={props.item.bankId}
        feedbackType="correctFeedback"
        feedback={_.get(props.item, 'question.correctFeedback')}
        updateItem={props.updateItem}
        labelText="Feedback"
      />
    </div>
  );
}

FileUpload.propTypes = {
  updateItem: React.PropTypes.func.isRequired,
  item: React.PropTypes.object
};
