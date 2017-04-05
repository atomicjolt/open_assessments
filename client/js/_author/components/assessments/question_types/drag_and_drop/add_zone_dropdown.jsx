import React      from 'react';

export default function addZoneDropdown(props) {
  return (
    <ul className="au-c-button-dropdown u-ml-sm">
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
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByRegion}
            >
              <i className="material-icons">open_in_new</i>
              by region
            </button>
          </li>
          <li>
            <button
              className="au-c-btn au-c-btn--sm au-c-btn--dropdown-item"
              onClick={props.addByImage}
            >
              <i className="material-icons">image</i>
              by image
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
};
