import React      from 'react';

export default function bankIcon(props) {
  const styles = {
    verticalAlign : 'middle',
    padding       : '10px 20px',
  };
  const cloudStyles = {
    verticalAlign: 'middle',
  };

  switch (props.type) {
    case 'Bank':
      return <i className="material-icons" style={styles}>folder</i>;
    case 'Publish':
      return <i className="material-icons" style={cloudStyles}>cloud_upload</i>;
    default:
      console.log(props.type);
      return null;
  }
}

bankIcon.propTypes = {
  type: React.PropTypes.string,
};
