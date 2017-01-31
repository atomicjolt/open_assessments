import React      from 'react';
import { colors } from '../../defines';

export default function (props) {
  const styles = {
    button: {
      display : 'inline-block',
      width   : '30px',
      padding : '10px',
      color   : colors.grey,
    },
    top: {
      position : 'absolute',
      top      : '10px',
    },
    bottom: {
      position : 'absolute',
      bottom   : '24px',
    }
  };

  return (
    <div style={styles.button} tabIndex="0" onClick={() => console.log('sort')}>
      <i className="material-icons" style={styles.top}>
        keyboard_arrow_up
      </i>
      <i className="material-icons" style={styles.bottom}>
        keyboard_arrow_down
      </i>
    </div>
  );
}