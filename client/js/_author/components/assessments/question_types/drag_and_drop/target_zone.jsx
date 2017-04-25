import React        from 'react';
import _            from 'lodash';
import DropZone     from './drop_zone';
import Placeholder  from './target_placeholder';

export default class TargetZone extends React.Component {
  static propTypes = {
    target: React.PropTypes.shape({}),
    zones: React.PropTypes.shape({}),
    editZone: React.PropTypes.func.isRequired,
    openModal: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.target = null;
    this.state = {
      activeZone: null,
    };
  }

  setActiveZone(e, zoneId) {
    e.stopPropagation();
    this.setState({ activeZone: zoneId });
  }

  render() {
    const { target, zones, editZone } = this.props;
    return (
      <div
        className="au-c-drag-and-drop__target-image"
        ref={(area) => { this.target = area; }}
        onClick={() => this.setState({ activeZone: null })}
      >
        {
          _.isEmpty(target) ?
            <Placeholder onClick={this.props.openModal} />
            : <img src={target.image} alt="target" />
        }
        {
          _.map(zones, zone => (
            <DropZone
              key={`drop_zone_${zone.id}`}
              zone={zone}
              target={this.target}
              editZone={editZone}
              setActive={e => this.setActiveZone(e, zone.id)}
              isActive={this.state.activeZone === zone.id}
            />
          ))
        }
      </div>
    );
  }
}
