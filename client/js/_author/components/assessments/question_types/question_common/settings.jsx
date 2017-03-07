import React            from 'react';
import _                from 'lodash';
import types            from '../../../../../constants/question_types';
import languages        from '../../../../../constants/language_types';
import SettingsCheckbox from './settings_checkbox';

export default function questionSettings(props) {
  const extraOptionTypes = [
    types.multipleChoice,
    types.reflection,
    types.multipleReflection,
    types.multipleAnswer
  ];

  return (
    <div className="author--c-question-settings">
      <div className="author--o-left">
        <div className="author--c-input author--c-input-label--left">
          <label htmlFor={`question_name_${props.id}`}>Name</label>
          <div className="author--c-input__contain">
            <input
              className="author--c-text-input author--c-text-input--smaller"
              id={`question_name_${props.id}`}
              type="text"
              tabIndex="0"
              defaultValue={props.defaultName}
              onBlur={e => props.updateItem({ name: e.target.value })}
            />
            <div className="author--c-input__bottom" />
          </div>
        </div>

        <div className="author--c-dropdown author--c-dropdown--small author--u-ml-md">
          <select
            name=""
            id=""
            tabIndex="0"
            value={languages.languageTypeId[props.language]}
            onChange={e => props.updateItem({ language: e.target.value })}
          >
            <option value={languages.languageTypeId.english}>English</option>
            <option value={languages.languageTypeId.hindi}>Hindi</option>
            <option value={languages.languageTypeId.telugu}>Telugu</option>
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
  multipleAnswer: React.PropTypes.bool,
  reflection: React.PropTypes.bool,
};
