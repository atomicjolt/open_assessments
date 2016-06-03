import React          from "react";
import { connect }    from "react-redux";
import { loadUsers }  from "../../actions/admin/users";

const select = (state, context) => {
  const accountId = context.router.params.accountId;
  return {
    users: state.adminUsers,
    currentAccount: state.adminAccounts.get(accountId)
  };
};

@connect(select, {loadUsers}, null, {withRef: true})
export default class Account extends React.Component{

  componentWillMount(){
    this.props.loadUsers(this.props.params.accountId);
  }

  render(){

    var userList = this.props.users.map(function(account){
      return(<h2>{account.name}</h2>);
    });

    return (
      <div>
        <h3>{this.props.currentAccount.name}</h3>
        {userList}
      </div>
    );
  }

}
