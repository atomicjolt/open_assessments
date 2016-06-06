"use strict";

import wrapper from '../constants/wrapper';

const constants = [];

const requests = [
  "LOAD_ASSESSMENT",
  "ASSESSMENT_POST_ANALYTICS",
  "ASSESSMENT_POST_LTI_OUTCOME"
];

export const Constants = wrapper(constants, requests);

export const loadAssessment = (url, id) => ({
  type: Constants.LOAD_ASSESSMENT,
  apiCall:true,
  url,
  id
});

export const assessmentPostAnalytics = (results_id, user_id='') => ({
  type:Constants.ASSESSMENT_POST_ANALYTICS,
  results_id,
  user_id
});

export const assessmentPostLtiOutcome = (results_id) => ({
  type:Constants.ASSESSMENT_POST_LTI_OUTCOME,
  results_id,
});
