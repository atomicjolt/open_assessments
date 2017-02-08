import React                    from 'react';
import _                        from 'lodash';
import { hashHistory }          from 'react-router';
import { colors, buttonStyle }  from '../../defines';
import Breadcrumb               from './breadcrumb';

export default function navigationBarContent(props) {
  const styles = {
    homeIcon: {
      color   : colors.grey,
      padding : '10px 10px 10px 20px',
      cursor  : 'pointer',
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
    breadcrumbs: {
      display       : 'inline-block',
      verticalAlign : 'top',
      lineHeight    : '45px',
    },
    button: {
      backgroundColor : colors.primaryPurple,
      height          : '100%',
      verticalAlign   : 'middle',
      margin          : '7px 15px',
      padding         : '5px 40px',
    },
  };
  return (
    <div>
      <i
        tabIndex="0"
        role="button"
        className="material-icons"
        style={styles.homeIcon}
        onClick={() => props.updatePath(null)}
      >
        home
      </i>
      <div style={styles.breadcrumbs}>
        {
          _.map(props.path, folder => (
            <Breadcrumb
              key={`folder_${folder.id}`}
              {...folder}
              current={props.currentBankId === folder.id}
              updatePath={props.updatePath}
            />
          ))
        }
      </div>
      <div style={styles.rightContent}>
        <span style={styles.spacer} />
        <button
          style={{ ...buttonStyle, ...styles.button }}
          onClick={() => hashHistory.push(`banks/${props.currentBankId}/new_assessment`)}
        >
        NEW
        </button>
      </div>
    </div>
  );
}

navigationBarContent.propTypes = {
  path              : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
  currentBankId     : React.PropTypes.string,
};
