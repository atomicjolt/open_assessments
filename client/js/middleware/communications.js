import { Constants as CommunicationConstants }      from '../_player/actions/communications';
import CommunicationHandler                         from '../utils/communication_handler.js';

export const communicationHandler = new CommunicationHandler();

const Communications = store => next => (action) => {

  switch (action.type) {

    case CommunicationConstants.SEND_SIZE:
      communicationHandler.sendSize();
      break;

    case CommunicationConstants.SCROLL_PARENT_TO_TOP:
      communicationHandler.scrollParentToTop();
      break;

    case CommunicationConstants.LTI_NAVIGATE_NEXT:
      communicationHandler.broadcast({ subject: 'lti.navigation', location: 'next' });
      break;

    case CommunicationConstants.LTI_NAVIGATE_PREVIOUS:
      communicationHandler.broadcast({ subject: 'lti.navigation', location: 'previous' });
      break;

    case CommunicationConstants.LTI_NAVIGATE_HOME:
      communicationHandler.broadcast({ subject: 'lti.navigation', location: 'home' });
      break;

    case CommunicationConstants.SHOW_LMS_NAVIGATION:
      communicationHandler.broadcast({ subject: 'lti.showModuleNavigation', show: true });
      break;

    case CommunicationConstants.HIDE_LMS_NAVIGATION:
      communicationHandler.broadcast({ subject: 'lti.showModuleNavigation', show: false });
      break;
    case CommunicationConstants.AVAILABLE_LOCALES:
      communicationHandler.availableLocales();
      break;
    default:
      break;
  }

  // call the next middleWare
  next(action);

};

export { Communications as default };
