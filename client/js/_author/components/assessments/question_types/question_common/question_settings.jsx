import React    from 'react';

export default function questionSettings(props) {
  return (
    <div className="c-question-settings">
      <div className="o-left">
        <div className="c-input c-input-label--left">
          <label htmlFor={`question_name_${props.id}`}>Name</label>
          <div className="c-input__contain">
            <input
              className="c-text-input c-text-input--smaller"
              id={`question_name_${props.id}`}
              type="text"
              tabIndex="-1"
            />
            <div className="c-input__bottom" />
          </div>
        </div>

        <div className="c-dropdown c-dropdown--small u-ml-md">
          <select name="" id="" tabIndex="-1">
            <option value="">English</option>
            <option value="">French</option>
            <option value="">Spanish</option>
          </select>
        </div>
      </div>

      <div className="o-right">
        <div className="c-checkbox u-ml-md">
          <input type="checkbox" id="check02" name="check" tabIndex="-1" />
          <label htmlFor="check02">Maintain choice order</label>
        </div>
        <div className="c-checkbox u-ml-md">
          <input type="checkbox" id="check03" name="check" tabIndex="-1" />
          <label htmlFor="check03">Multiple answer</label>
        </div>
        <div className="c-checkbox u-ml-md">
          <input type="checkbox" id="check04" name="check" tabIndex="-1" />
          <label htmlFor="check04">Reflection</label>
        </div>
      </div>
    </div>
  );
}

questionSettings.propTypes = {
  id: React.PropTypes.string.isRequired,
};
