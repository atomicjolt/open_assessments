import React      from 'react';
import { colors } from '../../defines';

export default function sortButton(props) {
  const styles = {
    button: {
      display : 'inline-block',
      width   : '30px',
      padding : '10px',
      color   : colors.grey,
    },
    top: {
      position : 'absolute',
      top      : '6px',
    },
    bottom: {
      position : 'absolute',
      bottom   : '6px',
    }
  };

  return (
    <div
      style={styles.button}
      tabIndex="0"
      role="button"
      aria-label="sort list"
      onClick={() => props.sort()}
    >
      <i className="material-icons" style={styles.top}>
        keyboard_arrow_up
      </i>
      <i className="material-icons" style={styles.bottom}>
        keyboard_arrow_down
      </i>
    </div>
  );
}

sortButton.propTypes = {
  sort: React.PropTypes.func.isRequired,
};
