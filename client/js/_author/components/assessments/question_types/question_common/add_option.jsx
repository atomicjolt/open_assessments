import React    from 'react';

export default function addOption(props) {
  return (
    <div
      className="au-c-answer au-o-flex-center au-c-answer--add"
      onClick={props.createChoice}
    >
      <div className="au-c-input">
        <label htmlFor="option2" />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
            id="option2"
            type="text"
            value="Add Option"
            disabled
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
