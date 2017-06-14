import { Constants, updatePrevBtnSetting, updateNofM } from './assessments';

describe('updateNofM action', () => {
  it('returns null offeredId if no assessmentOffered attribute', () => {
    const assessment = {
      bankId: 1,
      id: 0
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.assessmentOfferedId).toEqual(null);
  });

  it('returns null offeredId if assessmentOffered is empty list', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: []
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.assessmentOfferedId).toEqual(null);
  });

  it('returns the first offeredId', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: [{
        id: 2
      }, {
        id: 45
      }]
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.assessmentOfferedId).toEqual(2);
  });

  it('returns the body with nOfM as the key', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: [{
        id: 1
      }]
    };
    const nOfM = 57;
    const result = updateNofM(assessment, nOfM);
    expect('nOfM' in result.body).toEqual(true);
    expect(result.body.nOfM).toEqual(57);
  });

  it('appends the bankId', () => {
    const assessment = {
      bankId: 1,
      id: 0
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.bankId).toEqual(1);
  });

  it('appends the assessmentId', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.assessmentId).toEqual(1);
  });

  it('throws an exception when missing bankId', () => {
    const assessment = {
      id: 1
    };
    const nOfM = 0;
    expect(() => { updateNofM(assessment, nOfM); }).toThrow(new Error('Assessment missing `bankId`'));
  });

  it('throws an exception when missing assessmentId', () => {
    const assessment = {
      bankId: 1
    };
    const nOfM = 0;
    expect(() => { updateNofM(assessment, nOfM); }).toThrow(new Error('Assessment missing `id`'));
  });

  it('returns apiCall as true', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.apiCall).toEqual(true);
  });

  it('has the UPDATE_N_OF_M type', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const nOfM = 0;
    const result = updateNofM(assessment, nOfM);
    expect(result.type).toEqual(Constants.UPDATE_N_OF_M);
  });

  it('throws exception if `assessment` is null', () => {
    const nOfM = 0;
    expect(() => { updateNofM(null, nOfM); }).toThrow(new Error('Must provide `assessment` argument'));
  });

  it('throws exception if `assessment` is undefined', () => {
    const nOfM = 0;
    expect(() => { updateNofM(undefined, nOfM); }).toThrow(new Error('Must provide `assessment` argument'));
  });

  it('throws exception if `nOfM` is null', () => {
    const assessment = {};
    expect(() => { updateNofM(assessment, null); }).toThrow(new Error('Must provide `nOfM` argument'));
  });

  it('throws exception if `nOfM` is undefined', () => {
    const assessment = {};
    expect(() => { updateNofM(assessment, undefined); }).toThrow(new Error('Must provide `nOfM` argument'));
  });
});

describe('updatePrevBtnSetting action', () => {
  it('returns null offeredId if no assessmentOffered attribute', () => {
    const assessment = {
      bankId: 1,
      id: 0
    };
    const unlockPrevious = 'NEVER';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.assessmentOfferedId).toEqual(null);
  });

  it('returns null offeredId if assessmentOffered is empty list', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: []
    };
    const unlockPrevious = 'ALWAYS';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.assessmentOfferedId).toEqual(null);
  });

  it('returns the first offeredId', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: [{
        id: 2
      }, {
        id: 45
      }]
    };
    const unlockPrevious = 'ALWAYS';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.assessmentOfferedId).toEqual(2);
  });

  it('returns the body with unlockPrevious as the key', () => {
    const assessment = {
      bankId: 1,
      id: 0,
      assessmentOffered: [{
        id: 1
      }]
    };
    const unlockPrevious = 'NEVER';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect('unlockPrevious' in result.body).toEqual(true);
    expect(result.body.unlockPrevious).toEqual('NEVER');
  });

  it('appends the bankId', () => {
    const assessment = {
      bankId: 1,
      id: 0
    };
    const unlockPrevious = 'ALWAYS';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.bankId).toEqual(1);
  });

  it('appends the assessmentId', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const unlockPrevious = 'NEVER';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.assessmentId).toEqual(1);
  });

  it('throws an exception when missing bankId', () => {
    const assessment = {
      id: 1
    };
    const unlockPrevious = 'ALWAYS';
    expect(() => { updatePrevBtnSetting(assessment, unlockPrevious); }).toThrow(new Error('Assessment missing `bankId`'));
  });

  it('throws an exception when missing assessmentId', () => {
    const assessment = {
      bankId: 1
    };
    const unlockPrevious = 'ALWAYS';
    expect(() => { updatePrevBtnSetting(assessment, unlockPrevious); }).toThrow(new Error('Assessment missing `id`'));
  });

  it('returns apiCall as true', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const unlockPrevious = 'NEVER';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.apiCall).toEqual(true);
  });

  it('has the UPDATE_UNLOCK_PREVIOUS type', () => {
    const assessment = {
      bankId: 31,
      id: 1
    };
    const unlockPrevious = 'NEVER';
    const result = updatePrevBtnSetting(assessment, unlockPrevious);
    expect(result.type).toEqual(Constants.UPDATE_UNLOCK_PREVIOUS);
  });

  it('throws exception if `assessment` is null', () => {
    const unlockPrevious = 'ALWAYS';
    expect(() => { updatePrevBtnSetting(null, unlockPrevious); }).toThrow(new Error('Must provide `assessment` argument'));
  });

  it('throws exception if `assessment` is undefined', () => {
    const unlockPrevious = 'ALWAYS';
    expect(() => { updatePrevBtnSetting(undefined, unlockPrevious); }).toThrow(new Error('Must provide `assessment` argument'));
  });

  it('throws exception if `unlockPrevious` is null', () => {
    const assessment = {};
    expect(() => { updatePrevBtnSetting(assessment, null); }).toThrow(new Error('Must provide `unlockPrevious` argument'));
  });

  it('throws exception if `unlockPrevious` is undefined', () => {
    const assessment = {};
    expect(() => { updatePrevBtnSetting(assessment, undefined); }).toThrow(new Error('Must provide `unlockPrevious` argument'));
  });
});
