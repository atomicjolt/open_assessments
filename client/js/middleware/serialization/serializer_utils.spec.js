import _          from 'lodash';
import { scrub }  from './serializer_utils';

describe('scrub', () => {
  it('returns an array when it is passed an array', () => {
    expect(_.isArray(scrub([]))).toBeTruthy();
  });

  it('removes falsey and empty values from arrays', () => {
    expect(scrub([null, undefined, {}, []])).toEqual([]);
  });

  it('returns an object when it is passed an object', () => {
    expect(_.isPlainObject(scrub({}))).toBeTruthy();
  });

  it('removes falsey and empty values from objects', () => {
    expect(scrub({ a: null, b: undefined, c: {}, d: [] })).toEqual({});
  });

  it('excludes specified keys from objects', () => {
    expect(scrub({ a: null, b: undefined, c: {}, d: [] }, ['a'])).toEqual({ a: null });
  });
});
