import React                  from 'react';

export default function EditableItem(props) {
  return (
    <div className="o-item c-question is-active">
      <div className="o-item__top">
        <div className="o-left">
          <div className="c-question__number">Question 1</div>
          <div className="c-question__type">&nbsp;&nbsp; - &nbsp;&nbsp; Multiple Choice</div>
        </div>

        <div className="o-right c-question-icons">
          <i className="material-icons">remove_red_eye</i>
          <i className="material-icons">swap_vert</i>
          <i className="material-icons">delete</i>
        </div>
      </div>

      <div className="c-question-settings">
        <div className="o-left">
          <label htmlFor={`name_${props.itemIndex}`} className="c-input c-input-label--left" >
            Name
            <div className="c-input__contain">
              <input id={`name_${props.itemIndex}`} className="c-text-input c-text-input--smaller" type="text" />
              <div className="c-input__bottom" />
            </div>
          </label>

          <label htmlFor={`language_${props.itemIndex}`}className="c-dropdown c-dropdown--small u-ml-sm">
            <select name="" id={`language_${props.itemIndex}`}>
              <option value="639-2%3AENG%40ISO">English</option>
              <option value="639-2%3AHIN%40ISO">Hindi</option>
              <option value="639-2%3ATEL%40ISO">Telugu</option>
            </select>
          </label>
        </div>

        <div className="o-right">
          <div className="c-checkbox u-ml-sm">
            <input type="checkbox" id="check02" name="check" />
            <label htmlFor="check02">Maintain choice order</label>
          </div>
          <div className="c-checkbox u-ml-sm">
            <input type="checkbox" id="check03" name="check" />
            <label htmlFor="check03">Multiple answer</label>
          </div>
          <div className="c-checkbox u-ml-sm">
            <input type="checkbox" id="check04" name="check" />
            <label htmlFor="check04">Reflection</label>
          </div>
        </div>
      </div>

      <div className="c-question__content">
        <label htmlFor={`text_${props.itemIndex}`} className="c-input c-question-text">
          <div className="c-input__contain">
            <input id={`text_${props.itemIndex}`} className="c-text-input c-text-input--medium c-wysiwyg" type="text" placeholder="Question Text" />
            <div className="c-input__bottom" />
          </div>
        </label>

        <div className="c-question__answers c-question__answers--maintain">

          <div className="c-answer is-active">
            <div className="c-input">
              <div className="c-radio">
                <input type="radio" id="radio" name="radio" />
                <label htmlFor="radio" />
              </div>

              <label htmlFor="option1" />
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--small c-wysiwyg" id="option1" type="text" placeholder="Option 1" />
                <div className="c-input__bottom" />
              </div>

              <div className="c-answer__icons">
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">arrow_upward</i>
                </div>
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">arrow_downward</i>
                </div>
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">close</i>
                </div>
              </div>
            </div>

            <div className="c-input c-input-label--left c-feedback">
              <label htmlFor="feedback1">Feedback</label>
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedback1" type="text" />
                <div className="c-input__bottom" />
              </div>
            </div>
          </div>

          <div className="c-answer">
            <div className="c-input">
              <div className="c-radio">
                <input type="radio" id="radio1" name="radio" />
                <label htmlFor="radio1" />
              </div>

              <label htmlFor="option2" />
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--small c-wysiwyg c-option" id="option2" type="text" placeholder="Option 2" />
                <div className="c-input__bottom no-border" />
              </div>

              <div className="c-answer__icons">
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">arrow_upward</i>
                </div>
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">arrow_downward</i>
                </div>
                <div className="c-answer__icons__spacer">
                  <i className="material-icons">close</i>
                </div>
              </div>
            </div>

            <div className="c-input c-input-label--left c-feedback">
              <label htmlFor="feedback2">Feedback</label>
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedback2" type="text" />
                <div className="c-input__bottom" />
              </div>
            </div>
          </div>

          <div className="c-answer c-answer--add">
            <div className="c-input">
              <div className="c-radio">
                <input type="radio" id="radio1" name="radio" />
                <label htmlFor="radio1" />
              </div>

              <label htmlFor="option2" />
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--small c-wysiwyg c-option" id="option2" type="text" value="Add Option" />
                <div className="c-input__bottom no-border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EditableItem.propTypes = {
  itemIndex: React.PropTypes.number.isRequired,
};
