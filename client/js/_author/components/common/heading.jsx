import React        from 'react';
import assets      from '../../../libs/assets';
import { colors }  from '../../defines';

export default function heading() {
  const styles = {
    navbar: {
      backgroundColor : colors.white,
      width           : '100%',
      height          : '72px',
    },
    image: {
      padding: '20px',
    },
  };

  const logo = assets('./images/CLIx-logo.png');

  return (
    <div style={styles.navbar}>
      <img src={logo} alt="CLI Logo" style={styles.image} />
    </div>
  );
}
