import Communicator, { CommunicatorResizeMsg, CommunicatorSizeRequest } from './communicator';
import { availableLocales } from '../_player/locales/locales';

export default class {

  constructor() {
    Communicator.enableListener(this);
  }

  getHeight() {
    return Math.max(
      document.body.clientHeight,
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  getWidth() {
    return Math.max(
      document.body.clientWidth,              /* width of <body> */
      document.documentElement.clientWidth,   /* width of <html> */
      document.documentElement.scrollWidth,
      window.innerWidth
    );
  }

  sendSize() {
    const height = this.getHeight();
    const width = this.getWidth();

    if (height === this.prevHeight && width === this.prevWidth) { return; }
    this.prevHeight = height;
    this.prevWidth = width;

    const payload = {
      height,
      width
    };

    const ltiPayload = {
      subject: 'lti.frameResize',
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
      subject: 'lti.showModuleNavigation',
      show: false
    });
  }

  // show LMS module navigation
  showLMSNavigation() {
    Communicator.broadcastMsg({
      subject: 'lti.showModuleNavigation',
      show: true
    });
  }

  // Tell the parent iFrame to scroll to top
  scrollParentToTop() {
    Communicator.broadcastMsg({
      open_assessments_msg: 'scrollToTop',
    });
  }

  navigateHome() {
    this.navigate('home');
  }

  navigateNext() {
    this.navigate('next');
  }

  navigatePrevious() {
    this.navigate('previous');
  }

  navigate(location) {
    Communicator.broadcastMsg({
      subject: 'lti.navigation',
      location
    });
  }

  availableLocales() {
    Communicator.broadcastMsg({
      open_assessments_msg: 'open_assessments_available_locales',
      available_locales: availableLocales()
    });
  }

  broadcast(payload) {
    Communicator.broadcastMsg(payload);
  }

  handleComm(e) {
    switch(e.data.open_assessments_msg) {
      case CommunicatorSizeRequest:
        this.sendSize();
        break;
      default:
        break;
    }
  }

}
