import React      from 'react';
import _          from 'lodash';
import genusTypes from '../../../../constants/genus_types';
import Feedback   from './question_common/single_feedback';

export default class AudioUpload extends React.Component {
  static MAX_TIME = 240;
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    item: React.PropTypes.object
  }

  static getAudioLimit(item) {
    const original = _.get(item, ['question', 'timeValue'], {
      hours: '00',
      minutes: '00',
      seconds: '100'
    });
    const time = _.mapValues(original, t => parseInt(t, 10));
    const seconds = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
    return seconds;
  }

  static rangeWarning() {
    return (
      <span className="author--c-inline-error">Please enter a positive number under 240</span>
    );
  }

  constructor(props) {
    super(props);
    const timeLimit = AudioUpload.getAudioLimit(props.item)
      || AudioUpload.MAX_TIME;
    const displayWarning = timeLimit > AudioUpload.MAX_TIME;

    this.state = {
      timeLimit: _.toString(timeLimit),
      displayWarning,
    };
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

  handleTimeLimitUpdate(e) {
    let timeLimit = e.target.value;
    const timeVal = parseInt(timeLimit, 10);
    let displayWarning = false;
    if (timeVal > AudioUpload.MAX_TIME) {
      timeLimit = _.toString(AudioUpload.MAX_TIME);
      displayWarning = true;
    } else if (_.isNaN(timeVal) || timeVal < 0) {
      displayWarning = true;
    }

    this.setState({
      timeLimit,
      displayWarning
    });
  }

  render() {
    return (
      <div>
        <div className="author--c-question__answers author--o-row" role="radiogroup">
          <div className="author--c-file-upload__audio-settings is-active">
            <span>Audio record limit</span>
            <div className="author--c-input author--c-input--inline">
              <label htmlFor="audio-limit" />
              <div className="author--c-input__contain">
                <input
                  className="author--c-text-input author--c-text-input--smaller"
                  id="audio-limit"
                  type="text"
                  maxLength="3"
                  value={this.state.timeLimit}
                  onChange={e => this.handleTimeLimitUpdate(e)}
                  onBlur={e => this.handleBlur(e)}
                />
                <div className="author--c-input__bottom has-error" />
              </div>
            </div>
            <span>seconds. (240 maximum)</span>
            { this.state.displayWarning ? AudioUpload.rangeWarning() : null }
          </div>
        </div>
        <div className="author--c-question__feedback">
          <Feedback
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
