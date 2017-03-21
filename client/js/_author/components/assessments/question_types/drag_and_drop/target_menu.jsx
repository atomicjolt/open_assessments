import React    from 'react';
import AddZone  from './add_zone_dropdown';

export default class TargetMenu extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      add: null,
    };
  }

  render() {
    return (
      <div className="au-o-item__top">
        <div className="au-o-left">
          <div className="au-c-question__type">Target Image</div>
        </div>
        <div className="au-o-right">
          <button className="au-c-btn au-c-btn--sm au-c-btn--gray">Replace Image</button>
          <AddZone
            active={this.state.add === 'snap'}
            text="Add Snap Zone"
            toggle={() => this.setState({ add: this.state.add !== 'snap' ? 'snap' : null })}
          />
          <AddZone
            active={this.state.add === 'drop'}
            text="Add Drop Zone"
            toggle={() => this.setState({ add: this.state.add !== 'drop' ? 'drop' : null })}
          />
        </div>
      </div>
    );
  }
}