"use strict";

import React                    from "react";
import { Link }                 from "react-router";
import { FloatingActionButton } from "material-ui";
import { connect }              from 'react-redux';

import { loadAccounts }         from "../../actions/admin";
import Defines                  from "../defines";
import ToolBar                  from "./tool_bar";
import history                  from "../../history";

const select = (state) => {
  return {
    loggedIn,
    accounts: state.accounts
  };
};

@connect(select, {loadAccounts}, null, {withRef: true})
class AccountsList extends React.Component {

  componentWillMount(){
    this.props.loadAccounts();
    if(!this.props.loggedIn){
      history.push("login");
    }
  }

  getStyles(){
    return {
      container: {
        margin          : "70px auto",
        overflow        : "auto",
        width           : "300px",
        minHeight       : "435px"
      },
      title: {
        fontSize   : "18pt",
        fontWeight : "400"
      },
      listContainer : {
        backgroundColor : Defines.colors.white
      },
      list : {
        width : "90%",
        margin : "0",
        padding : "0"
      },
      listItem : {
        fontSize     : "14pt",
        height       : "60px",
        paddingLeft  : "25px",
        width        : "100%",
        borderBottom : "solid 1px " + Defines.colors.lightGrey
      },
      listItemLink : {
        color        : Defines.colors.black,
        fontSize     : "14pt",
        verticalAlign: "middle",
        display      : "table-cell"
      },
      floatingActionButton : {
        float        : "right",
        position     : "relative",
        top          : "-20px",
        right        : "15px"
      }
    };
  }


  render(){

    var styles = this.getStyles();
    var accountList;

    if(this.props.accounts){
      var items = this.props.accounts.map((account) => {
        var param = {accountId: account.id};
        var ref = "linkTo" + account.id;
        return <li style={styles.listItem}>
            <Link ref={ref} style={styles.listItemLink} to="account" params={param}>{account.id + " | " + account.name}</Link>
          </li>;
      });

      accountList = <ul style={styles.list}>
        {items}
      </ul>;

    } else {
      accountList = <p>Loading</p>;
    }

    return(
      <div>
        <div style={styles.container}>
          <h2 style={styles.title}>Choose Account</h2>
          <FloatingActionButton style={styles.floatingActionButton} iconClassName="material-icons-content-add" zDepth={1}/>
          <div style={styles.listContainer}>
            {accountList}
          </div>
        </div>
      </div>
    );

  }

}

module.exports = AccountsList;