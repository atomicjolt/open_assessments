import React      from 'react';
import NavBar     from '../common/navigation_bar';


export default class BankNavigator extends React.Component {

  render() {
    return (
      <div>
        <NavBar view="banks" />
      </div>
    );
  }
}
