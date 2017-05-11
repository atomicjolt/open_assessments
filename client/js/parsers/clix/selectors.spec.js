import Immutable                            from 'immutable';
import { SECONDARY_ACTION } from '../../_player/components/assessments/two_button_nav';
import * as ClixSelectors                   from './selectors';

describe('secondaryActionState', () => {
  let result;
  const state = {
    settings: { unlock_prev: null },
    assessment: { requireNAnswers: undefined },
    assessmentProgress: undefined,
  };

  describe('isFirstPage', () => {
    it('hides previous button on isFirstPage', () => {
      state.settings.unlock_prev = false;
      state.assessment.requireNAnswers = -1;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 0 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.NONE });
    });
  });

  describe('isPrevUnlocked and isNofM', () => {
    it('shows previous button when unlock_prev ALWAYS and isNofM', () => {
      state.settings.unlock_prev = 'ALWAYS';
      state.assessment.requireNAnswers = 3;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.PREV });
    });

    it('shows previous button when unlock_prev ALWAYS and not isNofM', () => {
      state.settings.unlock_prev = 'ALWAYS';
      state.assessment.requireNAnswers = -1;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.PREV });
    });

    it('shows previous button when unlock_prev NEVER and isNofM', () => {
      state.settings.unlock_prev = 'NEVER';
      state.assessment.requireNAnswers = 3;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.PREV });
    });

    it('hides previous button when unlock_prev NEVER and not isNofM', () => {
      state.settings.unlock_prev = 'NEVER';
      state.assessment.requireNAnswers = -1;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.NONE });
    });

    it('shows previous button when unlock_prev null and isNofM', () => {
      state.settings.unlock_prev = null;
      state.assessment.requireNAnswers = 3;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.PREV });
    });

    it('shows previous button when unlock_prev null and not isNofM', () => {
      state.settings.unlock_prev = null;
      state.assessment.requireNAnswers = -1;
      state.assessmentProgress = Immutable.fromJS({ currentItemIndex: 1 });
      result = ClixSelectors.secondaryActionState(state);
      expect(result).toEqual({ buttonState: SECONDARY_ACTION.NONE });
    });
  });
});
