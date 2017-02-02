import React                  from 'react';
import _                      from 'lodash';
import { connect }            from 'react-redux';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';
import NavBar                 from '../common/navigation_bar';
import BankList               from './bank_list';

function select(state) {
  const path = state.bankNavigation.location;
  const currentBankId = path.length ? path[path.length - 1].id : null;
  let banks = state.banks;

  _.forEach(path, (folder) => {
    const currentBank = _.find(banks, { id: folder.id });
    banks = currentBank.childNodes;
  });

  return {
    path,
    currentBankId,
    banks: _.merge(state.assessments[currentBankId], banks),
  };
}
export class BankNavigator extends React.Component {
  static propTypes = {
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    path               : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    updatePath         : React.PropTypes.func.isRequired,
    getBanks           : React.PropTypes.func.isRequired,
    getAssessments     : React.PropTypes.func.isRequired,
    getItems           : React.PropTypes.func.isRequired,
    createAssessment   : React.PropTypes.func.isRequired,
    currentBankId      : React.PropTypes.string,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  getBankChildren(bank) {
    this.props.updatePath(bank.id, bank.displayName.text);
    this.props.getAssessments(bank.id);
    this.props.getItems(bank.id);
  }

  render() {
    return (
      <div>
        <NavBar
          view="banks"
          path={this.props.path}
          createAssessment={this.props.createAssessment}
          currentBankId={this.props.currentBankId}
          updatePath={this.props.updatePath}
        />
        <BankList
          banks={this.props.banks}
          getBankChildren={bank => this.getBankChildren(bank)}
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