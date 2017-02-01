import React            from 'react';
import _                from 'lodash';
import { connect }      from 'react-redux';
import * as BankActions from '../../../actions/qbank/banks';
import NavBar           from '../common/navigation_bar';
import BankList         from './bank_list';

function select(state) {
  const path = state.bankNavigation.location;
  let banks = state.banks;

  _.forEach(path, (folder) => {
    const currentBank = _.find(banks, { id: folder.id });
    banks = currentBank.childNodes;
  });

  console.log(banks);
  return {
    path,
    banks,
  };
}
export class BankNavigator extends React.Component {
  static propTypes = {
    banks              : React.PropTypes.shape({}).isRequired,
    updatePath         : React.PropTypes.func.isRequired,
    getBanks           : React.PropTypes.func.isRequired,
    getBankAssessments : React.PropTypes.func.isRequired,
    getBankItems       : React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  getBankChildren(bank) {
    this.props.updatePath(bank.id, bank.displayName.text);
    this.props.getBankAssessments(bank.id);
    // this.props.getBankItems(bank);
  }

  render() {
    return (
      <div>
        <NavBar
          view="banks"
          path={this.props.path}
        />
        <BankList
          banks={this.props.banks}
          getBankChildren={id => this.getBankChildren(id)}
        />
      </div>
    );
  }
}

export default connect(select, BankActions)(BankNavigator);
