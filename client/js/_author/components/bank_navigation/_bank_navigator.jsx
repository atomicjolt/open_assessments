import React            from 'react';
import { connect }      from 'react-redux';
import _                from 'lodash';
import * as BankActions from '../../../actions/qbank/banks';
import NavBar           from '../common/navigation_bar';
import BankList         from './bank_list';

const select = state => ({
  banks: state.banks,
});

export class BankNavigator extends React.Component {
  static propTypes = {
    banks           : React.PropTypes.shape({}).isRequired,
    getBanks        : React.PropTypes.func.isRequired,
    getBankChildren : React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  render() {
    return (
      <div>
        <NavBar view="banks" />
        <BankList
          banks={this.props.banks}
          getBankChildren={this.props.getBankChildren}
        />
      </div>
    );
  }
}

export default connect(select, BankActions)(BankNavigator);
