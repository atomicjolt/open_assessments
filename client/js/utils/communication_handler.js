import Communicator                                       from './communicator';
import { CommunicatorResizeMsg, CommunicatorSizeRequest } from './communicator';

export default class {

  constructor(){
    Communicator.enableListener(this);
  }

  sendSize(){

    const height = Math.max(
            document.body.clientHeight,
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight);

    const width = Math.max(
      document.body.clientWidth,              /* width of <body> */
      document.documentElement.clientWidth,   /* width of <html> */
      window.innerWidth);

    const payload = {
      height,
      width
    };

    const ltiPayload = {
      subject: "lti.frameResize",
      height
    };

    // OEA specific message indicate the need for a resize
    Communicator.commMsg(CommunicatorResizeMsg, payload);

    // Let the LMS (Canvas) know about a resize
    Communicator.broadcastMsg(ltiPayload);

  }

  // tell the parent iFrame to scroll to top
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
