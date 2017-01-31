import React      from 'react';
import { colors } from '../../defines';
import BanksView  from '../bank_navigation/navigation_bar_content';

export default function navigationBar(props) {
  const styles = {
    bar: {
      backgroundColor : colors.lightBackground,
      borderTop       : `1px solid ${colors.accentGrey}`,
      boxShadow       : `8px 6px 4px ${colors.accentGrey}`,
    }
  };

  const content = () => {
    switch (props.view) {
      case 'banks':
        return (
          <BanksView />
        );
      default:
        return null;
    }
  };

  return (
    <div style={styles.bar}>
      {content()}
    </div>
  );
}

navigationBar.propTypes = {
  view: React.PropTypes.string.isRequired,
};
