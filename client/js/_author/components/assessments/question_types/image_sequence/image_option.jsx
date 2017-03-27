import React from 'react';
import _ from 'lodash';

export default function ImageOption(props) {

  const isActive = props.id === props.activeChoice;
  const url = props.text.split('"')[1];
  return (
    <div
      className={`au-c-image-sequence-answer ${isActive ? 'is-active' : ''} tabIndex="0"`}
      onClick={() => props.activateChoice(props.id)}
    >
      { isActive ?
        <div className="au-c-image-sequence-answer__top">
          <div className="au-c-dropdown au-c-dropdown--tiny">
            <label htmlFor="image_option_order" />
            <select
              name=""
              id="image_option_order"
              onChange={e => props.updateChoice({
                id: props.id,
                order: parseInt(e.target.value, 10)
              })}
              defaultValue={props.order}
            >
              {
                _.map([null].concat(_.range(1, props.numChoices + 1)), (val, index) =>
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
          <button className="au-c-answer--delete au-u-right" onClick={() => props.deleteChoice(props)}>
            <i className="material-icons">close</i>
          </button>
        </div>
        : null
      }
      <div className="au-c-input au-c-input-label--left">
        <label htmlFor="props.id">Label</label>
        <div className="au-c-input__contain">
          <input
            onChange={e => this.updateName(e.target.value)}
            className="au-c-text-input au-c-text-input--smaller"
            type="text"
            id="props.id"
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
      <div className="au-c-image-sequence-answer__image">
        <img src={url} alt="" />
      </div>
    </div>
  );
}

ImageOption.propTypes = {
  deleteChoice: React.PropTypes.func,
  id: React.PropTypes.string,
  activeChoice: React.PropTypes.string,
  text: React.PropTypes.string,
  order: React.PropTypes.number,
  numChoices: React.PropTypes.number.isRequired,
};
