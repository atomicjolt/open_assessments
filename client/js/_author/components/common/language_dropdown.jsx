import React        from 'react';
import languages    from '../../../constants/language_types';

export default function languageDropdown(props) {
  return (
    <div className="au-c-dropdown au-c-dropdown--small au-u-ml-md">
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
  );
}

languageDropdown.propTypes = {
  language: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
};
