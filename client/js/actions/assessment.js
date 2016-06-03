"use strict";

import Wrapper from '../constants/wrapper';
import Constants from '../constants';

const constants = [];

const requests = [
  "LOAD_ASSESSMENT",
  "ASSESSMENT_POST_ANALYTICS",
  "ASSESSMENT_POST_LTI_OUTCOME"
];


export const loadAssessment = (assessmentId) => ({
  type: Constants.LOAD_ASSESSMENT,
  apiCall:true,
  assessmentId
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
