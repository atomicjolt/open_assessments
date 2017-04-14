import React      from 'react';
import localize   from '../../../../locales/localize';

function addZoneDropdown(props) {
  const strings = props.localizeStrings('addZoneDropDown');

  return (
    <ul className="au-c-button-dropdown au-u-ml-sm" >
      <li>
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--dropdown"
          onClick={props.toggle}
        >
          {props.text}
          <i className="material-icons">arrow_drop_down</i>
        </button>
        <ul className={`au-c-button-dropdown__dropdown ${props.active ? 'is-active' : ''}`}>
          <li>
            <button
              id={`reg_${props.text}`}
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByRegion}
            >
              <i className="material-icons">open_in_new</i>
              {strings.byRegion}
            </button>
          </li>
          <li>
            <button
              id={`image_${props.text}`}
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByImage}
            >
              <i className="material-icons">image</i>
              {strings.byImage}
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
}

addZoneDropdown.propTypes = {
  active: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired,
  toggle: React.PropTypes.func.isRequired,
  addByRegion: React.PropTypes.func.isRequired,
  addByImage: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(addZoneDropdown);
