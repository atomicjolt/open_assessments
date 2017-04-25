import baseSerializer                    from './base';
import { scrub, getSingleCorrectAnswer } from '../../serializer_utils';

export default function fileUploadSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);
  const { question, language } = newItemAttributes;

  if (question && question.correctFeedback) {
    newItem.answers = [
      getSingleCorrectAnswer(originalItem, question, language)
    ];
  }

  return scrub(newItem);
}
