export const CommunicatorMsg         = "open_assessments_msg";
export const CommunicatorResizeMsg   = "open_assessments_resize";

export const CommunicatorSizeRequest = "open_assessments_size_request";

export default class Communicator{

  static enableListener(handler){
    // Create IE + others compatible event handler
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var eventer = window[eventMethod];
    this.messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
    // Listen to message from child window
    eventer(this.messageEvent, handler.handleComm, false);
  }

  static commMsg(msg, payload){
    parent.postMessage(JSON.stringify({[CommunicatorMsg]: msg, 'payload': payload}), '*');
  }

  static broadcastMsg(payload){
    parent.postMessage(JSON.stringify(payload), "*");
  }

};