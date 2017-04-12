import React      from 'react';
import AddZone    from './add_zone_dropdown';
import localize           from '../../../../locales/localize';

export class TargetMenu extends React.Component {
  static propTypes = {
    localizeStrings: React.PropTypes.func.isRequired,
    openModal: React.PropTypes.func.isRequired,
    toggleAdd: React.PropTypes.func.isRequired,
    hasTarget: React.PropTypes.bool,
    addType: React.PropTypes.string.isRequired,
  };

  render() {
    const strings = this.props.localizeStrings('targetMenu');

    return (
      <div className="au-o-item__top">
        <div className="au-o-left">
          <div className="au-c-question__type">{strings.targetImage}</div>
        </div>
        <div className="au-o-right">
          <button
            className="au-c-btn au-c-btn--sm au-c-btn--gray"
            onClick={this.props.openModal}
          >
            {this.props.hasTarget ? strings.replace : strings.addImage}
          </button>
          <AddZone
            active={this.props.addType === 'snap'}
            text={strings.addSnap}
            toggle={() => this.props.toggleAdd('snap')}
            addByRegion={() => this.addByRegion()}
            addByImage={this.props.openModal}
          />
          <AddZone
            active={this.props.addType === 'drop'}
            text={strings.addDrop}
            toggle={() => this.props.toggleAdd('drop')}
            addByRegion={() => this.addByRegion()}
            addByImage={this.props.openModal}
          />
        </div>
      </div>
    );
  }
}

export default localize(TargetMenu);
