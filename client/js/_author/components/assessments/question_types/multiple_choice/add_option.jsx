import React      from 'react';

export default function addOption(props) {
  return (
    <div
      className="au-c-answer au-c-answer--add"
      onClick={() => props.createChoice()}
    >
      <div className="au-c-input">
        <div className="au-c-radio">
          <input type="radio" id="radio1" name="radio" tabIndex="-1" />
          <label htmlFor="radio1" />
        </div>

        <label htmlFor="addOption" />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
            id="addOption"
            type="text"
            placeholder="Add Option"
            tabIndex="-1"
          />
          <div className="au-c-input__bottom no-border" />
        </div>
      </div>
    </div>
  );
}

addOption.propTypes = {
  createChoice: React.PropTypes.func.isRequired,
};
