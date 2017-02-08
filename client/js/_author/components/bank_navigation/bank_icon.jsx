import React      from 'react';

export default function bankIcon(props) {
  switch (props.type) {
    case 'Bank':
    case 'OsidNode':
      return <i className="material-icons">folder</i>;
    case 'Assessment':
      return <i className="material-icons">description</i>;
    case 'Publish':
      return <i className="material-icons">cloud_upload</i>;
    case 'Published':
      return <i className="material-icons is-published">cloud_done</i>;
    default:
      // console.log(props.type);
      return null;
  }
}

bankIcon.propTypes = {
  type: React.PropTypes.string,
};
