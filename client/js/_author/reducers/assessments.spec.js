import banks from './assessments';

describe('assessments reducer', () => {
  describe('initial state', () => {
    it('returns empty state', () => {
      const initialState = {};
      const state = banks(initialState, {});
      expect(state).toEqual({});
    });
  });

  describe('update n of m done', () => {
    it('updates the assessment offered value', () => {
      const initialState = {
        1: {
          2: {
            assessmentOffered: [{
              nOfM: -1
            }]
          }
        }
      };
      const action = {
        original: {
          bankId: 1,
          assessmentId: 2
        },
        type: 'UPDATE_N_OF_M_DONE',
        payload: 5
      };
      const state = banks(initialState, action);
      expect(state[1][2].assessmentOffered[0].nOfM).toEqual(5);
    });

    it('does not update the assessment offered value of other assessments', () => {
      const initialState = {
        1: {
          2: {
            assessmentOffered: [{
              nOfM: -1
            }]
          }
        }
      };
      const action = {
        original: {
          bankId: 1,
          assessmentId: 3
        },
        type: 'UPDATE_N_OF_M_DONE',
        payload: 5
      };
      const state = banks(initialState, action);
      expect(state[1][2].assessmentOffered[0].nOfM).toEqual(-1);
    });
  });
});
