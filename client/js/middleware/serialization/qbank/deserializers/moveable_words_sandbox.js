// Should be mostly the same and MW sentance, except needs to display audio time limit

import baseDeserializer   from './base';

export default function fileUpload(item) {
  const newItem = baseDeserializer(item);
  return newItem;
}
