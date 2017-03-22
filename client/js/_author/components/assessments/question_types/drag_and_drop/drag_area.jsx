import React      from 'react';
import assets     from '../../../../../libs/assets';

export default function (props) {
  console.log(props);
  const logo = assets('./_author/images/CLIx-logo.png');

  return (
    <div className="au-c-drop-zone__answers au-o-row">

      {
        _.map(props.dragObjects, object => (
          <div className="au-o-quarter">
            <div className="au-c-drop-zone-answer is-active" tabIndex="0">

              <div className="au-c-dropdown au-c-dropdown--small">
                <label htmlFor="" />
                <select name="" id="">
                  <option value="">Drop A</option>
                  <option value="">Snap B</option>
                </select>
              </div>

              <div className="au-c-input au-c-input-label--left">
                <label htmlFor="">Label</label>
                <div className="au-c-input__contain">
                  <input className="au-c-text-input au-c-text-input--smaller" type="text" />
                  <div className="au-c-input__bottom" />
                </div>
              </div>

              <div className="au-c-drop-zone-answer__image">
                <img src={logo} alt="" />
              </div>
            </div>
          </div>
        ))
      }

      <div className="au-o-quarter">
        <div className="au-c-drop-zone-answer" tabIndex="0">

          <div className="au-c-dropdown au-c-dropdown--small">
            <label htmlFor="" />
            <select name="" id="">
              <option value="">Drop A</option>
              <option value="">Snap B</option>
            </select>
          </div>

          <div className="au-c-input au-c-input-label--left">
            <label htmlFor="">Label</label>
            <div className="au-c-input__contain">
              <input className="au-c-text-input au-c-text-input--smaller" type="text" />
              <div className="au-c-input__bottom" />
            </div>
          </div>

          <div className="au-c-drop-zone-answer__image">
            <img src={logo} alt="" />
          </div>
        </div>
      </div>

      <div className="au-o-quarter">
        <div className="au-c-drop-zone-answer-add">

          <button className="au-c-drop-zone-answer-add__button">
            Add Image
          </button>

        </div>
      </div>

    </div>
  );
}