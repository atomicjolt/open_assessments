import { Constants as CommunicationConstants }  from "../actions/communications";
import CommHandler                              from "../utils/communication_handler.js"

const Comm = store => next => action => {

  switch(action.type) {
  case CommunicationConstants.INIT_HANDLER:
    CommHandler.init();
    break;
  case CommunicationConstants.POST_SIZE:
    CommHandler.sendSize();
    break;
  case CommunicationConstants.SCROLL_PARENT_TO_TOP:
    CommHandler.scrollParentToTop();
    break;
  }

  // call the next middleWare
  next(action);

};

export { Comm as default };
