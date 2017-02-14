import React      from 'react';

export default function addOption(props) {
  return (
    <div
      className="c-answer c-answer--add"
      tabIndex="0"
      onClick={() => props.updateChoice()}
    >
      <div className="c-input">
        <div className="c-radio">
          <input type="radio" id="radio1" name="radio" tabIndex="-1" />
          <label htmlFor="radio1" />
        </div>

        <label htmlFor="addOption" />
        <div className="c-input__contain">
          <input
            className="c-text-input c-text-input--small c-wysiwyg c-option"
            id="addOption"
            type="text"
            value="Add Option"
            tabIndex="-1"
          />
          <div className="c-input__bottom no-border" />
        </div>
      </div>
    </div>
  );
}

addOption.propTypes = {
  updateChoice: React.PropTypes.func.isRequired,
};
