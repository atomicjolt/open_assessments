import Network                                          from '../constants/network';
import server                                           from './server';
import { Constants as BankConstants }                   from '../actions/banks';

const qbank = {
  [BankConstants.GET_BANKS]: {
    method : Network.GET,
    url    : () => 'https://qbank-clix-dev.mit.edu/api/v1/assessment/banks',
  },

  [BankConstants.GET_ASSESSMENTS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments`,
  },

  [BankConstants.CREATE_ASSESSMENT]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments`,
  },

  [BankConstants.DELETE_ASSESSMENT]: {
    method : Network.DEL,
    url    : action => `/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}`,
  },

  [BankConstants.PUBLISH_ASSESSMENT]: {
    method : Network.POST,
    url    : action => `/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assignedBankIds`,
  },
};

export default { ...server, ...qbank };
