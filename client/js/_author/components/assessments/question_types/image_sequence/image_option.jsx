import React   from 'react';

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
            >
              <option value={null}>N/A</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <button className="au-c-answer--delete au-u-right" onClick={() => props.deleteChoice(props)}>
            <i className="material-icons">close</i>
          </button>
        </div>
        : null
      }
      <div className="au-c-input au-c-input-label--left">
        <label htmlFor="">Label</label>
        <div className="au-c-input__contain">
          <input className="au-c-text-input au-c-text-input--smaller" type="text" />
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
};
