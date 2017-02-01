import Network                                          from '../constants/network';
import server                                           from './server';
import { Constants as BankConstants }                   from '../actions/qbank/banks';
import { Constants as AssessmentConstants }             from '../actions/qbank/assessments';
import { Constants as ItemConstants }                   from '../actions/qbank/items';

// TODO: extract out the https://qbank-clix-dev.mit.edu bit
const qbank = {
  [BankConstants.GET_BANKS_HIERARCHY]: {
    method : Network.GET,
    url    : () => 'https://4h8n6sg95j.execute-api.us-east-1.amazonaws.com/dev/proxy',
  },

  [BankConstants.GET_ASSESSMENTS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bank.id}/assessments`,
  },

  [AssessmentConstants.CREATE_ASSESSMENT]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments`,
  },

  [AssessmentConstants.DELETE_ASSESSMENT]: {
    method : Network.DEL,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}`,
  },

  [AssessmentConstants.PUBLISH_ASSESSMENT]: {
    method : Network.POST,
    url    : action => `https://qbank-clix-dev.mit.edu//api/v1/assessment/banks/${action.bankId}/assessments/${action.assessmentId}/assignedBankIds`,
  },

  [ItemConstants.GET_ITEMS]: {
    method : Network.GET,
    url    : action => `https://qbank-clix-dev.mit.edu/api/v1/assessment/banks/${action.bank.id}/items`,
  },
};

export default { ...server, ...qbank };
