import React    from 'react';
import Feedback from './question_common/single_feedback';

export default function FileUpload(props) {
  return (
    <Feedback
      item={props.item}
      updateItem={props.updateItem}
    />
  );
}

FileUpload.propTypes = {
  updateItem: React.PropTypes.func.isRequired,
  item: React.PropTypes.object
};
