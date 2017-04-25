import Immutable  from 'immutable';
import _          from 'lodash';
import { Constants as AssessmentConstants }   from '../actions/assessment_progress';

const initialState = Immutable.fromJS({
  isSubmitted:           false,
  isStarted:             false,
  currentItemIndex:      0,

  // Number of 'check answer' api calls that have not yet returned
  numQuestionsChecking:  0,
  selectedAnswerId:      '',
  checkedResponses:      [],
  responses:             [],
  startedAt:             0,
  finishedAt:            0,
  assessmentResult:      null
});

export default (state = initialState, action) => {

  switch (action.type) {
    case AssessmentConstants.ASSESSMENT_NEXT_QUESTIONS: {
      const currentItemIndex = state.get('currentItemIndex');
      const increment = action.pageSize;
      return state.set('currentItemIndex', currentItemIndex + increment);
    }

    case AssessmentConstants.ASSESSMENT_PREVIOUS_QUESTIONS: {
      const currentItemIndex = state.get('currentItemIndex');
      const decrement = action.pageSize;
      return state.set('currentItemIndex', currentItemIndex - decrement);
    }

    case AssessmentConstants.ASSESSMENT_VIEWED:
      return state.set('startedAt', Date.now());

    case AssessmentConstants.ANSWER_SELECTED: {
      let responses = state.getIn(['responses', `${action.questionIndex}`]);
      if (responses === undefined || action.exclusive === true) {
        // Create new list if no list exists or multi answer is not allowed
        responses = Immutable.List(); // eslint-disable-line new-cap
      }

      // answerData will usually be a string, but if it's not this will let
      // us search for it anyways. Immutable.fromJS on a string returns a string.
      const answerData = Immutable.fromJS(action.answerData);

      /*
        If answerData is not a string we're assuming there will be an id field
        and that it will be unique. For clix drag and drop, id will be a map
        containing both id and zone. That's why we're using Immutable.is() for
        the equality comparison.
      */
      const answerIndex = responses.findIndex((answer) => {
        if (typeof answerData === 'string' || typeof answerData === 'number') {
          return answerData === answer;
        }

        if (answerData instanceof Blob) {
          return _.isEqual(answerData, answer);
        }

        return Immutable.is(answer.get('id'), answerData.get('id'));
      });

      const shouldToggle = !action.exclusive;

      // Only add answer to responses array if it doesn't exist
      if (answerIndex > -1) {
        // Don't toggle Radio buttons
        if (shouldToggle) {
          responses = responses.delete(answerIndex);
        }
      } else {
        responses = responses.push(answerData);
      }

      return state.setIn(['responses', `${action.questionIndex}`], responses);
    }

    case AssessmentConstants.ASSESSMENT_CHECK_ANSWER_DONE: {
      let newState = state;
      if (!action.error) {
        let checkedResponses = Immutable.Map(); // eslint-disable-line new-cap

        // TODO: Currently we are setting the same response for all userInput.
        // When we have an example of multi answer feedback we should figure out
        // how to assign feedback to each answer.
        action.userInput.forEach((id) => {
          const feedback = Immutable.Map(action.payload); // eslint-disable-line new-cap
          checkedResponses = checkedResponses.set(id, feedback);
        });

        newState = state.setIn(
          ['checkedResponses', `${action.questionIndex}`],
          checkedResponses
        );
      }

      // Decrement number of questions being checked
      const checked = state.get('numQuestionsChecking');
      if (checked <= 0) {
        throw new Error('ASSESSMENT_CHECK_ANSWER_DONE dispatched when no answers were being checked');
      }
      return newState.set('numQuestionsChecking', checked - 1);
    }

    case AssessmentConstants.CHECK_QUESTIONS: {
      const checking = state.get('numQuestionsChecking');
      return state.set('numQuestionsChecking', action.numQuestions + checking);
    }

    case AssessmentConstants.ASSESSMENT_SUBMITTED_DONE: {
      const newState = state.set('finishedAt', Date.now());
      return newState.set('isSubmitted', true);
    }

    default:

  }
  return state;
};
