import React      from 'react';

export default function bankIcon(props) {
  const styles = {
    verticalAlign : 'middle',
    padding       : '10px 20px',
  };
  console.log(props.type);
  switch (props.type) {
    case 'Bank':
      return <i className="material-icons" style={styles}>folder</i>;
    case 'Publish':
      return <i className="material-icons" style={styles}>cloud_upload</i>;
    default:
      return null;
  }
}

bankIcon.propTypes = {
  type: React.PropTypes.string,
};
