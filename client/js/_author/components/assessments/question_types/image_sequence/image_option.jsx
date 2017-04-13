import React        from 'react';
import _            from 'lodash';
import localize     from '../../../../locales/localize';

function imageOption(props) {
  const { activateChoice, updateChoice, deleteChoice, id, order, numChoices } = props;
  const strings = props.localizeStrings('imageOption');
  return (
    <div
      className="au-c-image-sequence-answer is-active"
      tabIndex="0"
      onClick={() => activateChoice(id)}
    >
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
            <option key="option_key_null" value={null}>{strings.NA}</option>
            {
              _.map(_.range(1, numChoices + 1), (val, index) =>
                <option key={`option_key_${index}`} value={val}>{ val }</option>
              )
            }
          </select>
        </div>
        <button className="au-c-answer--delete au-u-right" onClick={() => deleteChoice(props)}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div className="au-c-input au-c-input-label--left">
        <label htmlFor={`label_${id}`}>Label</label>
        <div className="au-c-input__contain">
          <input
            defaultValue={props.labelText}
            onBlur={e => props.updateChoice({ labelText: e.target.value }, null)}
            className="au-c-text-input au-c-text-input--smaller"
            type="text"
            id={`label_${id}`}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
      <div className="au-c-image-sequence-answer__image">
        <img src={props.text} alt="" />
      </div>
    </div>
  );
}

imageOption.propTypes = {
  deleteChoice: React.PropTypes.func,
  updateChoice: React.PropTypes.func,
  activateChoice: React.PropTypes.func,
  id: React.PropTypes.string,
  text: React.PropTypes.string,
  labelText: React.PropTypes.string,
  order: React.PropTypes.number,
  numChoices: React.PropTypes.number.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
};

export default localize(imageOption);
