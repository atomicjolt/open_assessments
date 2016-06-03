"use strict";

import Network  from   "../constants/network";
import wrapper     from   "../constants/wrapper";

const requests = [
  "REVIEW_ASSESSMENT_LOADED",
  "REVIEW_RESULT_LOADED"
];

const actions  = [
  "REVIEW_ASSESSMENT_LOAD_PENDING",
  "REVIEW_RESULT_LOAD_PENDING"
];

export const Constants = wrapper(requests, actions);

export const loadAssessment = (settings) => ({
  type: Constants.REVIEW_ASSESSMENT_LOAD_PENDING,
  method: Network.GET,
  url: (url.indexOf("?") > -1) ? `${settings.srcUrl}&for_review=` : `${settings.srcUrl}?for_review=1`
});

export const loadAssessmentResult = (assessmentId, resultId) => ({
  type: Constants.REVIEW_RESULT_LOAD_PENDING,
  method: Network.GET,
  url: `/api/assessments/${assessmentId}/results/${resultId}`
});
