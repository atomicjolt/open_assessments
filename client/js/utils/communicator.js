export const CommunicatorMsg = 'open_assessments_msg';
export const CommunicatorResizeMsg = 'open_assessments_resize';

export const CommunicatorSizeRequest = 'open_assessments_size_request';

export default class Communicator {

  static enableListener(handler) {
    // Create IE + others compatible event handler
    const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
    const eventer = window[eventMethod];
    this.messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';
    // Listen to message from child window
    eventer(this.messageEvent, e => handler.handleComm(e), false);
  }

  static commMsg(msg, payload) {
    parent.postMessage(JSON.stringify({ [CommunicatorMsg]: msg, payload }), '*');
  }

  static broadcastMsg(payload) {
    // Post up the entire chain of parent windows.  This supports our use case
    // of the assessment-player being embedded in dumb content which is then
    // embedded in another controller that can understand this message.
    const parents = new Set();
    let p = parent;
    while (!parents.has(p)) {
      p.postMessage(JSON.stringify(payload), '*');
      parents.add(p);
      p = p.parent;
    }
  }

}
