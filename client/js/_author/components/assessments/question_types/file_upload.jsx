import React    from 'react';
import _          from 'lodash';
import genusTypes from '../../../../constants/genus_types';
import Feedback from './question_common/single_feedback';

export default class FileUpload extends React.Component {
  render(){
    return (
      <div>
        <Feedback
          item={this.props.item}
          updateItem={this.props.updateItem} />
      </div>
    );
  }
};
