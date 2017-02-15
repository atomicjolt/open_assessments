import React    from 'react';
import Feedback from './question_common/single_feedback';

export default function (props) {
  return (
    <div>
    <div className="c-question__answers o-row" role="radiogroup">
      <div className="c-file-upload__audio-settings is-active">
        <span>Audio record limit</span>
        <div className="c-input c-input--inline">
          <label htmlFor="audio-limit"></label>
          <div className="c-input__contain">
            <input
              className="c-text-input c-text-input--smaller"
              id="audio-limit"
              type="text"
              maxLength="3"
              defaultValue="100"
              onBlur={ (e) => {
                props.updateItem({
                  question:{
                    timeValue: {
                      hours: 0,
                      minutes: 0,
                      seconds: parseInt(e.target.value)
                    }
                  }
                })
              }}
            />
            <div className="c-input__bottom has-error"></div>
          </div>
        </div>
        <span>seconds. (240 maximum)</span>
        <span className="c-inline-error">Please enter a number under 240</span>
      </div>
    </div>
    <Feedback />
  </div>
  );
}
