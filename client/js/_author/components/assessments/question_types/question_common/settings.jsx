import React            from 'react';
import _                from 'lodash';
import types            from '../../../../../constants/question_types';
import languages        from '../../../../../constants/language_types';
import SettingsCheckbox from './settings_checkbox';
import localize         from '../../../../locales/localize';

function questionSettings(props) {
  const strings = props.localizeStrings();
  const extraOptionTypes = [
    types.multipleChoice,
    types.reflection,
    types.multipleReflection,
    types.multipleAnswer
  ];

  return (
    <div className="au-c-question-settings">
      <div className="au-o-left">
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`question_name_${props.id}`}>{strings.name}</label>
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id={`question_name_${props.id}`}
              type="text"
              tabIndex="0"
              defaultValue={props.defaultName}
              onBlur={e => props.updateItem({ name: e.target.value })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>

        <div className="au-c-dropdown au-c-dropdown--small au-u-ml-md">
          <select
            name=""
            id=""
            tabIndex="0"
            value={languages.languageTypeId[props.language]}
            onChange={e => props.updateItem({ language: e.target.value })}
          >
            <option value={languages.languageTypeId.english}>{strings.english}</option>
            <option value={languages.languageTypeId.hindi}>{strings.hindi}</option>
            <option value={languages.languageTypeId.telugu}>{strings.telugu}</option>
          </select>
        </div>
      </div>
      {_.includes(extraOptionTypes, props.type) ? <SettingsCheckbox {...props} /> : null}
    </div>
  );
}

questionSettings.propTypes = {
  id: React.PropTypes.string.isRequired,
  defaultName: React.PropTypes.string,
  type: React.PropTypes.string,
  language: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
  makeReflection: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  multipleAnswer: React.PropTypes.bool,
  reflection: React.PropTypes.bool,
};

export default localize(questionSettings);
