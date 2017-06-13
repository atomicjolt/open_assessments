import { hasOffereds } from './assessment';

describe('assessment selector', () => {
  describe('hasOffereds', () => {
    it('returns false if bankId not in state', () => {
      const action = {
        original: {
          bankId: 1
        }
      };
      const state = {
        2: {}
      };
      const result = hasOffereds(action, state);
      expect(result).toEqual(false);
    });

    it('returns false if assessmentId not in state', () => {
      const action = {
        original: {
          bankId: 1,
          assessmentId: 2
        }
      };
      const state = {
        1: {
          3: {}
        }
      };
      const result = hasOffereds(action, state);
      expect(result).toEqual(false);
    });

    it('returns false if no assessmentOffered attribute', () => {
      const action = {
        original: {
          bankId: 1,
          assessmentId: 2
        }
      };
      const state = {
        1: {
          2: {
            foo: 'bar'
          }
        }
      };
      const result = hasOffereds(action, state);
      expect(result).toEqual(false);
    });

    it('returns false if assessmentOffered is empty list', () => {
      const action = {
        original: {
          bankId: 1,
          assessmentId: 2
        }
      };
      const state = {
        1: {
          2: {
            assessmentOffered: []
          }
        }
      };
      const result = hasOffereds(action, state);
      expect(result).toEqual(false);
    });

    it('returns true if there is at least one assessmentOffered', () => {
      const action = {
        original: {
          bankId: 1,
          assessmentId: 2
        }
      };
      const state = {
        1: {
          2: {
            assessmentOffered: [{
              foo: 'bar'
            }]
          }
        }
      };
      const result = hasOffereds(action, state);
      expect(result).toEqual(true);
    });
  });
});
