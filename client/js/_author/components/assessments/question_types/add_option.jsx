import React      from 'react';

export default function addOption(props) {
  return (
    <div
      className="author--c-answer author--c-answer--add"
      tabIndex="0"
      onClick={() => props.updateChoice()}
    >
      <div className="author--c-input">
        <div className="author--c-radio">
          <input type="radio" id="radio1" name="radio" tabIndex="-1" />
          <label htmlFor="radio1" />
        </div>

        <label htmlFor="addOption" />
        <div className="author--c-input__contain">
          <input
            className="author--c-text-input author--c-text-input--small author--c-wysiwyg author--c-option"
            id="addOption"
            type="text"
            placeholder="Add Option"
            tabIndex="-1"
          />
          <div className="author--c-input__bottom no-border" />
        </div>
      </div>
    </div>
  );
}

addOption.propTypes = {
  updateChoice: React.PropTypes.func.isRequired,
};
