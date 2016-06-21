import Network                                      from "../constants/network";
import { Constants as JwtConstants }                from "../actions/jwt";
import { Constants as AssessmentConstants }         from "../actions/assessment";
import { Constants as AssessmentProgressConstants } from "../actions/assessment_progress";

export default {
  [JwtConstants.REFRESH_JWT]                        : { method: Network.GET,  url: (action) => { `api/sessions/${action.userId}`; } },
  [AssessmentConstants.LOAD_ASSESSMENT]             : { method: Network.GET,  url: (action) => { action.settings.src_url; } },
  [AssessmentConstants.ASSESSMENT_POST_ANALYTICS]   : { method: Network.POST, url: (action) => { `api/assessment_results/${action.resultsId}/send?external_user_id=${action.userId}&external_context_id=${action.contextId}`; } },
  [AssessmentConstants.ASSESSMENT_POST_LTI_OUTCOME] : { method: Network.POST, url: (action) => { `api/assessment_results/${action.resultsId}/lti_outcome`; } },
  [AssessmentProgressConstants.ASSESSMENT_GRADED]   : { method: Network.POST, url: (action) => { 'api/grades'; } }
};