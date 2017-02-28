import _    from 'lodash';

export function scrub(item) {
  let scrubbedItem = _.cloneDeep(item);
  scrubbedItem = _.omitBy(scrubbedItem, _.isNil);
  scrubbedItem = _.omitBy(scrubbedItem, temp => _.isObject(temp) && _.isEmpty(temp));
  return scrubbedItem;
}
