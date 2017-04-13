import React    from 'react';
import localize from '../../../../locales/localize';

function addOption(props) {
  const strings = props.localizeStrings('commonAddOption');
  return (
    <div
      className="au-c-answer au-o-flex-center au-c-answer--add"
      onClick={props.createChoice}
      tabIndex="0"
      onKeyDown={(e) => { if (e.keyCode === 13) { props.createChoice(e); } }}
    >
      <div className="au-c-input">
        <label htmlFor="option2" />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg au-c-option"
            id="option2"
            type="text"
            value={strings.addOption}
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
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(addOption);
