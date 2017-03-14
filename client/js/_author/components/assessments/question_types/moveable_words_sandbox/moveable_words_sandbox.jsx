import React from 'react';
import AudioLimit from '../question_common/audio_limit';
import Option from './option';

export default class MWSandbox extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    selectChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    activeChoice: React.PropTypes.bool,
  };

  handleBlur(e) {
    this.props.updateItem({
      question:{
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
        <div className="au-c-moveable__audio-settings is-active">
          <AudioLimit
            item={this.props.item}
            handleBlur={e => this.handleBlur(e)}
          />
        </div>
        <div className="au-c-question__answers au-c-moveable__answers">
          <Option isActive />
          <Option />
          <div className="au-c-answer au-o-flex-center au-c-answer--add">
            <div className="au-c-input">
              <label htmlFor="option2" />
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
                  id="option2"
                  type="text"
                  defaultValue="Add Option"
                />
                <div className="au-c-input__bottom no-border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
