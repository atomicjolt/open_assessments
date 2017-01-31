import React            from 'react';
import { connect }      from 'react-redux';
import * as BankActions from '../../../actions/qbank/banks';
import NavBar           from '../common/navigation_bar';
import BankList         from './bank_list';

function select(state) {
  const path = state.bankNavigation.location;
  let banks = state.banks;

  _.forEach(path, (folder) => {
    if (!_.isUndefined(banks[folder.id])) {
      banks = banks[folder.id].children;
    } else if (!_.isUndefined(banks.children) && !_.isUndefined(banks.children[folder.id])) {
      banks = banks.children[folder.id].children;
    }
  });

  return {
    path,
    banks,
  };
}
export class BankNavigator extends React.Component {
  static propTypes = {
    banks              : React.PropTypes.shape({}).isRequired,
    getBanks           : React.PropTypes.func.isRequired,
    getBankAssessments : React.PropTypes.func.isRequired,
    getBankItems       : React.PropTypes.func.isRequired,
    getBankSubBanks    : React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  render() {
    const actions = {
      getBankAssessments : this.props.getBankAssessments,
      getBankItems       : this.props.getBankItems,
      getBankSubBanks    : this.props.getBankSubBanks,
    };

    return (
      <div>
        <NavBar
          view="banks"
          path={this.props.path}
        />
        <BankList
          banks={this.props.banks}
          getBankChildren={actions}
        />
      </div>
    );
  }
}

export default connect(select, BankActions)(BankNavigator);
