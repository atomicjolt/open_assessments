import React from 'react';
import _ from 'lodash';

export default class ImageOption extends React.Component {

  static propTypes = {
    deleteChoice: React.PropTypes.func,
    updateChoice: React.PropTypes.func,
    activateChoice: React.PropTypes.func,
    id: React.PropTypes.string,
    activeChoice: React.PropTypes.string,
    text: React.PropTypes.string,
    labelText: React.PropTypes.string,
    order: React.PropTypes.number,
    numChoices: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      labelText: '',
    };
  }

  updateChoice() {
    const labelText = this.state.labelText;
    this.props.updateChoice({ labelText, imageLabel: true }, null);
  }

  render() {

    const { activateChoice, updateChoice, deleteChoice, id, order, numChoices } = this.props;
    const isActive = _.get(this.props, 'id') === _.get(this.props, 'activeChoice');
    return (
      <div
        className={`au-c-image-sequence-answer ${isActive ? 'is-active' : ''} tabIndex="0"`}
        onClick={() => activateChoice(id)}
      >
        { isActive ?
          <div className="au-c-image-sequence-answer__top">
            <div className="au-c-dropdown au-c-dropdown--tiny">
              <label htmlFor="image_option_order" />
              <select
                name=""
                id="image_option_order"
                onChange={e => updateChoice({
                  id,
                  order: parseInt(e.target.value, 10)
                })}
                defaultValue={order}
              >
                {
                  _.map([null].concat(_.range(1, numChoices + 1)), (val, index) =>
                    <option
                      key={`option_key_${index}`}
                      value={val}
                    >
                      {val === null ? 'N/A' : val}
                    </option>
                  )
                }
              </select>
            </div>
            <button className="au-c-answer--delete au-u-right" onClick={() => deleteChoice(this.props)}>
              <i className="material-icons">close</i>
            </button>
          </div>
          : null
        }
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor="props.id">Label</label>
          <div className="au-c-input__contain">
            <input
              defaultValue={this.props.labelText}
              onChange={e => this.setState({ labelText: e.target.value })}
              onBlur={() => this.updateChoice()}
              className="au-c-text-input au-c-text-input--smaller"
              type="text"
              id="props.id"
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        <div className="au-c-image-sequence-answer__image">
          <img src={this.props.text} alt="" />
        </div>
      </div>
    );
  }
}
