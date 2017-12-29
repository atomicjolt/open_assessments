import React    from 'react';
// import { Link } from 'react-router';
// Don't use the Link component because the rest of the app
//   is using #/routing, which isn't compatible with linking
//   directly to the help pages (non-React pages).

function helpLink(props) {
  if (props.icon) {
    return (
      <a
        href={props.to}
        rel="noreferrer noopener"
        target="_blank"
        className="help-link"
      >
        <i className="material-icons">help</i>
      </a>
    );
  }
  return (
    <a
      href={props.to}
      rel="noreferrer noopener"
      target="_blank"
      className="help-link"
    >
      What&#39;s this?
    </a>
  );
}


helpLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  icon: React.PropTypes.bool,
};

export default helpLink;
