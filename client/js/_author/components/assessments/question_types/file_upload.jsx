import React    from 'react';

export default function (props) {
  return (
    <div class="c-question__answers o-row" role="radiogroup">
      <div class="o-half">
        <div class="c-radio--file">
          <input type="radio" id="radio8" name="radio"/>
          <label for="radio8">Audio Record</label>
        </div>
      </div>
      <div class="o-half">
        <div class="c-radio--file">
          <input type="radio" id="radio9" name="radio"/>
          <label for="radio9">File Upload</label>
        </div>
      </div>
      <div class="c-file-upload__audio-settings is-active">
        <span>Audio record limit</span>
        <div class="c-input c-input--inline">
          <label for="audio-limit"></label>
          <div class="c-input__contain">
            <input class="c-text-input c-text-input--smaller" id="audio-limit" type="text" maxlength="3" value="100"/>
            <div class="c-input__bottom has-error"></div>
          </div>
        </div>
        <span>seconds. (240 maximum)</span>
        <span class="c-inline-error">Please enter a number under 240</span>
      </div>
    </div>
  );
}
