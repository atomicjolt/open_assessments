import React    from 'react';
import Feedback from './question_common/single_feedback';

export default function FileUpload(props) {
  return (
    <div>
      <Feedback
        item={props.item}
        updateItem={props.updateItem}
      />
    </div>
  );
}

FileUpload.propTypes = {
  updateItem: React.PropTypes.func.isRequired,
  item: React.PropTypes.object
};
