import React      from 'react';
import NavBar     from '../common/navigation_bar';
import BankList   from './bank_list';


export default class BankNavigator extends React.Component {

  render() {
    return (
      <div>
        <NavBar view="banks" />
        <BankList />
      </div>
    );
  }
}
