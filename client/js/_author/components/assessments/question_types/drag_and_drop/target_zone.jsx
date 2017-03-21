import React    from 'react';

export default class TargetZone extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="au-c-drag-and-drop__target-image">
        <div className="au-c-drop-zone au-c-zone1 is-active">

          <div className="au-c-drop-zone__tag">Drop A</div>

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

        <div className="au-c-drop-zone au-c-zone2">
          <div className="au-c-drop-zone__tag">Snap B</div>
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
      </div>
    );
  }
}
