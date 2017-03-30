import React from 'react';

export default function ListItem(props) {
  const { selectItem, bank } = props;
  return (
    <tr
      onClick={() => selectItem()}
      tabIndex="0"
      role="button"
      aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
    >
      {
       props.children
      }
    </tr>
  );
}

ListItem.propTypes = {
  selectItem: React.PropTypes.func.isRequired,
  bank: React.PropTypes.shape({
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired,
  }).isRequired,
  children: React.PropTypes.element,
};
