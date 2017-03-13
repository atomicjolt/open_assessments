// Needs to send up timeValue

import { baseItem } from './base';

export default function movableWordsSerializer(originalItem, newItemAttributes) {
  return baseItem(originalItem, newItemAttributes);
}
