import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';
import Heading                from  '../common/heading';
import AssessmentForm         from './assessment_form';
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
    items: _.at(state.items[props.params.bankId], assessmentItemIds),
    currentAssessment: state.assessments[encodeURIComponent(props.params.bankId)][encodeURIComponent(props.params.id)]
  };
}

export class NewAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }).isRequired,
    assessment: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }),
    assignedAssessment: React.PropTypes.func.isRequired,
    deleteAssignedAssessment: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
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

  assignedAssessment(published) {
    const { assessment } = this.props;
    const editBankId = 'assessment.Bank%3A588f9225c89cd977c3560780%40ODL.MIT.EDU';
    const publishedBankId = 'assessment.Bank%3A588f9240c89cd977c3560781%40ODL.MIT.EDU';
    if (published) {
      this.props.deleteAssignedAssessment(assessment, publishedBankId);
      // Need to delete the publishedBankId and then add the editBankId
      this.props.assignedAssessment(assessment, editBankId);
    } else {
      this.props.deleteAssignedAssessment(assessment, editBankId);
      // Need to delete the editBankId and then add the publishedBankId
      this.props.assignedAssessment(assessment, publishedBankId);
    }
  }

  render() {
    // debugger
    const publishedBankId = 'assessment.Bank%3A588f9240c89cd977c3560781%40ODL.MIT.EDU';
    const isPublished = _.findIndex(this.props.currentAssessment.assignedBankIds, (id) => { return id === publishedBankId; }) !== -1 ? true : false;
    return (
      <div>
        <Heading
          view="assessments"
          assignedAssessment={(published) => { this.assignedAssessment(published); }}
          isPublished={isPublished}
        />
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
