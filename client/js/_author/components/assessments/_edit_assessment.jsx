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
  const bankId = encodeURIComponent(props.params.bankId);
  const id = encodeURIComponent(props.params.id);
  const bank = state.assessments[bankId];
  const assessmentItemIds = state.assessmentItems[id];

  return {
    assessment: bank && transformAssessment(bank[id]),
    items: _.compact(_.at(state.items[bankId], assessmentItemIds)),
    settings: state.settings,
    currentAssessment: (bank && bank[id]) || {},
    params: { // override react router because we want the escaped ids
      bankId,
      id,
    }
  };
}

export class EditAssessment extends React.Component {
  static propTypes = {
    params: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string
    }).isRequired,
    assessment: React.PropTypes.shape({
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
      items: React.PropTypes.arrayOf(React.PropTypes.shape),
    }),
    currentAssessment: React.PropTypes.shape({
      assignedBankIds: React.PropTypes.array,
    }),
    settings: React.PropTypes.shape({
      editableBankId: React.PropTypes.string,
      publishedBankId: React.PropTypes.string
    }),
    editOrPublishAssessment: React.PropTypes.func.isRequired,
    deleteAssignedAssessment: React.PropTypes.func.isRequired,
    createAssessmentOffered: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    updateAssessmentItems: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    updateChoice: React.PropTypes.func.isRequired,
    updateAnswer: React.PropTypes.func.isRequired,
    deleteAssessmentItem: React.PropTypes.func,
  };

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
    this.props.getAssessmentItems(
      this.props.params.bankId,
      this.props.params.id
    );
  }

  updateAssessment(newFields) {
    const updated = { id: this.props.params.id, ...newFields };
    this.props.updateAssessment(this.props.params.bankId, updated);
  }

  updateItem(item) {
    this.props.updateItem(this.props.params.bankId, item);
  }

  deleteAssessmentItem(itemId) {
    this.props.deleteAssessmentItem(
      this.props.params.bankId,
      this.props.params.id,
      itemId,
    );
  }

  createItem(newItem) {
    this.props.createItemInAssessment(
      this.props.params.bankId,
      this.props.params.id,
      _.map(this.props.assessment.items, 'id'),
      newItem,
    );
  }

  updateItemOrder(itemIds) {
    this.props.updateAssessmentItems(
      this.props.params.bankId,
      this.props.params.id,
      itemIds
    );
  }

  editOrPublishAssessment(published) {
    const { assessment, settings } = this.props;
    if (published) {
      this.props.deleteAssignedAssessment(assessment, settings.publishedBankId);
      this.props.editOrPublishAssessment(assessment, settings.editableBankId);
    } else {
      if (_.includes(assessment.assignedBankIds, this.props.settings.editableBankId)) {
        this.props.deleteAssignedAssessment(assessment, settings.editableBankId);
      }
      if (_.isEmpty(assessment.assessmentOffered) && !_.isEmpty(this.props.items)) {
        this.props.createAssessmentOffered(assessment.bankId, assessment.id);
      }
      this.props.editOrPublishAssessment(assessment, settings.publishedBankId);
    }
  }

  render() {
    const { bankId } = this.props.params;
    const { currentAssessment, settings } = this.props;
    const isPublished =  _.includes(currentAssessment.assignedBankIds, settings.publishedBankId);

    return (
      <div>
        <Heading
          view="assessments"
          editOrPublishAssessment={(published) => { this.editOrPublishAssessment(published); }}
          isPublished={isPublished}
          items={this.props.items}
        />
        <AssessmentForm
          {...this.props.assessment}
          updateAssessment={newFields => this.updateAssessment(newFields)}
          updateItemOrder={itemIds => this.updateItemOrder(itemIds)}
          items={this.props.items}
          updateItem={item => this.updateItem(item)}
          createItem={newItem => this.createItem(newItem)}
          updateChoice={(itemId, choice) => this.props.updateChoice(bankId, itemId, choice)}
          updateAnswer={(itemId, answer) => this.props.updateAnswer(bankId, itemId, answer)}
          deleteAssessmentItem={itemId => this.deleteAssessmentItem(itemId)}
        />
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(EditAssessment);
