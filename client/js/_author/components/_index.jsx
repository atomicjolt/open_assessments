import React            from 'react';
import { connect }            from 'react-redux';
import * as BankActions       from '../../actions/qbank/banks';


function select(state) {
  return {
    bank: state.banks,
    settings: state.settings,
  };
}
export class Index extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    getBanks: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
})(Index);
