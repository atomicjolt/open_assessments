import React    from 'react';
import _        from 'lodash';
import DropZone from './drop_zone';

export default class TargetZone extends React.Component {
  static propTypes = {
    target: React.PropTypes.shape({}),
    zones: React.PropTypes.shape({}),
  };

  constructor() {
    super();
    this.target = null;
  }

  render() {
    const { target, zones } = this.props;
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
            />
          ))
        }
      </div>
    );
  }
}
