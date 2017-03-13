// Needs to send up timeValue

import { baseItem } from './base';

export default function fileUploadSerializer(originalItem, newItemAttributes) {
  return baseItem(originalItem, newItemAttributes);
}
