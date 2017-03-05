import baseDeserializer   from './base';
import { createSingleCorrectFeedback } from '../../serializer_utils';

export default function fileUpload(item) {
  const newItem = baseDeserializer(item);
  newItem.question.correctFeedback = createSingleCorrectFeedback(item);

  return newItem;
}
