import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function serializeTargets(originalTargets, newTargets) {
  return [];
}

function serializeZones(originalZones, newZones) {
  return [];
}

function serializeDroppables(originalDroppables, newDroppables) {
  return [];
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    targets: serializeTargets(originalQuestion.targets, newQuestionAttributes.targets),
    droppables: serializeDroppables(originalQuestion.droppables, newQuestionAttributes.droppables),
    zones: serializeZones(originalQuestion.zones, newQuestionAttributes.zones),
  };

  return scrub(newQuestion);
}

// TODO: make this when I have data
export default function dragAndDrop(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };
  }
  return scrub(newItem);
}
