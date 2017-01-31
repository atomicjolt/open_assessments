import React                    from 'react';
import _                        from 'lodash';
import { colors, buttonStyle }  from '../../defines';

export default function (props) {
  const styles = {
    homeIcon: {
      color   : colors.grey,
      padding : '10px 10px 10px 20px'
    },
    rightContent: {
      float: 'right',
    },
    spacer: {
      margin      : '-1px 1px 1px -1px',
      lineHeight  : '2em',
      borderLeft  : `2px solid ${colors.accentGrey}`,
      padding     : '0.7em',
    },
    button: {
      backgroundColor : colors.primaryPurple,
      height          : '100%',
      verticalAlign   : 'middle',
      margin          : '7px 15px',
      padding         : '5px 40px',
    }
  };

  return (
    <div>
      <i className="material-icons" style={styles.homeIcon} >
        home
      </i>
      {
        _.map(props.path, folder => (
          <span key={`folder_${folder.id}`}>{folder.id}/</span>
        ))
      }
      <div style={styles.rightContent}>
        <span style={styles.spacer} />
        <button style={{ ...buttonStyle, ...styles.button }}>NEW</button>
      </div>
    </div>
  );
}
