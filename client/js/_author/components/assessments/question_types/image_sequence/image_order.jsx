import React            from 'react';


export default function ImageOrder(props) {
  return (
    <div className="au-c-image-sequence__answers au-o-row">
      <div className="au-o-quarter">
        <div className="au-c-image-sequence-answer is-active" tabIndex="0">
          <div className="au-c-image-sequence-answer__top">
            <div className="au-c-dropdown au-c-dropdown--tiny">
              <label htmlFor=""></label>
              <select name="" id="">
                <option value="">N/A</option>
                <option value="">1</option>
                <option value="">2</option>
                <option value="">3</option>
                <option value="">4</option>
                <option value="">5</option>
              </select>
            </div>
            <button className="au-c-answer--delete au-u-right">
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="au-c-input au-c-input-label--left">
            <label htmlFor="">Label</label>
            <div className="au-c-input__contain">
              <input className="au-c-text-input au-c-text-input--smaller" type="text" />
              <div className="au-c-input__bottom"></div>
            </div>
          </div>
          <div className="au-c-image-sequence-answer__image">
            <img src="img/CLIx-logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="au-o-quarter">
        <div className="au-c-image-sequence-answer" tabIndex="0">
          <div className="au-c-dropdown au-c-dropdown--tiny">
            <label htmlFor=""></label>
            <select name="" id="">
              <option value="">N/A</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
          <div className="au-c-input au-c-input-label--left">
            <label htmlFor="">Label</label>
            <div className="au-c-input__contain">
              <input className="au-c-text-input au-c-text-input--smaller" type="text" />
              <div className="au-c-input__bottom"></div>
            </div>
          </div>
          <div className="au-c-image-sequence-answer__image">
            <img src="img/CLIx-logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="au-o-quarter">
        <div className="au-c-image-sequence-answer" tabIndex="0">
          <div className="au-c-dropdown au-c-dropdown--tiny">
            <label htmlFor=""></label>
            <select name="" id="">
              <option value="">N/A</option>
              <option value="">1</option>
              <option value="">2</option>
              <option value="">3</option>
              <option value="">4</option>
              <option value="">5</option>
            </select>
          </div>
          <div className="au-c-input au-c-input-label--left">
            <label htmlFor="">Label</label>
            <div className="au-c-input__contain">
              <input className="au-c-text-input au-c-text-input--smaller" type="text" />
              <div className="au-c-input__bottom"></div>
            </div>
          </div>
          <div className="au-c-image-sequence-answer__image">
            <img src="img/CLIx-logo.png" alt="" />
          </div>
        </div>
      </div>
      <div className="au-o-quarter">
        <div className="au-c-image-sequence-answer-add">
          <button className="au-c-image-sequence-answer-add__button">
            Add Image
          </button>
        </div>
      </div>
    </div>
  );
}
