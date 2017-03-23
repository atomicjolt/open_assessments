import React      from 'react';
import assets     from '../../../../../libs/assets';

export default class DragArea extends React.Component {
  static propTypes = {
    dropObjects: React.PropTypes.shape({}).isRequired,
  };

  constructor() {
    super();
    this.state = {
      activeObject: '',
    };
  }

  render() {
    const logo = assets('./_author/images/CLIx-logo.png');

    return (
      <div className="au-c-drop-zone__answers au-o-row">
        {
          _.map(this.props.dropObjects, object => (
            <div
              className="au-o-quarter"
              key={`drag_object_${object.id}`}
              onClick={() => this.setState({ activeObject: object.id })}
            >
              <div
                className={`au-c-drop-zone-answer ${this.state.activeObject === object.id ? 'is-active' : ''}`}
                tabIndex="0"
              >

                <div className="au-c-dropdown au-c-dropdown--small">
                  <label htmlFor={`drag_object_dropDown_${object.id}`} />
                  <select name="" id={`drag_object_dropDown_${object.id}`}>
                    <option value="">Drop A</option>
                    <option value="">Snap B</option>
                  </select>
                </div>

                <div className="au-c-input au-c-input-label--left">
                  <label htmlFor={`drag_object_label_${object.id}`}>Label</label>
                  <div className="au-c-input__contain">
                    <input
                      id={`drag_object_label_${object.id}`}
                      className="au-c-text-input au-c-text-input--smaller"
                      type="text"
                      defaultValue={object.label}
                      onBlur={e => this.props.updateChoice(object.id, { label: e.target.value })}
                    />
                    <div className="au-c-input__bottom" />
                  </div>
                </div>

                <div className="au-c-drop-zone-answer__image">
                  <img src={object.image || logo} alt="default" />
                </div>
              </div>
            </div>
          ))
        }

        <div className="au-o-quarter">
          <div className="au-c-drop-zone-answer-add">

            <button
              className="au-c-drop-zone-answer-add__button"
              onClick={() => this.props.createChoice('dropObjects')}
            >
              Add Image
            </button>

          </div>
        </div>

      </div>
    );
  }
}