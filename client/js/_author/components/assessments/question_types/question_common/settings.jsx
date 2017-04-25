import React            from 'react';
import _                from 'lodash';
import types            from '../../../../../constants/question_types';
import LanguageSelect   from '../../../common/language_dropdown';
import SettingsCheckbox from './settings_checkbox';
import localize         from '../../../../locales/localize';

function questionSettings(props) {
  const strings = props.localizeStrings('questionSettings');
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

        <LanguageSelect
          language={props.language}
          updateItem={props.updateItem}
        />
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
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(questionSettings);
