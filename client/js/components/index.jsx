"use strict";

import React        from "react";
import { connect }  from "react-redux";

import { loadAssessment }         from "../actions/assessment";
import * as CommunicationActions  from "../actions/communications";
import { setLocale }              from "../actions/locale";
import appHistory                 from "../history";
import { availableLocales }       from "../locales/locales";

const select = (state) => {
  return {
    maxAttempts: state.settings.max_attempts,
    userAttempts: state.settings.userAttempts,
    enableStart: state.settings.enable_start
  };
};

class ResizeWatcher{
  constructor(handleChange){
    this.width = document.scrollingElement.scrollWidth;
    this.height = document.scrollingElement.scrollHeight;
    if(_.isFunction(handleChange)){this.handleChange = handleChange;}
    this.interval = window.setInterval(() => this.checkResize(), 100);
  }

  checkResize(){
    var newWidth = document.scrollingElement.scrollWidth;
    var newHeight = document.scrollingElement.scrollHeight;
    if(this.width != newWidth){
      this.width = newWidth;
      var changed = true;
    }
    if(this.height != newHeight){
      this.height = newHeight;
      var changed = true;
    }
    if(changed === true){this.handleChange(this.width, this.height);}
  }

  stop(){
    window.clearInterval(this.interval);
  }
};

export class Index extends React.Component {

  componentWillMount() {

    // Post up the entire chain of parent windows.  This supports our use case
    // of the assessment-player being embedded in dumb content which is then
    // embedded in another controller that can understand this message.
    let parents = new Set();
    let p = parent;
    while(!parents.has(p)) {
      p.postMessage({
        open_assessments_msg: "open_assessments_available_locales",
        available_locales: availableLocales()
      }, "*");
      parents.add(p);
      p = p.parent;
    }

    this.props.loadAssessment();

    if(this.props.userAttempts &&
       this.props.userAttempts >= this.props.maxAttempts) {
      appHistory.push("retries-exceeded");
    } else if(!this.props.enableStart) {
      appHistory.push("assessment");
    }
  }

  handleSizeChange(){
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  componentDidMount() {
    window.addEventListener("message", (message) => this.onMessage(message), false);
    this.props.sendSize();
    this.props.scrollParentToTop();
    this.resizeWatcher = new ResizeWatcher((width, height) => this.handleSizeChange(width, height));
  }


  componentDidUpdate() {
    this.props.sendSize();
    this.props.scrollParentToTop();
  }

  componentWillUnmount(){
    this.resizeWatcher.stop();
  }

  onMessage(message) {
    const data = message.data;
    const type = data.open_assessments_msg;

    switch(type) {
      case "open_assessments_set_locale":
        this.props.setLocale(data.locale);
        break;
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(select, {loadAssessment, setLocale, ...CommunicationActions}, null, {withRefs: true})(Index);
