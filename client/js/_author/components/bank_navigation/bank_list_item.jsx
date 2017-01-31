import React      from 'react';
import Icon       from './bank_icon';
import { colors}  from '../../defines';

export default function BankListItem(props) {
  const styles = {
    item: {
      borderBottom  : `1px solid ${colors.accentGrey}`,
      lineHeight    : '50px',
    },
    text: {
      display: 'inline-block',
    },
  };

  return (
    <div style={styles.item}>
      <Icon type={props.type} />
        {props.displayName.text}
    </div>
  );
}

BankListItem.propTypes = {
  displayName: React.PropTypes.shape({
    text: React.PropTypes.string,
  }).isRequired,
  type: React.PropTypes.string,
};
