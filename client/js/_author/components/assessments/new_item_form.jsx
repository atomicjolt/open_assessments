import React      from 'react';
import _          from 'lodash';
import types      from '../../../constants/question_types';
import typeNames  from '../../../constants/question_names';
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
      language: languages.languageTypeId.english,
      question: {
        type: types.multipleChoice,
      }
    };
  }

  updateType(type) {
    this.setState({ type, question: { ...this.state.question, type } });
  }

  updateName(name) {
    this.setState({ name });
  }

  render() {
    return (
      <div className="au-o-item au-c-question is-active">
        <div className="au-o-item__top">
          <div className="au-o-left">
            <h3 className="au-c-question__number">Add Question</h3>
          </div>
        </div>

        <div className="au-c-question__content">

          <div className="au-o-row">
            <div className="au-o-half">
              <div className="au-c-input au-c-input-label--left au-c-input-label--large">
                <label htmlFor="name2">Name</label>
                <div className="au-c-input__contain">
                  <input
                    onChange={e => this.updateName(e.target.value)}
                    className="au-c-text-input au-c-text-input--small"
                    id="name2"
                    type="text"
                  />
                  <div className="au-c-input__bottom" />
                </div>
              </div>
            </div>

            <div className="au-o-half">
              <div className="au-c-input">
                <label htmlFor="questionType" />
                <div className="au-c-dropdown au-c-dropdown--medium">
                  <select
                    defaultValue={this.state.type}
                    onChange={e => this.updateType(e.target.value)}
                    name=""
                    id="questionType"
                  >
                    {
                      _.map(types, type => (
                        <option key={`new_item_${type}`} value={type}>
                          {typeNames[type]}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="au-o-flex-contain au-c-question-add__buttons">
            <div className="au-o-right au-u-right">
              <button
                onClick={this.props.cancel}
                className="au-c-btn au-c-btn--md au-c-btn--gray"
              >
                Cancel
              </button>
              <button
                onClick={() => this.props.create(this.state)}
                className="au-c-btn au-c-btn--md au-c-btn--maroon au-u-ml-md"
              >
                Save New Question
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
