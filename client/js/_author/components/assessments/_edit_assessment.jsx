import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';

import hashHistory            from '../../history';
import { transformAssessment } from '../../selectors/assessment';
import Heading                from  '../common/heading';
import AssessmentForm         from './assessment_form';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select(state, props) {
  const bankId = encodeURIComponent(props.params.bankId);
  const id = encodeURIComponent(props.params.id);
  const bankAssessments = state.assessments[bankId];
  const assessmentItemIds = state.assessmentItems[id];

  return {
    assessment: (bankAssessments && transformAssessment(bankAssessments[id])) || {},
    items: _.compact(_.at(state.items[bankId], assessmentItemIds)),
    settings: state.settings,
    banks: state.banks,
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
      assessmentOffered: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    }),
    settings: React.PropTypes.shape({
      editableBankId: React.PropTypes.string,
      publishedBankId: React.PropTypes.string
    }),
    editOrPublishAssessment: React.PropTypes.func.isRequired,
    updatePath: React.PropTypes.func.isRequired,
    getItems: React.PropTypes.func.isRequired,
    banks: React.PropTypes.shape({}).isRequired,
    deleteAssignedAssessment: React.PropTypes.func.isRequired,
    createAssessmentOffered: React.PropTypes.func.isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    updateSingleItemOrPage: React.PropTypes.func.isRequired,
    updateAssessmentItems: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
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
    if (confirm('Are you sure you want to delete this item?')) {
      this.props.deleteAssessmentItem(
        this.props.params.bankId,
        this.props.params.id,
        itemId,
      );
    }
  }

  createItem(newItem) {
    this.props.createItemInAssessment(
      this.props.params.bankId,
      this.props.params.id,
      _.map(this.props.items, 'id'),
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

  updateSingleItemOrPage(setSinglePage) {
    const { settings, assessment } = this.props;
    const { assessmentOffered } = assessment;
    const genusTypeId = setSinglePage ? settings.single_page : settings.one_item_per_page;
    this.props.updateSingleItemOrPage(assessmentOffered[0], genusTypeId);
  }

  flattenBanks(banks, flatBanks) {
    _.forEach(banks, (bank) => {
      flatBanks[bank.id] = bank;
      if (!_.isEmpty(bank.childNodes)) {
        return this.flattenBanks(bank.childNodes, flatBanks);
      }
    });
    return flatBanks;
  }

  getBankChildren(bankId) {
    let flatBanks = {};
    const banks = this.flattenBanks(this.props.banks, flatBanks);

    this.props.updatePath(bankId, banks[bankId], true);
    this.props.getAssessments(bankId);
    this.props.getItems(bankId);
    hashHistory.push('/');
  }

  render() {
    const { assessment, settings } = this.props;
    const isPublished =  assessment ? _.includes(assessment.assignedBankIds, settings.publishedBankId) : false;
    const publishedAndOffered = isPublished && !_.isUndefined(assessment.assessmentOffered);
    return (
      <div>
        <Heading
          view="assessments"
          editOrPublishAssessment={(published) => { this.editOrPublishAssessment(published); }}
          isPublished={isPublished}
          assessment={this.props.assessment}
          items={this.props.items}
          getBankChildren={bankId => this.getBankChildren(bankId)}
        />
        <AssessmentForm
          bankId={this.props.params.bankId}
          publishedAndOffered={publishedAndOffered}
          updateSingleItemOrPage={setSinglePage => this.updateSingleItemOrPage(setSinglePage)}
          {...this.props.assessment}
          updateAssessment={newFields => this.updateAssessment(newFields)}
          updateItemOrder={itemIds => this.updateItemOrder(itemIds)}
          items={this.props.items}
          createItem={newItem => this.createItem(newItem)}
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
