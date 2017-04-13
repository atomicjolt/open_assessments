import React    from 'react';
import _        from 'lodash';

export default function metaDataFileInputs(props) {
  return (
    <div>
      {_.map(props.metadataFileTypes, type => (
        <div className="au-c-input au-c-input-label--left" key={`metadata_input_${type}`}>
          <label htmlFor={`meta_upload_${type}`}>{props.labelName(type)}</label>
          <div className="au-c-input__contain">
            <input
              className=""
              id={`meta_upload_${type}`}
              type="file"
              tabIndex="0"
              onChange={e => props.updateMetadata(type, e.target.files[0])}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
      ))}
    </div>
  );
}

metaDataFileInputs.propTypes = {
  metadataFileTypes: React.PropTypes.shape({}),
  labelName: React.PropTypes.func
};
