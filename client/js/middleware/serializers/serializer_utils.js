import _    from 'lodash';

export function scrub(item) {
  const scrubbedItem = _.cloneDeep(item);
  // TODO: kill nulls, undefined, and empty objects with extreme prejudice
  return scrubbedItem;
}
