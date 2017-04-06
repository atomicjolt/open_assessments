import React     from 'react';
import localize  from '../../../../locales/localize';

function saveOption(props) {
  const strings = props.localizeStrings('saveOption');
  return (
    <button
      className="au-c-btn au-c-btn--sm au-c-btn--maroon au-u-ml-md"
      onClick={props.save}
    >
      {strings.saveOptions}
    </button>
  );
}

saveOption.propTypes = {
  save: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(saveOption);
