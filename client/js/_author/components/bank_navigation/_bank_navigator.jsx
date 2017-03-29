import React                  from 'react';
import _                      from 'lodash';
import { connect }            from 'react-redux';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';
import Heading                from '../common/heading';
import BankList               from './bank_list';
import  * as navigationSelectors from '../../selectors/bank_navigator';
import * as commonSelectors   from '../../selectors/common';

function select(state) {
  return {
    path: navigationSelectors.path(state),
    currentBankId: navigationSelectors.currentBankId(state),
    banks: navigationSelectors.banks(state),
    settings: commonSelectors.settings(state),
    assessments: navigationSelectors.bankAssessments(state),
  };
}

export class BankNavigator extends React.Component {
  static propTypes = {
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    settings: React.PropTypes.shape({
      editableBankId: React.PropTypes.string,
      publishedBankId: React.PropTypes.string,
      baseEmbedUrl       : React.PropTypes.string,
    }),
    path               : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    updatePath         : React.PropTypes.func.isRequired,
    getAssessments     : React.PropTypes.func.isRequired,
    getAssessmentOffered     : React.PropTypes.func.isRequired,
    getItems           : React.PropTypes.func.isRequired,
    createAssessment   : React.PropTypes.func.isRequired,
    deleteAssessment   : React.PropTypes.func.isRequired,
    currentBankId      : React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      sortName      : null,
      sortPublished : null,
    };
  }

  getBankChildren(bankId) {
    const bank = _.find(this.props.banks, b => b.id === bankId);
    if (bank) { this.props.updatePath(bankId, bank); }
    this.props.getAssessments(bankId);
    this.props.getItems(bankId);
  }

  sortBy(type) {
    const sortVal = this.state[type];
    if (!sortVal) {
      this.setState({ [type]: 'asc' });
    } else if (sortVal === 'asc') {
      this.setState({ [type]: 'desc' });
    } else {
      this.setState({ [type]: null });
    }
  }

  sortBanks() {
    const { sortName, sortPublished } = this.state;
    if (!sortName && !sortPublished) { return this.props.banks; }

    let sortedBanks = this.props.banks;
    if (sortName) {
      sortedBanks = _.orderBy(sortedBanks, bank => _.lowerCase(bank.displayName.text), sortName);
    }
    if (sortPublished) {
      sortedBanks = _.orderBy(sortedBanks, bank => _.includes(bank.assignedBankIds, this.props.settings.publishedBankId), sortPublished);
    }
    return sortedBanks;
  }

  deleteAssessment(bankId, assessmentId) {
    this.props.deleteAssessment(bankId, assessmentId);
  }

  getEmbedCode(assessId, bankId) {
    // const assessment = this.props.currentBank[assessId];
    const assessment = this.props.assessments[assessId];
    const assessOffered = assessment.assessmentOffered ? assessment.assessmentOffered[0] : '';
    if (_.isEmpty(assessOffered)) {
      this.props.getAssessmentOffered(bankId, assessId);
    }
  }

  render() {
    const { createAssessment, currentBankId, updatePath, settings } = this.props;
    return (
      <div>
        <Heading
          view="banks"
          path={this.props.path}
          createAssessment={createAssessment}
          currentBankId={currentBankId}
          updatePath={updatePath}
          getBankChildren={bankId => this.getBankChildren(bankId)}
        />
        <BankList
          assessments={this.props.assessments}
          baseEmbedUrl={settings.baseEmbedUrl}
          banks={this.sortBanks()}
          getEmbedCode={(assessId, bankId) => { this.getEmbedCode(assessId, bankId); }}
          publishedBankId={settings.publishedBankId}
          getBankChildren={bankId => this.getBankChildren(bankId)}
          sortBy={type => this.sortBy(type)}
          sortName={this.state.sortName}
          sortPublished={this.state.sortPublished}
          deleteAssessment={(bankId, assessmentId) => this.deleteAssessment(bankId, assessmentId)}
          togglePublishAssessment={assessment => this.props.togglePublishAssessment(assessment)}
        />
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(BankNavigator);
