import React from 'react';
import AudioLimit from './question_common/audio_limit';

export default class MWSandbox extends React.Component {
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
          <div className="au-c-answer au-o-flex-center is-active">
            <div className="au-c-input">
              <label htmlFor="option1" />
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
                  id="option1"
                  type="text"
                  placeholder="Option 1"
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
            <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
              <label htmlFor />
              <select name id>
                <option value>Verb</option>
                <option value>Adverb</option>
                <option value>Noun</option>
                <option value>Pronoun</option>
                <option value>Adjective</option>
                <option value>Preposition</option>
              </select>
            </div>
            <button className="au-c-answer--delete">
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="au-c-answer au-o-flex-center">
            <div className="au-c-input">
              <label htmlFor="option2" />
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
                  id="option2"
                  type="text"
                  placeholder="Option 2"
                />
                <div className="au-c-input__bottom no-border" />
              </div>
            </div>
            <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
              <label htmlFor />
              <select name id>
                <option value>Verb</option>
                <option value>Adverb</option>
                <option value>Noun</option>
                <option value>Pronoun</option>
                <option value>Adjective</option>
                <option value>Preposition</option>
              </select>
            </div>
            <button className="au-c-answer--delete">
              <i className="material-icons">close</i>
            </button>
          </div>
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
