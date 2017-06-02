import React      from 'react';
import _          from 'lodash';
import languages  from '../../../../constants/language_types';

export default function metaDataInputs(props) {
  const shouldDisplay = type => props.selectedLanguage === languages.languageTypeId.english || type === 'altText';
  return (
    <div>
      {_.map(props.metadataTypes, type => (
        shouldDisplay(type) ?
          <div className="au-c-input au-c-input-label--left" key={`metadata_input_${type}`}>
            <label htmlFor={`meta_upload_${type}`}>{props.labelName(type)}</label>
            <div className="au-c-input__contain">
              <input
                value={props.metaData[type] || ''}
                className="au-c-text-input au-c-text-input--smaller"
                id={`meta_upload_${type}`}
                type="text"
                tabIndex="0"
                onChange={e => props.updateMetadata(type, e.target.value)}
              />
              <div className="au-c-input__bottom" />
            </div>
          </div>
      : null
      ))}
    </div>
  );
}

metaDataInputs.propTypes = {
  metadataTypes: React.PropTypes.array,
  metaData: React.PropTypes.shape({}),
};
