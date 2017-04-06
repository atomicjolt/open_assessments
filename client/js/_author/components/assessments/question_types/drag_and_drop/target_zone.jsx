import React    from 'react';
import _        from 'lodash';
import DropZone from './drop_zone';

export default class TargetZone extends React.Component {
  static propTypes = {
    target: React.PropTypes.shape({}),
    zones: React.PropTypes.shape({}),
    editZone: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.target = null;
    this.state = {
      activeZone: null,
    };
  }

  render() {
    const { target, zones, editZone } = this.props;
    return (
      <div
        className="au-c-drag-and-drop__target-image"
        style={{ backgroundImage: `url(${target.image})` }}
        ref={(area) => { this.target = area; }}
      >
        {
          _.map(zones, zone => (
            <DropZone
              key={`drop_zone_${zone.id}`}
              zone={zone}
              target={this.target}
              editZone={editZone}
              setActive={() => this.setState({ activeZone: zone.id })}
              isActive={this.state.activeZone === zone.id}
            />
          ))
        }
      </div>
    );
  }
}
