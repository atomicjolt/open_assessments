import React    from 'react';
import Feedback from './question_common/feedback';


export default function() {
  return (
    <div>
      <div className="c-question__answers c-question__answers--maintain">
        <div className="c-answer is-active">
          <div className="c-input">
            <div className="c-radio">
              <input type="radio" id="radio" name="radio" tabIndex="0" />
              <label htmlFor="radio" />
            </div>
            <label htmlFor="option1" />
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--small c-wysiwyg" id="option1" type="text" placeholder="Option 1" tabIndex="0" />
              <div className="c-input__bottom" />
            </div>

            <div className="c-answer__icons">
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">arrow_upward</i>
              </button>
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">arrow_downward</i>
              </button>
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>

          <div className="c-input c-input-label--left c-feedback">
            <label htmlFor="feedback1">Feedback</label>
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedback1" type="text" tabIndex="0" />
              <div className="c-input__bottom" />
            </div>
          </div>
        </div>


        <div className="c-answer">
          <div className="c-input">
            <div className="c-radio">
              <input type="radio" id="radio1" name="radio" tabIndex="0" />
              <label htmlFor="radio1" />
            </div>

            <label htmlFor="option2" />
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--small c-wysiwyg c-option" id="option2" type="text" placeholder="Option 2" tabIndex="0" />
              <div className="c-input__bottom no-border" />
            </div>

            <div className="c-answer__icons">
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">arrow_upward</i>
              </button>
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">arrow_downward</i>
              </button>
              <button className="c-answer__icons__spacer" tabIndex="0">
                <i className="material-icons">close</i>
              </button>
            </div>
          </div>

          <div className="c-input c-input-label--left c-feedback">
            <label htmlFor="feedback2">Feedback</label>
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedback2" type="text" tabIndex="0" />
              <div className="c-input__bottom" />
            </div>
          </div>
        </div>


        <div className="c-answer c-answer--add">
          <div className="c-input">
            <div className="c-radio">
              <input type="radio" id="radio1" name="radio" tabIndex="0" />
              <label htmlFor="radio1" />
            </div>

            <label htmlFor="option2" />
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--small c-wysiwyg c-option" id="option2" type="text" value="Add Option" tabIndex="0" />
              <div className="c-input__bottom no-border" />
            </div>
          </div>
        </div>
      </div>
      <Feedback />
    </div>
  );
}
