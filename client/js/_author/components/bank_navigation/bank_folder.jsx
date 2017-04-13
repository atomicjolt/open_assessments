import React from 'react';
import _ from 'lodash';
import ListItem from './list_item';

export default function BankFolder(props) {
  const { bank } = props;
  const displayName = _.get(bank, 'displayName.text');
  return (
    <ListItem {...props} selectItem={() => props.getBankChildren(bank.id)} onFocus={props.onFocus}>
      <td><i className="material-icons">folder</i></td>
      <td>{displayName}</td>
      <td />
      <td />
    </ListItem>
  );
}

BankFolder.propTypes = {
  bank: React.PropTypes.shape({
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired,
  }).isRequired,
  getBankChildren: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
};
