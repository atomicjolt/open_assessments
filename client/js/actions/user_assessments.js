"use strict";

import wrapper        from "../constants/wrapper";
import Network        from "../constants/network";

const request = [
  "USER_ASSESSMENTS_LOADING",
  "USER_ASSESSMENTS_UPDATING"
];

export const Constants = wrapper([], request);

export const loadUserAssessments = (contextId, assessmentId) => ({
  type: Constants.USER_ASSESSMENTS_LOADING,
  method: Network.GET,
  url: `api/user_assessments?context_id=${contextId}&assessment_id=${assessmentId}`
});

export const updateUserAssessment = (id, payload) => ({
  type: Constants.USER_ASSESSMENTS_UPDATING,
  method: Network.PUT,
  url: `api/user_assessments/${id}/update_attempts`,
  payload
});

//.............................
//                            .
//                            .
//                            .
//                            .
//                            .
//            .               .
//                            .
//                            .
//.............................
//  Polar Bear in a Snow Storm
