import React      from 'react';

export default function addOption(props) {
  return (
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
  );
}
