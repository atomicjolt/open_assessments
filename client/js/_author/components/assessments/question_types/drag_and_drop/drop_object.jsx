import React    from 'react';
import _        from 'lodash';
import assets   from '../../../../../libs/assets';
import localize from '../../../../locales/localize';

function dropObject(props) {
  const { object, zones, updateObject, setActive, isActive } = props;
  const logo = assets('./_author/images/CLIx-logo.png');
  const strings = props.localizeStrings('dropObject');

  return (
    <div
      className="au-o-quarter au-set-active"
      onClick={() => setActive()}
    >
      <div
        className={`au-c-drop-zone-answer ${isActive ? 'is-active' : ''}`}
        tabIndex="0"
      >

        <div className="au-c-drop-zone-answer__top">
          <div className="au-c-dropdown au-c-dropdown--small">
            <label htmlFor={`drag_object_dropDown_${object.id}`} />
            <select
              name=""
              id={`drag_object_dropDown_${object.id}`}
              onChange={e => updateObject({ correctZone: e.target.value })}
              value={object.correctZone}
            >
              <option value={null}>{strings.selectAnswer}</option>
              {
                _.map(zones, zone => (
                  <option value={zone.id} key={`drop_zone_selector_${zone.id}`}>
                    {_.capitalize(zone.type)} {String.fromCharCode(zone.index + 65)}
                  </option>
                ))
              }
            </select>
          </div>

          <button
            className="au-c-answer--delete"
            onClick={() => updateObject({ delete: true })}
          >
            <i className="material-icons">close</i>
          </button>
        </div>

        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`drag_object_label_${object.id}`}>
            {strings.label}
          </label>
          <div className="au-c-input__contain">
            <input
              id={`drag_object_label_${object.id}`}
              className="au-c-text-input au-c-text-input--smaller"
              type="text"
              defaultValue={object.label}
              onBlur={e => updateObject({ label: e.target.value })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>

        <div className="au-c-drop-zone-answer__image">
          <img src={object.image || logo} alt="default" />
        </div>
      </div>
    </div>
  );
}

dropObject.propTypes = {
  object: React.PropTypes.shape({}).isRequired,
  zones: React.PropTypes.shape({}).isRequired,
  updateObject: React.PropTypes.func.isRequired,
  setActive: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  isActive: React.PropTypes.bool,
};

export default localize(dropObject);
