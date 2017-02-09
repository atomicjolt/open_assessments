import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';
import Heading                from  '../common/heading';
import AssessmentForm         from './assessment_form';
import { colors, buttonStyle }  from '../../defines';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function transformAssessment(assessment) {
  if (!assessment) return {};
  const fixedAssessment = {
    ...assessment,
    name: assessment.displayName.text,
  };

  return fixedAssessment;
}

function select(state, props) {
  const bank = state.assessments[encodeURIComponent(props.params.bankId)];
  const assessmentItemIds = state.assessmentItems[props.params.id];

  return {
    assessment: bank && transformAssessment(bank[encodeURIComponent(props.params.id)]),
    items: _.at(state.items[props.params.bankId], assessmentItemIds)
  };
}

export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }).isRequired,
    createAssessment: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
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
      assessment: {
      },
    };
  }

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
    this.props.getAssessmentItems(
      this.props.params.bankId,
      this.props.params.id
    );
  }

  updateAssessment() {
    this.props.updateAssessment(
      this.props.params.bankId,
      {
        name: this.state.assessment.name,
        description: this.state.assessment.description,
        id: this.props.params.id,
      },
    );
  }

  updateStateAssessment(field, value) {
    const assessment = this.state.assessment;
    assessment[field] = value;
    this.setState({ assessment });
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

  createItem(newItem) {
    this.props.createItemInAssessment(
      this.props.params.bankId,
      this.props.params.id,
      _.map(this.assessmentProps().items, 'id'),
      newItem,
    );
  }

  assessmentProps() {
    return { ...this.props.assessment, ...this.state.assessment };
  }

  render() {
    return (
      <div>
        <Heading view="assessments" />
        <AssessmentForm
          {...this.assessmentProps()}
          updateAssessment={() => this.updateAssessment()}
          updateStateAssessment={(field, value) => this.updateStateAssessment(field, value)}
          items={this.props.items}
          createItem={newItem => this.createItem(newItem)}
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
