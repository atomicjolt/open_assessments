import Request from 'superagent';
import superagentMock from 'superagent-mock';

import Config from './superagent-qbank-mock-config';

import Helper from '../../specs_support/helper';
import qbank   from './qbank';
import { Constants } from '../actions/qbank/assessments';

let mockedCall;

const logger = function(log) {
  mockedCall = log;
};

const mock = superagentMock(Request, Config, logger);

const apiUrl = 'https://www.example.com';
const store = Helper.mockStore({
  jwt: 'jwt_token',
  settings: {
    api_url: apiUrl,
    csrf_token: 'csrf_token'
  }
});

describe('qbank middleware', () => {
  afterAll(() => {
    mock.unset();
  });

  it('creates an assessment offered for N of M if none passed in', () => {
    const bankId = 1;
    const assessmentId = 2;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessments/${assessmentId}/assessmentsoffered`;
    const action = {
      bankId,
      assessmentId
    };

    qbank[Constants.UPDATE_N_OF_M](store, action);
    expect(mockedCall.mocked).toEqual(true);
    // no offered, so creates one
    expect(mockedCall.data).toEqual({ dummyId: '123' });
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('POST');
  });

  it('creates an assessment offered with the given N of M values, if no offered', () => {
    const bankId = 1;
    const assessmentId = 2;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessments/${assessmentId}/assessmentsoffered`;
    const action = {
      bankId,
      assessmentId,
      body: {
        nOfM: 32
      }
    };

    qbank[Constants.UPDATE_N_OF_M](store, action);
    expect(mockedCall.mocked).toEqual(true);
    // no offered, so creates one
    expect(mockedCall.data).toEqual(action.body);
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('POST');
  });

  it('updates an existing offered with N of M value', () => {
    const bankId = 1;
    const assessmentOfferedId = 3;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessmentsoffered/${assessmentOfferedId}`;
    const action = {
      bankId,
      assessmentOfferedId,
      body: {
        nOfM: 32
      }
    };

    qbank[Constants.UPDATE_N_OF_M](store, action);
    expect(mockedCall.mocked).toEqual(true);
    expect(mockedCall.data).toEqual(action.body);
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('PUT');
  });

  it('creates an assessment offered for unlockPrevious if none passed in', () => {
    const bankId = 1;
    const assessmentId = 2;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessments/${assessmentId}/assessmentsoffered`;
    const action = {
      bankId,
      assessmentId
    };

    qbank[Constants.UPDATE_UNLOCK_PREVIOUS](store, action);
    expect(mockedCall.mocked).toEqual(true);
    // no offered, so creates one
    expect(mockedCall.data).toEqual({ dummyId: '123' });
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('POST');
  });

  it('creates an assessment offered with the given unlockPrevious value, if no offered', () => {
    const bankId = 1;
    const assessmentId = 2;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessments/${assessmentId}/assessmentsoffered`;
    const action = {
      bankId,
      assessmentId,
      body: {
        unlockPrevious: 'ALWAYS'
      }
    };

    qbank[Constants.UPDATE_UNLOCK_PREVIOUS](store, action);
    expect(mockedCall.mocked).toEqual(true);
    // no offered, so creates one
    expect(mockedCall.data).toEqual(action.body);
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('POST');
  });

  it('updates an existing offered with unlockPrevious value', () => {
    const bankId = 1;
    const assessmentOfferedId = 3;
    const url = `https://www.example.com/assessment/banks/${bankId}/assessmentsoffered/${assessmentOfferedId}`;
    const action = {
      bankId,
      assessmentOfferedId,
      body: {
        unlockPrevious: 'NEVER'
      }
    };

    qbank[Constants.UPDATE_UNLOCK_PREVIOUS](store, action);
    expect(mockedCall.mocked).toEqual(true);
    expect(mockedCall.data).toEqual(action.body);
    expect(mockedCall.url).toEqual(url);
    expect(mockedCall.method).toEqual('PUT');
  });
});
