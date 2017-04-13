import React                        from 'react';
import _                            from 'lodash';
import { audioLimit as MAX_TIME }   from '../../../../../constants/question_types';
import localize                     from '../../../../locales/localize';

class AudioLimit extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    handleBlur: React.PropTypes.func,
    localizeStrings: React.PropTypes.func,
  };

  static getAudioLimit(item) {
    const original = _.get(item, ['question', 'timeValue'], {
      hours: '00',
      minutes: '00',
      seconds: _.toString(MAX_TIME)
    });
    const time = _.mapValues(original, t => parseInt(t, 10));
    const seconds = (time.hours * 3600) + (time.minutes * 60) + time.seconds;
    return seconds;
  }

  constructor(props) {
    super(props);
    const timeLimit = AudioLimit.getAudioLimit(props.item)
      || MAX_TIME;

    const displayWarning = timeLimit > MAX_TIME;

    this.state = {
      timeLimit: _.toString(timeLimit),
      displayWarning,
    };
  }

  rangeWarning() {
    const strings = this.props.localizeStrings('audioLimit');
    return (
      <span className="au-c-inline-error">{strings.rangeWarning} {`${MAX_TIME}`}</span>
    );
  }

  handleTimeLimitUpdate(e) {
    let timeLimit = e.target.value;
    const timeVal = parseInt(timeLimit, 10);
    let displayWarning = false;
    if (timeVal > MAX_TIME) {
      timeLimit = _.toString(MAX_TIME);
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
      <div className="au-c-file-upload__audio-settings is-active">
        <span>Audio record limit</span>
        <div className="au-c-input au-c-input--inline">
          <label htmlFor="audio-limit" />
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id="audio-limit"
              type="text"
              maxLength="3"
              value={this.state.timeLimit}
              onChange={e => this.handleTimeLimitUpdate(e)}
              onBlur={e => this.props.handleBlur(e)}
            />
            <div
              className={`au-c-input__bottom ${this.state.displayWarning ? 'has-error' : ''}`}
            />
          </div>
        </div>
        <span>seconds. ({`${MAX_TIME}`} maximum)</span>
        { this.state.displayWarning ? this.rangeWarning() : null }
      </div>
    );
  }
}

export default localize(AudioLimit);
