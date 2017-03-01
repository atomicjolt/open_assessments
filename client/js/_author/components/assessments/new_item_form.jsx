import React      from 'react';
import types      from '../../../constants/question_types';
import languages  from '../../../constants/language_types';

export default class newItemForm extends React.Component {
  static propTypes = {
    cancel: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      name: '',
      type: types.multipleChoice,
      language: 'english',
    };
  }

  render() {
    return (
      <div className="o-item c-question is-active">
        <div className="o-item__top">
          <div className="o-left">
            <h3 className="c-question__number">Add Question</h3>
          </div>
        </div>

        <div className="c-question__content">

          <div className="o-row">
            <div className="o-half">
              <div className="c-input c-input-label--left c-input-label--large">
                <label htmlFor="name2">Name</label>
                <div className="c-input__contain">
                  <input
                    onChange={e => this.setState({ name: e.target.value })}
                    className="c-text-input c-text-input--small"
                    id="name2"
                    type="text"
                  />
                  <div className="c-input__bottom" />
                </div>
              </div>
            </div>

            <div className="o-half">
              <div className="c-input">
                <label htmlFor="questionType" />
                <div className="c-dropdown c-dropdown--medium">
                  <select
                    onChange={e => this.setState({ genusTypeId: e.target.value })}
                    name=""
                    id="questionType"
                  >
                    <option value={types.multipleChoice}>
                      Multiple Choice
                    </option>
                    <option value={types.shortAnswer}>
                      Short Answer
                    </option>
                    <option value={types.fileUpload}>
                      File Upload
                    </option>
                    <option value={types.audioUpload}>
                      Audio Upload
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="o-half">
              <div className="c-input u-mt-md">
                <label htmlFor="questionType" />
                <div className="c-dropdown c-dropdown--medium">
                  <select
                    onChange={e => this.setState({ language: e.target.value })}
                    name=""
                    id="questionType"
                  >
                    <option value={languages.english}>Select a language</option>
                    <option value={languages.english}>English</option>
                    <option value={languages.hindi}>Hindi</option>
                    <option value={languages.telugu}>Telugu</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="o-flex-contain c-question-add__buttons">
            <div className="o-right u-right">
              <button
                onClick={this.props.cancel}
                className="c-btn c-btn--md c-btn--gray"
              >
                Cancel
              </button>
              <button
                onClick={() => this.props.create(this.state)}
                className="c-btn c-btn--md c-btn--maroon u-ml-md"
              >
                Create New Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
