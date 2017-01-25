import Network                                      from '../../constants/network';
import { Constants as JwtConstants }                from '../../actions/jwt';
import { Constants as AssessmentConstants }         from '../actions/assessment';
import { Constants as AssessmentProgressConstants } from '../actions/assessment_progress';

export default {

  [JwtConstants.REFRESH_JWT]: {
    method : Network.GET,
    url    : (action) => (`api/sessions/${action.userId}`)
  },
  [AssessmentConstants.LOAD_ASSESSMENT]: (store, action) => {
    const state = store.getState();
    return {
      method : Network.GET,
      url    : (action) => (state.settings.src_url)
    };
  },
  [AssessmentConstants.ASSESSMENT_POST_ANALYTICS]: {
    method : Network.POST,
    url    : (action) => { `api/assessment_results/${action.resultsId}/send?external_user_id=${action.userId}&external_context_id=${action.contextId}`; },
    body   : (action) => {
      return {
        results_id : action.resultsId,
        user_id    : action.userId,
        context_id : action.contextId
      };
    }
  },

  [AssessmentProgressConstants.ASSESSMENT_CHECK_ANSWER] : () => {},
  [AssessmentProgressConstants.ASSESSMENT_SUBMITTED] : () => {},
  [AssessmentProgressConstants.ASSESSMENT_NEXT_QUESTIONS]: () => {},
  [AssessmentProgressConstants.ASSESSMENT_PREVIOUS_QUESTIONS] : () => {},

  [AssessmentConstants.ASSESSMENT_POST_LTI_OUTCOME]: {
    method : Network.POST,
    url    : (action) => (`api/assessment_results/${action.resultsId}/lti_outcome`)
  },

  [AssessmentProgressConstants.ASSESSMENT_GRADED] : {
    method : Network.POST,
    url    : (action) => { 'api/grades'; },
    body   : (action) => {

      // Only send data needed for server-side grading.
      const questions = action.questions.map(function(question){
        return {
          id               : question.id,
          score            : question.score,
          confidence_level : question.confidenceLevel,
          time_spent       : question.timeSpent,
          start_time       : question.startTime,
          outcome_guid     : question.outcomeGuid
        };
      });

      return {
        item_to_grade: {
          assessment_id : action.assessmentId,
          questions,
          answers       : action.answers,
          identifier    : action.identifier,
          settings      : action.settings
        }
      };

    }
  }

};
