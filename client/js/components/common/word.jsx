import React            from "react";
const defaultStyle = {
  display: "inline-block",
  background: "green",
  padding: "5px 5px",
  margin: "5px 5px"
}

export default (props) => {
  var style = {...defaultStyle}
  switch(props.wordType) {
    case "noun":
      //TODO: These should be setting className instead of style, as Brandon
      //      will be sending us css using classes.
      
      style = {
        display: "inline-block",
        background: "green",
        padding: "5px 5px",
        margin: "5px 5px"
      }
      break;
  }
  return <div style={style}>
    {props.children}
  </div>
}
