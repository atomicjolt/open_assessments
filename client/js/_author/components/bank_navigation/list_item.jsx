import React from 'react';

export default function ListItem(props) {
  const { selectItem, bank, onFocus } = props;
  // as;dlkfja;lsdkjf;alskdjf;laksjdf;lkasjdf;lkajsd;lfkjas;dlkfjas;ldkfja;lskdjf;laskdjf;laskdjf;laskjdf;laskjdf;laksjdf;lkasjdf;laksjdf;lkasjdf;lkasjd;lfkjasd;lfkjas;ldkfjas;ldkjf;l
  return (
    <tr
      onClick={() => selectItem()}
      tabIndex="0"
      role="button"
      aria-label={bank.displayName ? bank.displayName.text : 'bank item'}
      onFocus={onFocus}
      onMouseEnter={() => onFocus(true)}
      onMouseLeave={() => onFocus(false)}
      className={props.focused ? 'focused' : ''}
    >
      {
       props.children
      }
    </tr>
  );
}

ListItem.propTypes = {
  selectItem: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
  bank: React.PropTypes.shape({
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string
    }).isRequired,
  }).isRequired,
  focused: React.PropTypes.bool.isRequired,
  children: React.PropTypes.arrayOf(React.PropTypes.element),
};
