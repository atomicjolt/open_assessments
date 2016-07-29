import React from 'react'

export default (props) => {
  let className = "c-word c-word--starter";
  if(this.props.hide) {
    className += " u-hide";
  }

  return <div className={className} />
}
