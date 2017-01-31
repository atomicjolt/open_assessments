import React            from 'react';
import { connect }      from 'react-redux';
import _                from 'lodash';
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
    banks           : React.PropTypes.shape({}).isRequired,
    path            : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    getBanks        : React.PropTypes.func.isRequired,
    getBankChildren : React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
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
          getBankChildren={this.props.getBankChildren}
        />
      </div>
    );
  }
}

export default connect(select, BankActions)(BankNavigator);
