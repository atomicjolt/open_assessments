import Immutable                 from 'immutable';
import _                         from 'lodash';
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

describe('isLastPage', () => {
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

describe('isNextUnlocked', () => {
  const createResponse = (i, responses) => {
    responses[i] = {
      answerIds:["1", "2"],
      correct:true,
      feedback:"<p>Feedbac</p>"
    };
  };
  describe('unlockNext is ON_CORRECT', () => {
    var nextUnlocked, responses, questionsPerPage;
    beforeEach(() => {
      nextUnlocked = "ON_CORRECT";
      responses = {};
      questionsPerPage = 12;
      _.range(12).forEach((i) =>{ createResponse(i, responses); }); //TODO doc
    });

    it('should return true when all answers in current page are correct', () => {
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage, -1);
      expect(result).toEqual(true);
    });

    it('should return false when there is an incorrect answer', () => {
      responses[3].correct = false;
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage, -1);
      expect(result).toEqual(false);
    });

    it('should return false when there is an unanswered question', () => {
      delete responses[4];
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage, -1);
      expect(result).toEqual(false);
    });
  });

  describe('unlockNext is ON_ANSWER_CHECK', () => {
    var nextUnlocked, responses, questionsPerPage;
    beforeEach(() => {
      nextUnlocked = "ON_ANSWER_CHECK";
      responses = {};
      questionsPerPage = 12;
      _.range(12).forEach((i) =>{ createResponse(i, responses); }); //TODO doc
    });

    it('should return true when all answers have been checked', () => {
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage, -1);
      expect(result).toEqual(true);
    });
    it('should return false otherwise', () => {
      delete responses[2];
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage, -1);
      expect(result).toEqual(false);
    });
  });

  describe('ALWAYS', () => {
    var nextUnlocked, responses, questionsPerPage;
    beforeEach(() => {
      nextUnlocked = "ALWAYS";
      responses = {};
      questionsPerPage = 12;
    });

    it('should return true if no questions are answered', () => {
      const result = AssessmentSelectors._isNextUnlocked(nextUnlocked, responses, questionsPerPage);
      expect(result).toEqual(true);
    });
  });
});

describe('currentItems', () => {
  var allQuestions, currentItemIndex, questionsPerPage, assessmentLoaded;
  beforeEach(() => {
    allQuestions = [{id:0}, {id:1}, {id:2}, {id:3}, {id:4}, {id:5}, {id:6}, {id:7}, {id:8}, {id:9}, {id:10}];
    currentItemIndex = 6;
    questionsPerPage = 3;
    assessmentLoaded = true;
  });
  it('returns all items on current page', () => {
    const result = AssessmentSelectors._currentItems(allQuestions, currentItemIndex, questionsPerPage, assessmentLoaded);
    expect(result).toEqual([{id:6}, {id:7}, {id:8}]);
  });
  it('returns empty array if the assessment hasnt loaded', () => {
    assessmentLoaded = false;
    const result = AssessmentSelectors._currentItems(allQuestions, currentItemIndex, questionsPerPage, assessmentLoaded);
    expect(result).toEqual([]);
  });
});
