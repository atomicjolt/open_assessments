import React           from 'react';
import _               from 'lodash';
import AssessmentItems from './assessment_items';
import NewItem         from './new_item_form';

export default class AssessmentForm extends React.Component {
  static propTypes = {
    items: React.PropTypes.oneOfType(
      [React.PropTypes.shape({}), React.PropTypes.arrayOf(React.PropTypes.shape({}))]
    ),
    name: React.PropTypes.string,
    editItem: React.PropTypes.func.isRequired,
    addItem: React.PropTypes.func.isRequired,
    updateStateAssessment: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingAssessment: false,
    };
  }

  createItem(newItem) {
    // console.log(newItem);
    // TODO: actually create the thing
    this.setState({ addingAssessment: false });
  }

  showNewModal() {
    return this.state.addingAssessment || _.isEmpty(this.props.items);
  }

  render() {
    return (
      <div className="o-contain">
        <div className="o-item">
          <div className="o-item__top">
            <div className="c-checkbox u-right">
              <input type="checkbox" id="check01" name="check" />
              <label htmlFor="check01">Single page assessment</label>
            </div>
          </div>
          <div className="c-assessment-title">
            <label htmlFor="title_field" className="c-input">
              <div className="c-input__contain">
                <input
                  value={this.props.name}
                  className="c-text-input c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder="Untitled Assessment"
                  onChange={e => this.props.updateStateAssessment('name', e.target.value)}
                  onBlur={e => this.props.updateAssessment('name', e.target.value)}
                />
                <div className="c-input__bottom" />
              </div>
            </label>
          </div>
        </div>
        <AssessmentItems
          items={this.props.items}
          editItem={(itemIndex, field, data) =>
            this.props.editItem(itemIndex, field, data)}
          addItem={() => this.props.addItem()}
        />
        <div className="c-question-add">
          <button
            onClick={() => this.setState({ addingAssessment: true })}
            className="c-question-add__button"
          >
            Add Question
          </button>
        </div>

        {this.showNewModal() ? <NewItem
          cancel={() => this.setState({ addingAssessment: false })}
          create={newItem => this.createItem(newItem)}
        /> : null}
      </div>
    );
  }
}
