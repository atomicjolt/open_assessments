import React            from 'react';
import ImageOption      from './image_option';
import AddImage         from './add_image';


export default function ImageOrder(props) {
  return (
    <div className="au-c-image-sequence__answers au-o-row">
      <div className="au-o-quarter">
        <ImageOption />
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
            <img src="https://qbank-clix-dev.mit.edu/api/v1/repository/repositories/repository.Repository%3A577fcf75c89cd90cbd5616f8%40ODL.MIT.EDU/assets/repository.Asset%3A58c9ac60c89cd95fd2346ed9%40ODL.MIT.EDU/contents/repository.AssetContent%3A58c9ac60c89cd95fd2346edb%40ODL.MIT.EDU/stream" alt="" />
          </div>
        </div>
      </div>
      <div className="au-o-quarter">
        <AddImage />
      </div>
    </div>
  );
}
