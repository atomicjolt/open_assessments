import React            from "react";

export default (props) => {
  const className = props.hide ? props.className + " u-hide" : props.className;
  return <div className={className} dangerouslySetInnerHTML={{__html: props.material}} />
}
