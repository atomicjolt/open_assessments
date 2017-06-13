import React          from 'react';

import MovableWords   from './movable_words/movable_words';
import AudioUpload    from './audio_upload';

export default class SentenceSandbox extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

    // Maximum audio recording length in seconds
    audioTimeout: React.PropTypes.number,

    // Saved response to be displayed
    savedResponse: React.PropTypes.string,

    // Actions to call when recording is started or stopped
    audioRecordStart: React.PropTypes.func.isRequired,
    audioRecordStop : React.PropTypes.func.isRequired,

    // TODO when we add styles, localize strings

    // Whether or not input should be disabled
    isDisabled: React.PropTypes.bool
  };

  render() {
    return (
      <div>
        <MovableWords {...this.props} />
        <AudioUpload
          audioTimeout={this.props.audioTimeout}
          localizedStrings={this.props.localizedStrings}
          selectAnswer={this.props.selectAnswer}
          audioRecordStart={this.props.audioRecordStart}
          audioRecordStop={this.props.audioRecordStop}
          isDisabled={this.props.isDisabled}
          savedResponse={this.props.savedResponse}
        />
      </div>
    );
  }
}
