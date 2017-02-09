import React                  from 'react';
import { connect }            from 'react-redux';
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
  return {
    assessment: bank && transformAssessment(bank[encodeURIComponent(props.params.id)])
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
      assessment: {
      },
    };
  }

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
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

  addItem() {
    const items = this.state.items;
    items.push({ bankId: this.props.params.id, choices: [{}] });
    this.setState({ items });
  }

  render() {
    return (
      <AssessmentForm
        {...{ ...this.props.assessment, ...this.state.assessment }}
        updateAssessment={() => this.updateAssessment()}
        updateStateAssessment={(field, value) => this.updateStateAssessment(field, value)}
      />
    );
  }
}
// { this.titleField.value }
export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(NewAssessment);
