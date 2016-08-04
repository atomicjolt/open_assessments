import Immutable                 from 'immutable';
import * as AssessmentSelectors  from "./assessment";


fdescribe('isFirstPage', () => {
  it('should return true on first question', () => {
    const state = {
      assessmentProgress: Immutable.fromJS({currentItemIndex: 0})
    };
    const result = AssessmentSelectors.isFirstPage(state);

    expect(result).toEqual(true);
  });

  it('should return false otherwise', () => {
    const state = {
      assessmentProgress: Immutable.fromJS({currentItemIndex: 1})
    };
    const result = AssessmentSelectors.isFirstPage(state);

    expect(result).toEqual(false);
  });
});

describe('isLastPage', () => {
  it('should return true on last question', () => {});
  it('should return false otherwise', () => {});
});

describe('isNextUnlocked', () => {});
describe('currentItems', () => {});
