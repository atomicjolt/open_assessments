import React    from 'react';
import _        from 'lodash';

export default function metaDataFileInputs(props) {
  return (
    <div>
      {_.map(props.metadataFileTypes, type => (
        <div className="au-u-mb-md au-u-mt-md" key={`metadata_input_${type}`}>
          <label htmlFor={`metadata_input_${type}`} className="au-c-input--file au-o-flex-center">
            <span className="au-c-wysiwyg-media__label">
              {props.labelName(type)}
            </span>
            <div className="au-c-wysiwyg-media__source-text" tabIndex="0">
              {_.get(props, `metaData.${type}.name`, '')}
            </div>
            <input
              onChange={e => props.updateMetadata(type, e.target.files[0])}
              id={`metadata_input_${type}`}
              type="file"
            />
            <div className="au-c-wysiwyg-media__upload">
              <i className="material-icons">find_in_page</i>
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}

metaDataFileInputs.propTypes = {
  metadataFileTypes: React.PropTypes.arrayOf(React.PropTypes.string),
  labelName: React.PropTypes.func
};
