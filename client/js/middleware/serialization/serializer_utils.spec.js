import _          from 'lodash';
import { scrub }  from './serializer_utils';

describe('scrub', () => {
  describe('arrays', () => {
    it('returns an array when it is passed an array', () => {
      expect(_.isArray(scrub([]))).toBeTruthy();
    });

    it('removes falsey and empty values', () => {
      expect(scrub([null, undefined, {}, []])).toEqual([]);
    });
  });

  describe('objects', () => {
    it('returns an object when it is passed an array', () => {
      expect(_.isPlainObject(scrub({}))).toBeTruthy();
    });

    it('removes falsey and empty values', () => {
      expect(scrub({ a: null, b: undefined, c: {}, d: [] })).toEqual({});
    });

    it('excludes specified keys', () => {
      expect(scrub({ a: null, b: undefined, c: {}, d: [] }, ['a'])).toEqual({ a: null });
    });
  });
});
