import React            from "react";

export default (props) => {
  const className = props.hide ? "c-word u-hide" : "c-word";
  return <div className={className} dangerouslySetInnerHTML={{__html: props.material}} />
}
