import React       from 'react';
import _           from 'lodash';
import localize    from '../../../../locales/localize';
import UpdateMedia from './update_media';

function dropObject(props) {
  const { object, zones, updateObject, setActive, isActive } = props;
  const strings = props.localizeStrings('dropObject');

  const labelText = _.get(props, `object.labels[${props.language}].text`, '');
  const image = _.get(props, `object.images[${props.language}].text`, '');

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
              defaultValue={labelText}
              onBlur={e => updateObject({
                labels:{
                  [props.language]: {
                    text: e.target.value
                  }
                }
              })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        {
          image ?
            <div className="au-c-drop-zone-answer__image">
              <img src={image} alt="default" />
            </div>
            :
            <UpdateMedia
              dropObject={props.object}
              updateMedia={props.uploadMedia}
              language={props.language}
            />
        }
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
  language: React.PropTypes.string,
  uploadMedia: React.PropTypes.func
};

export default localize(dropObject);
