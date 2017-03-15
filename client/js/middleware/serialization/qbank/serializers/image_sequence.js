import baseSerializer                    from './base';
import { scrub, getSingleCorrectAnswer } from '../../serializer_utils';

export default function imageSequenceSerializer(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);
  // const { question } = newItemAttributes;

  // if (question && question.correctFeedback) {
  //   newItem.answers = [getSingleCorrectAnswer(originalItem, question)];
  // }

  return scrub(newItem);
}
