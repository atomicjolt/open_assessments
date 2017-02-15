import React           from 'react';
import _               from 'lodash';
import AssessmentItems from './assessment_items';
import NewItem         from './new_item_form';
import AddQuestion     from './add_question_button';

export default class AssessmentForm extends React.Component {
  static propTypes = {
    items: React.PropTypes.oneOfType(
      [React.PropTypes.shape({}), React.PropTypes.arrayOf(React.PropTypes.shape({}))]
    ),
    name: React.PropTypes.string,
    updateAssessment: React.PropTypes.func.isRequired,
    createItem: React.PropTypes.func,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    updateAnswer: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = {
      addingAssessment: false,
    };
  }

  createItem(newItem) {
    this.props.createItem(newItem);
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
                  defaultValue={this.props.name}
                  className="c-text-input c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder="Untitled Assessment"
                  onBlur={e => this.props.updateAssessment({ name: e.target.value })}
                />
                <div className="c-input__bottom" />
              </div>
            </label>
          </div>
        </div>
        <AssessmentItems
          items={this.props.items}
          updateItem={this.props.updateItem}
          updateChoice={this.props.updateChoice}
          updateAnswer={this.props.updateAnswer}
          deleteAssessmentItem={this.props.deleteAssessmentItem}
        />

        {this.showNewModal() ? <NewItem
          cancel={() => this.setState({ addingAssessment: false })}
          create={newItem => this.createItem(newItem)}
        /> : <AddQuestion newItem={() => this.setState({ addingAssessment: true })} />}
      </div>
    );
  }
}
