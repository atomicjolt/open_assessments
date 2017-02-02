import wrapper from '../../constants/wrapper';

const constants = [
];

const requests = ["LOAD_ASSESSMENT_META"];

export const Constants = wrapper(constants, requests);

export const loadAssessmentMeta = () => ({
  type: Constants.LOAD_ASSESSMENT_META
});
