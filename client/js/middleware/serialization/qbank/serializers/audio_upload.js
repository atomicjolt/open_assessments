import _                                        from 'lodash';
import { baseItem }                             from './base';
import { scrub, getSingleCorrectAnswer }        from '../../serializer_utils';

export default function audioUploadSerializer(originalItem, newItemAttributes) {
  const { question } = newItemAttributes;

  const newItem = baseItem(originalItem, newItemAttributes);

  if (question) {
    if (question.correctFeedback) {
      newItem.answers = [getSingleCorrectAnswer(originalItem, question)];
    }

    if (!_.isEmpty(_.get(newItemAttributes, 'question.timeValue', {}))) {
      newItem.question.timeValue = _.merge(
        {},
        newItemAttributes.question.timeValue
      );
    }
  }
  return scrub(newItem);
}
