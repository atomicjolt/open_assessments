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
      <div className="author--o-item author--c-question is-active">
        <div className="author--o-item__top">
          <div className="author--o-left">
            <h3 className="author--c-question__number">Add Question</h3>
          </div>
        </div>

        <div className="author--c-question__content">

          <div className="author--o-row">
            <div className="author--o-half">
              <div className="author--c-input author--c-input-label--left author--c-input-label--large">
                <label htmlFor="name2">Name</label>
                <div className="author--c-input__contain">
                  <input
                    onChange={e => this.setState({ name: e.target.value })}
                    className="author--c-text-input author--c-text-input--small"
                    id="name2"
                    type="text"
                  />
                  <div className="author--c-input__bottom" />
                </div>
              </div>
            </div>

            <div className="author--o-half">
              <div className="author--c-input">
                <label htmlFor="questionType" />
                <div className="author--c-dropdown author--c-dropdown--medium">
                  <select
                    onChange={e => this.setState({ type: e.target.value })}
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

            <div className="author--o-half">
              <div className="author--c-input author--u-mt-md">
                <label htmlFor="questionType" />
                <div className="author--c-dropdown author--c-dropdown--medium">
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

          <div className="author--o-flex-contain author--c-question-add__buttons">
            <div className="author--o-right author--u-right">
              <button
                onClick={this.props.cancel}
                className="author--c-btn author--c-btn--md author--c-btn--gray"
              >
                Cancel
              </button>
              <button
                onClick={() => this.props.create(this.state)}
                className="author--c-btn author--c-btn--md author--c-btn--maroon author--u-ml-md"
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
