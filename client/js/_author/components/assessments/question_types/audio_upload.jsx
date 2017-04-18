import React      from 'react';
import _          from 'lodash';
import AudioLimit from './question_common/audio_limit';
import genusTypes from '../../../../constants/genus_types';
import Feedback   from './question_common/single_feedback';

export default class AudioUpload extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object,
    language: React.PropTypes.string.isRequired,
  }

  handleBlur(e) {
    this.props.updateItem({
      question:{
        genusTypeId: genusTypes.question.audioUpload,
        timeValue: {
          hours: 0,
          minutes: 0,
          seconds: parseInt(e.target.value, 10)
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div className="au-c-question__answers au-o-row" role="radiogroup">
          <AudioLimit
            handleBlur={e => this.handleBlur(e)}
            item={this.props.item}
          />
        </div>
        <div className="au-c-question__feedback">
          <Feedback
            language={this.props.language}
            feedbackType="correctFeedback"
            feedback={_.get(this.props.item, 'question.correctFeedback')}
            updateItem={this.props.updateItem}
            labelText="Feedback"
            bankId={this.props.item.bankId}
          />
        </div>
      </div>
    );
  }
}
