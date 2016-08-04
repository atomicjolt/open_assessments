import Immutable                 from 'immutable';
import * as AssessmentSelectors  from "./assessment";


describe('isFirstPage', () => {
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

fdescribe('isLastPage', () => {
  it('should return true on last question', () => {
    const currentItemIndex = 8;
    const numItems = 10;
    const itemsPerPage = 2;
    const result = AssessmentSelectors._isLastPage(currentItemIndex, numItems, itemsPerPage);

    expect(result).toEqual(true);
  });
  it('should return false otherwise', () => {
    const currentItemIndex = 7;
    const numItems = 10;
    const itemsPerPage = 2;
    const result = AssessmentSelectors._isLastPage(currentItemIndex, numItems, itemsPerPage);

    expect(result).toEqual(false);
  });
});

describe('isNextUnlocked', () => {});
describe('currentItems', () => {});
