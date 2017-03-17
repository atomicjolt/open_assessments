import React      from 'react';

export default function AddOption(props) {
  return (
    <div
      className="au-c-answer au-o-flex-center au-c-answer--add"
      tabIndex="0"
      onClick={() => props.updateChoice()}
    >
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
  );
}

AddOption.propTypes = {
  updateChoice: React.PropTypes.func.isRequired,
};
