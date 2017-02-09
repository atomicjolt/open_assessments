import React                  from 'react';
import { connect }            from 'react-redux';
import AssessmentItems        from './assessment_items';
import { colors, buttonStyle }  from '../../defines';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select() {
  return {

  };
}
export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({ id: React.PropTypes.string }).isRequired,
    createAssessment: React.PropTypes.func.isRequired,
  };

  static styles = {
    button: {
      backgroundColor : colors.primaryPurple,
      height          : '100%',
      verticalAlign   : 'middle',
      margin          : '7px 15px',
      padding         : '5px 40px',
    },
  };

  constructor(props) {
    super(props);
    this.titleField = null;
    this.state = {
      items: []
    };
  }

  createAssessment() {
    this.props.createAssessment(
      this.props.params.id,
      {
        name: `${this.titleField.value}`,
        items: this.state.items,
      }
    );
  }

  saveButton() {
    return (
      <button
        style={{ ...buttonStyle, ...NewAssessment.styles.button }}
        onClick={() => this.createAssessment()}
      >
        Save Assessment
      </button>
    );
  }

  editItem(itemIndex, field, data) {
    const items = this.state.items;
    items[itemIndex][field] = data;
    this.setState({ items });
  }

  addItem() {
    const items = this.state.items;
    items.push({ bankId: this.props.params.id, choices: [{}] });
    this.setState({ items });
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
                  className="c-text-input c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder="Untitled Assessment"
                  ref={(e) => { this.titleField = e; }}
                />
                <div className="c-input__bottom" />
              </div>
            </label>
          </div>
        </div>
        {this.saveButton()}
        <AssessmentItems
          items={this.state.items}
          editItem={(itemIndex, field, data) =>
            this.editItem(itemIndex, field, data)}
          addItem={() => this.addItem()}
        />
      </div>

    );

  }
}
// { this.titleField.value }
export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(NewAssessment);
