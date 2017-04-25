import React      from 'react';
import AddZone    from './add_zone_dropdown';
import localize   from '../../../../locales/localize';

export function targetMenu(props) {
  const strings = props.localizeStrings('targetMenu');

  return (
    <div className="au-o-item__top" onMouseLeave={() => props.toggleAdd('close')}>
      <div className="au-o-left">
        <div className="au-c-question__type">{strings.targetImage}</div>
      </div>
      <div className="au-o-right">
        <div className="au-c-checkbox au-u-ml-md au-u-mr-sm">
          <input
            id={`toggle_show_zone_${props.id}`}
            type="checkbox"
            tabIndex="0"
            checked={props.visibleZones}
            onChange={e => props.toggleVisible(e.target.checked)}
          />
          <label htmlFor={`toggle_show_zone_${props.id}`}>
            {strings.showZones}
          </label>
        </div>
        <button
          className="au-c-btn au-c-btn--sm au-c-btn--gray"
          onClick={() => props.openModal(null)}
        >
          {props.hasTarget ? strings.replace : strings.addImage}
        </button>
        <AddZone
          active={props.addMenu === 'snap'}
          text={strings.addSnap}
          toggle={() => props.toggleAdd('snap')}
          addByRegion={() => props.addByRegion('snap')}
          addByImage={() => props.openModal('snap')}
        />
        <AddZone
          active={props.addMenu === 'drop'}
          text={strings.addDrop}
          toggle={() => props.toggleAdd('drop')}
          addByRegion={() => props.addByRegion('drop')}
          addByImage={() => props.openModal('drop')}
        />
      </div>
    </div>
  );
}

targetMenu.propTypes = {
  localizeStrings: React.PropTypes.func.isRequired,
  openModal: React.PropTypes.func.isRequired,
  toggleAdd: React.PropTypes.func.isRequired,
  addByRegion: React.PropTypes.func.isRequired,
  toggleVisible: React.PropTypes.func.isRequired,
  hasTarget: React.PropTypes.bool,
  visibleZones: React.PropTypes.bool,
  addMenu: React.PropTypes.string,
  id: React.PropTypes.string,
};

export default localize(targetMenu);
