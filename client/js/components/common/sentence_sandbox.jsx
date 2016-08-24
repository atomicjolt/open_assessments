import React          from 'react';

import MovableWords   from './movable_words/movable_words';
import AudioUpload    from './audio_upload';

export default class SentenceSandbox extends React.Component {
  render() {
    return <div>
      <MovableWords { ...this.props } />
      <AudioUpload
        timeout={this.props.timeout}
        localizedStrings={this.props.localizedStrings}
        selectAnswer={this.props.selectAnswer}
        audioRecordStart={this.props.audioRecordStart}
        audioRecordStop={this.props.audioRecordStop}
      />
    </div>;
  }
}
