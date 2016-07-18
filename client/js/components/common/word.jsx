import React            from "react";
const style = {
  display: "inline-block",
  background: "green",
  padding: "5px 5px",
  margin: "5px 5px"
}

export default (props) => {
  return <div style={style} dangerouslySetInnerHTML={{__html: props.material}} />
}
