import Communicator                                       from './communicator';
import { CommunicatorResizeMsg, CommunicatorSizeRequest } from './communicator';

export default class {

  constructor(){
    Communicator.enableListener(this);
    this.prevHeight = this.getHeight();
    this.prevWidth = this.getWidth();
  }

  getHeight(){
    return Math.max(
      document.body.clientHeight,
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
      document.scrollingElement.scrollHeight
    );
  }
  getWidth(){
    return Math.max(
      document.body.clientWidth,              /* width of <body> */
      document.documentElement.clientWidth,   /* width of <html> */
      document.scrollingElement.scrollWidth,
      window.innerWidth
    );
  }

  sendSize(){
    const height = this.getHeight();
    const width = this.getWidth();

    if(height == this.prevHeight && width == this.prevWidth) {return;}

    const payload = {
      height,
      width
    };
    debugger;
    const ltiPayload = {
      subject: "lti.frameResize",
      height
    };

    // OEA specific message indicating the need for a resize
    Communicator.commMsg(CommunicatorResizeMsg, payload);

    // Let the LMS (Canvas) know about a resize
    Communicator.broadcastMsg(ltiPayload);

  }

  // get rid of LMS module navigation
  hideLMSNavigation() {
    Communicator.broadcastMsg({
      subject: "lti.showModuleNavigation",
      show: false
    });
  }

  // show LMS module navigation
  showLMSNavigation() {
    Communicator.broadcastMsg({
      subject: "lti.showModuleNavigation",
      show: true
    });
  }

  // Tell the parent iFrame to scroll to top
  scrollParentToTop() {
    Communicator.broadcastMsg({
      subject: "lti.scrollToTop"
    });
  }

  navigateHome(){
    this.navigate("home");
  }

  navigateNext(){
    this.navigate("next");
  }

  navigatePrevious(){
    this.navigate("previous");
  }

  navigate(location){
    Communicator.broadcastMsg({
      subject: "lti.navigation",
      location
    });
  }

  broadcast(payload){
    Communicator.broadcastMsg(payload);
  }

  handleComm(e){
    switch(e.data.open_assessments_msg){
      case CommunicatorSizeRequest:
        this.sendSize();
        break;
    }
  }
};
