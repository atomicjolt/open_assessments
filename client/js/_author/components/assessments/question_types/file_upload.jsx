import React    from 'react';

export default function (props) {
  return (
    <div className="c-question__answers o-row" role="radiogroup">
      <div className="o-half">
        <div className="c-radio--file">
          <input type="radio" id="radio8" name="radio"/>
          <label htmlFor="radio8">Audio Record</label>
        </div>
      </div>
      <div className="o-half">
        <div className="c-radio--file">
          <input type="radio" id="radio9" name="radio"/>
          <label htmlFor="radio9">File Upload</label>
        </div>
      </div>
      <div className="c-file-upload__audio-settings is-active">
        <span>Audio record limit</span>
        <div className="c-input c-input--inline">
          <label htmlFor="audio-limit"></label>
          <div className="c-input__contain">
            <input className="c-text-input c-text-input--smaller" id="audio-limit" type="text" maxLength="3" value="100"/>
            <div className="c-input__bottom has-error"></div>
          </div>
        </div>
        <span>seconds. (240 maximum)</span>
        <span className="c-inline-error">Please enter a number under 240</span>
      </div>
    </div>
  );
}
