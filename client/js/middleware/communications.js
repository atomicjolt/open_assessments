import { Constants as CommunicationConstants }      from "../actions/communications";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";
import CommunicationHandler                         from "../utils/communication_handler.js";

const communicationHandler = new CommunicationHandler();

const Communications = store => next => action => {

  switch(action.type) {

    case CommunicationConstants.POST_SIZE:
      communicationHandler.sendSize();
      break;

    case CommunicationConstants.SCROLL_PARENT_TO_TOP:
      communicationHandler.scrollParentToTop();
      break;

    case AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTION:
      communicationHandler.broadcast({subject: "lti.navigation", location: "next"});
      break;
  }

  // call the next middleWare
  next(action);

};

export { Communications as default };
