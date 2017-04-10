import React      from 'react';
import _          from 'lodash';
import types      from '../../../constants/question_types';
import languages  from '../../../constants/language_types';
import localize   from '../../locales/localize';

class NewItemForm extends React.Component {
  static propTypes = {
    cancel: React.PropTypes.func.isRequired,
    create: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired
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
    const strings = this.props.localizeStrings('newItemForm');
    return (
      <div className="au-o-item au-c-question is-active">
        <div className="au-o-item__top">
          <div className="au-o-left">
            <div className="au-c-question__number" />
            <div className="au-c-question__type">{strings.addQuestion}</div>
          </div>
        </div>

        <div className="au-c-question__content">

          <div className="au-o-row">
            <div className="au-o-half">
              <div className="au-c-input au-c-input-label--left au-c-input-label--large">
                <label htmlFor="name2">{strings.name}</label>
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
                          {strings[type]}
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
                {strings.cancel}
              </button>
              <button
                onClick={() => this.props.create(this.state)}
                className="au-c-btn au-c-btn--md au-c-btn--maroon au-u-ml-md"
              >
                {strings.saveNewQuestion}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default localize(NewItemForm);
