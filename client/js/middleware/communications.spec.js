import communication, { communicationHandler } from './communications';
import { Constants as CommunicationConstants }  from '../_player/actions/communications';

describe('iframe communication middleware', () => {
  describe('middleware behaviour', () => {
    it('implements Redux middleware interface', () => {
      const store = { getState: () => {} };
      const middleware = communication(store);
      const nextHandler = () => {};
      const actionHandler = middleware(nextHandler);

      expect(communication.length).toBe(1);           // api middleware takes one arg
      expect(typeof middleware).toBe('function');     // api middleware must return a function to handle next
      expect(middleware.length).toBe(1);              // next handler returned by api middleware must take one argument
      expect(typeof actionHandler).toBe('function');  // next handler must return a function to handle action
      expect(actionHandler.length).toBe(1);           // action handler must take one argument
    });

    it('passes action on to next middleware', () => {
      const store = { getState: () => {} };
      const action = {
        type: 'TEST'
      };
      const nextHandler = communication(store);
      const next = (actionPassed) => {
        expect(actionPassed).toBe(action);
      };
      const actionHandler = nextHandler(next);
      actionHandler(action);
    });
  });

  describe('action responses', () => {
    let store;
    let middleware;
    let nextHandler;
    let actionHandler;

    beforeEach(() => {
      spyOn(communicationHandler, 'sendSize');
      spyOn(communicationHandler, 'scrollParentToTop');
      spyOn(communicationHandler, 'broadcast');

      store = { getState: () => {} };
      middleware = communication(store);
      nextHandler = () => {};
      actionHandler = middleware(nextHandler);
    });

    it('calls comm handler sendsize when it recieves SEND_SIZE', () => {
      const action = {
        type: CommunicationConstants.SEND_SIZE
      };
      actionHandler(action);

      expect(communicationHandler.sendSize).toHaveBeenCalled();
    });

    it('calls comm handler scrollParentToTop when it recieves SCROLL_PARENT_TO_TOP', () => {
      const action = {
        type: CommunicationConstants.SCROLL_PARENT_TO_TOP
      };
      actionHandler(action);

      expect(communicationHandler.scrollParentToTop).toHaveBeenCalled();
    });

    it('broadcasts lti.navigation next when it recieves LTI_NAVIGATE_NEXT', () => {
      const action = {
        type: CommunicationConstants.LTI_NAVIGATE_NEXT
      };
      actionHandler(action);

      expect(communicationHandler.broadcast).toHaveBeenCalledWith({ subject: 'lti.navigation', location: 'next' });
    });

    it('broadcasts lti.navigation previous when it recieves LTI_NAVIGATE_PREVIOUS', () => {
      const action = {
        type: CommunicationConstants.LTI_NAVIGATE_PREVIOUS
      };
      actionHandler(action);

      expect(communicationHandler.broadcast).toHaveBeenCalledWith({ subject: 'lti.navigation', location: 'previous' });
    });

    it('broadcasts lti.navigation home when it recieves LTI_NAVIGATE_HOME', () => {
      const action = {
        type: CommunicationConstants.LTI_NAVIGATE_HOME
      };
      actionHandler(action);

      expect(communicationHandler.broadcast).toHaveBeenCalledWith({ subject: 'lti.navigation', location: 'home' });
    });

    it('broadcasts lti.showModuleNavigation true when it recieves SHOW_LMS_NAVIGATION', () => {
      const action = {
        type: CommunicationConstants.SHOW_LMS_NAVIGATION
      };
      actionHandler(action);

      expect(communicationHandler.broadcast).toHaveBeenCalledWith({ subject: 'lti.showModuleNavigation', show: true });
    });

    it('broadcasts lti.showModuleNavigation false when it recieves HIDE_LMS_NAVIGATION', () => {
      const action = {
        type: CommunicationConstants.HIDE_LMS_NAVIGATION
      };
      actionHandler(action);

      expect(communicationHandler.broadcast).toHaveBeenCalledWith({ subject: 'lti.showModuleNavigation', show: false });
    });
  });
});
