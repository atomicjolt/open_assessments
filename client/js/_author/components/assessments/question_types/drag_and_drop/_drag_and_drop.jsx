import React        from 'react';

export default class DragAndDrop extends React.Component {
  static propTypes = {};

  constructor() {
    super();
  }


  // TODO: Bust into components
  render() {
    return (
      <div className="c-question__content">
        <div className="c-input c-question-text">
          <label htmlFor="" />
          <div className="c-input__contain">
            <input className="c-text-input c-text-input--medium c-wysiwyg" type="text" placeholder="Question Text" />
            <div className="c-input__bottom" />
          </div>
        </div>

        <div className="c-drag-and-drop__target-area">
          <div className="o-item__top">
            <div className="o-left">
              <div className="c-question__type">Target Image</div>
            </div>

            <div className="o-right">
              <button className="c-btn c-btn--sm c-btn--gray">Replace Image</button>
              <ul className="c-button-dropdown u-ml-sm">
                <li>
                  <button className="c-btn c-btn--sm c-btn--dropdown">Add Snap Zone<i className="material-icons">arrow_drop_down</i></button>
                  <ul className="c-button-dropdown__dropdown is-active">
                    <li>
                      <button className="c-btn c-btn--sm c-btn--dropdown-item"><i className="material-icons">open_in_new</i>by region</button>
                    </li>
                    <li>
                      <button className="c-btn c-btn--sm c-btn--dropdown-item"><i className="material-icons">image</i>by image</button>
                    </li>
                  </ul>
                </li>
              </ul>
              <ul className="c-button-dropdown u-ml-sm">
                <li>
                  <button className="c-btn c-btn--sm c-btn--dropdown">Add Drop Zone<i className="material-icons">arrow_drop_down</i></button>
                  <ul className="c-button-dropdown__dropdown">
                    <li>
                      <button className="c-btn c-btn--sm c-btn--dropdown-item"><i className="material-icons">open_in_new</i>by region</button>
                    </li>
                    <li>
                      <button className="c-btn c-btn--sm c-btn--dropdown-item"><i className="material-icons">image</i>by image</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <div className="c-drag-and-drop__target-image">
            <div className="c-drop-zone c-zone1 is-active">

              <div className="c-drop-zone__tag">Drop A</div>

              <div className="c-drop-zone__tool-tip is-right">
                <div className="c-input c-input-label--left c-input--white">
                  <label htmlFor="">Label</label>
                  <div className="c-input__contain">
                    <input className="c-text-input c-text-input--smaller" type="text" />
                      <div className="c-input__bottom" />
                  </div>
                </div>
                <button className="c-btn c-btn--square"><i className="material-icons">delete</i></button>
              </div>

            </div>

            <div className="c-drop-zone c-zone2">
              <div className="c-drop-zone__tag">Snap B</div>
              <div className="c-drop-zone__tool-tip is-right">
                <div className="c-input c-input-label--left c-input--white">
                  <label htmlFor="">Label</label>
                  <div className="c-input__contain">
                    <input className="c-text-input c-text-input--smaller" type="text" />
                    <div className="c-input__bottom" />
                  </div>
                </div>
                <button className="c-btn c-btn--square"><i className="material-icons">delete</i></button>
              </div>
            </div>
          </div>

        </div>

        <div className="c-drop-zone__answers__label">Draggable answers</div>

        <div className="c-drop-zone__answers o-row">

          <div className="o-quarter">
            <div className="c-drop-zone-answer is-active" tabindex="0">

              <div className="c-dropdown c-dropdown--small">
                <label htmlFor="" />
                <select name="" id="">
                  <option value="">Drop A</option>
                  <option value="">Snap B</option>
                </select>
              </div>

              <div className="c-input c-input-label--left">
                <label htmlFor="">Label</label>
                <div className="c-input__contain">
                  <input className="c-text-input c-text-input--smaller" type="text" />
                  <div className="c-input__bottom" />
                </div>
              </div>

              <div className="c-drop-zone-answer__image">
                <img src="img/CLIx-logo.png" alt="" />
              </div>
            </div>
          </div>

          <div className="o-quarter">
            <div className="c-drop-zone-answer" tabindex="0">

              <div className="c-dropdown c-dropdown--small">
                <label htmlFor="" />
                <select name="" id="">
                  <option value="">Drop A</option>
                  <option value="">Snap B</option>
                </select>
              </div>

              <div className="c-input c-input-label--left">
                <label htmlFor="">Label</label>
                <div className="c-input__contain">
                  <input className="c-text-input c-text-input--smaller" type="text" />
                  <div className="c-input__bottom" />
                </div>
              </div>

              <div className="c-drop-zone-answer__image">
                <img src="img/CLIx-logo.png" alt="" />
              </div>
            </div>
          </div>

          <div className="o-quarter">
            <div className="c-drop-zone-answer" tabindex="0">

              <div className="c-dropdown c-dropdown--small">
                <label htmlFor="" />
                <select name="" id="">
                  <option value="">Drop A</option>
                  <option value="">Snap B</option>
                </select>
              </div>

              <div className="c-input c-input-label--left">
                <label htmlFor="">Label</label>
                <div className="c-input__contain">
                  <input className="c-text-input c-text-input--smaller" type="text" />
                  <div className="c-input__bottom" />
                </div>
              </div>

              <div className="c-drop-zone-answer__image">
                <img src="img/CLIx-logo.png" alt="" />
              </div>
            </div>
          </div>

          <div className="o-quarter">
            <div className="c-drop-zone-answer-add">

              <button className="c-drop-zone-answer-add__button">
                Add Image
              </button>

            </div>
          </div>

        </div>

        <div className="c-question__feedback">
          <div className="c-input c-input-label--left c-feedback">
            <label htmlFor="feedbackCorrect">Correct Feedback</label>
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedbackCorrect" type="text" />
              <div className="c-input__bottom" />
            </div>
          </div>
          <div className="c-input c-input-label--left c-feedback u-mt-sm">
            <label htmlFor="feedbackIncorrect">Incorrect Feedback</label>
            <div className="c-input__contain">
              <input className="c-text-input c-text-input--smaller c-wysiwyg" id="feedbackIncorrect" type="text" />
              <div className="c-input__bottom" />
            </div>
          </div>
        </div>

      </div>
    );
  }
}
