import React                  from 'react';
import { connect }            from 'react-redux';
import _                      from 'lodash';

import hashHistory                from '../../history';
import  * as assessmentSelectors  from '../../selectors/assessment';
import Heading                    from  '../common/heading';
import AssessmentForm             from './assessment_form';
import * as BankActions           from '../../../actions/qbank/banks';
import * as AssessmentActions     from '../../../actions/qbank/assessments';
import * as ItemActions           from '../../../actions/qbank/items';
import localize               from '../../locales/localize';

function select(state, props) {
  return {
    assessment: assessmentSelectors.assessment(state, props),
    items: assessmentSelectors.items(state, props),
    settings: assessmentSelectors.settings(state, props),
    banks: assessmentSelectors.banks(state, props),
    isPublished: assessmentSelectors.isPublished(state, props),
    params: { // override react router because we want the escaped ids
      bankId: assessmentSelectors.bankId(state, props),
      id: assessmentSelectors.id(state, props),
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
      assessmentOffered: React.PropTypes.shape({}),
      items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    }),
    settings: React.PropTypes.shape({
      editableBankId: React.PropTypes.string,
      publishedBankId: React.PropTypes.string
    }),
    updatePath: React.PropTypes.func.isRequired,
    banks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    getAssessments: React.PropTypes.func.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    updateSingleItemOrPage: React.PropTypes.func.isRequired,
    updateAssessmentItems: React.PropTypes.func.isRequired,
    getAssessmentItems: React.PropTypes.func.isRequired,
    createItemInAssessment: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    togglePublishAssessment: React.PropTypes.func.isRequired,
    items: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    deleteAssessmentItem: React.PropTypes.func,
    isPublished: React.PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.getAssessments(this.props.params.bankId);
    this.props.getAssessmentItems(
      this.props.params.bankId,
      this.props.params.id
    );
  }


  getBankChildren(bankId) {
    const flatBanks = {};
    const banks = this.flattenBanks(this.props.banks, flatBanks);
    this.props.updatePath(bankId, banks[bankId], true);
    this.props.getAssessments(bankId);
    hashHistory.push('/');
  }

  deleteAssessmentItem(itemId) {
    const strings = this.props.localizeStrings('editAssessment');
    if (confirm(strings.confirm)) {
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

  updateSingleItemOrPage(setSinglePage) {
    const { settings, assessment } = this.props;
    const { assessmentOffered } = assessment;
    const genusTypeId = setSinglePage ? settings.single_page : settings.one_item_per_page;
    this.props.updateSingleItemOrPage(assessmentOffered[0], genusTypeId);
  }

  flattenBanks(banks, flatBanks) {
    _.forEach(banks, (bank) => {
      flatBanks[bank.id] = bank; // eslint-disable-line no-param-reassign
      if (!_.isEmpty(bank.childNodes)) {
        this.flattenBanks(bank.childNodes, flatBanks);
      }
    });
    return flatBanks;
  }

  updateItem(item) {
    this.props.updateItem(this.props.params.bankId, item);
  }

  updateAssessment(newFields) {
    const updated = { id: this.props.params.id, ...newFields };
    this.props.updateAssessment(this.props.params.bankId, updated);
  }

  render() {
    const { assessment, isPublished } = this.props;
    const publishedAndOffered = isPublished && !_.isUndefined(assessment.assessmentOffered);
    return (
      <div>
        <Heading
          view="assessments"
          togglePublishAssessment={
            () => this.props.togglePublishAssessment(this.props.assessment)
          }
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
})(localize(EditAssessment));
