import React    from 'react';

export default class TargetZone extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { target, zones } = this.props;

    return (
      <div
        className="au-c-drag-and-drop__target-image"
        style={{ backgroundImage: `url(${target.image})` }}
      >
        {
          _.map(zones, (zone, index) => (
            <div className="au-c-drop-zone au-c-zone1 is-active">

              <div className="au-c-drop-zone__tag">{_.capitalize(zone.type)} {String.fromCharCode(index + 65)}</div>

              <div className="au-c-drop-zone__tool-tip is-right">
                <div className="au-c-input au-c-input-label--left au-c-input--white">
                  <label htmlFor="">Label</label>
                  <div className="au-c-input__contain">
                    <input className="au-c-text-input au-c-text-input--smaller" type="text" />
                    <div className="au-c-input__bottom" />
                  </div>
                </div>
                <button className="au-c-btn au-c-btn--square"><i className="material-icons">delete</i></button>
              </div>

            </div>
          ))
        }
      </div>
    );
  }
}
