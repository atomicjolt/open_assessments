import React      from 'react';
import { colors } from '../../defines';

export default function sortButton(props) {
  console.log(props.order);
  const styles = {
    button: {
      display : 'inline-block',
      width   : '30px',
      padding : '10px',
      color   : colors.grey,
      cursor  : 'pointer',
      outline : 'none',
    },
    top: {
      position : 'absolute',
      top      : '6px',
      color    : props.order === 'desc' ? colors.textGrey : '',
    },
    bottom: {
      position : 'absolute',
      bottom   : '6px',
      color    : props.order === 'asc' ? colors.textGrey : '',
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
  sort  : React.PropTypes.func.isRequired,
  order : React.PropTypes.string,
};
