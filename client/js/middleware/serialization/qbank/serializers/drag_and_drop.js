import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';

function buildImageTag(url, alt, fileIds) {
  const match = /.*\/(.*)\/stream$/.exec(url);
  let resolvedUrl = url;

  if (match) {
    const guid = _.findKey(fileIds, { assetContentId: match[1] });
    resolvedUrl = `AssetContent:${guid}`;
  }

  return `<img src="${resolvedUrl}" alt="${alt}"/>`;
}

function serializeTargets(originalTarget, newTarget, fileIds) {
  if (!newTarget) { return null; }
  return [scrub({
    id: _.get(originalTarget, 'id'),
    text: buildImageTag(
      _.get(newTarget, 'text', originalTarget.image),
      _.get(newTarget, 'altText'),
      fileIds
    ),
    name: _.get(newTarget, 'altText'),
    dropBehaviorType: genusTypes.target.reject,
  })];
}

function serializeZones(originalZones, newZones, targetId, visible) {
  if (!newZones && _.isNil(visible)) { return null; }
  const zones = _.map(originalZones, (zone) => {
    const newZone = _.get(newZones, `[${zone.id}]`);
    return scrub({
      id: _.get(zone, 'id'),
      spatialUnit: {
        height: _.get(newZone, 'height', zone.height),
        width: _.get(newZone, 'width', zone.width),
        // TODO: fix this for zeros
        coordinateValues: [_.get(newZone, 'xPos', zone.xPos), _.get(newZone, 'yPos', zone.yPos)],
        recordType: genusTypes.zone.rectangle,
      },
      reuse: 0, // an integer to indicate how many times something can be re-used 0 is infinite
      dropBehaviorType: genusTypes.zone[_.get(newZone, 'type', zone.type)],
      name: _.get(newZone, 'label', zone.label),
      visible,
      containerId: targetId,
      // description: 'left of ball'   // Dunno what this is for
      delete: _.get(newZone, 'delete'),
    });
  });

  if (newZones && newZones.new) {
    zones.push({
      spatialUnit: {
        height: newZones.new.height || 100,
        width: newZones.new.width || 100,
        coordinateValues: [20, 20],
        recordType: genusTypes.zone.rectangle,
      },
      reuse: 0,
      dropBehaviorType: genusTypes.zone[newZones.new.type],
      visible,
      containerId: targetId,
      name: '',
      description: 'A new zone',
    });
  }

  return zones;
}

function serializeDroppables(originalDroppables, newDroppables, fileIds) {
  if (!newDroppables) { return null; }
  const droppables =  _.map(originalDroppables, (droppable) => {
    const newDroppable = newDroppables[droppable.id];
    return scrub({
      id: droppable.id,
      text: buildImageTag(
        _.get(newDroppable, 'image', droppable.image),
        _.get(newDroppable, 'label', droppable.label),
        fileIds
      ),
      dropBehaviorType: genusTypes.zone[_.get(newDroppable, 'type', droppable.type)],
      name: _.get(newDroppable, 'label', droppable.label),
      reuse: 1,
      delete: _.get(newDroppable, 'delete'),
    });
  });

  if (newDroppables && newDroppables.new) {
    droppables.push({
      text: buildImageTag(newDroppables.new.text, newDroppables.new.altText, fileIds),
      dropBehaviorType: genusTypes.zone.snap,
      reuse: 1,
    });
  }

  return droppables;
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const fileIds = { ...originalQuestion.fileIds, ...newQuestionAttributes.fileIds };
  const newQuestion = {
    targets: serializeTargets(originalQuestion.target, newQuestionAttributes.target, fileIds),
    droppables: serializeDroppables(
      originalQuestion.dropObjects,
      newQuestionAttributes.dropObjects,
      fileIds
    ),
    zones: serializeZones(
      originalQuestion.zones,
      newQuestionAttributes.zones,
      _.get(originalQuestion, 'target.id'),
      _.get(newQuestionAttributes, 'visibleZones')
    ),
  };
  return scrub(newQuestion);
}

function serializeAnswers(
  oldDropObjects, dropObjects, oldAnswers, correctFeedback, incorrectFeedback) {
  const answers = [];

  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: _.get(correctFeedback, 'text'),
    fileIds: _.get(correctFeedback, 'fileIds'),
    zoneConditions: scrub(_.map(oldDropObjects, (object) => {
      const zoneId = _.get(dropObjects, `[${object.id}].correctZone`, object.correctZone);
      if (zoneId) {
        return {
          droppableId: object.id,
          zoneId
        };
      }
      return null;
    })),
  };
  let incorrectAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.wrongAnswer }), 'id'),
    genusTypeId: genusTypes.answer.wrongAnswer,
    feedback: _.get(incorrectFeedback, 'text'),
    fileIds: _.get(incorrectFeedback, 'fileIds'),
    zoneConditions: [],
  };

  correctAnswer = scrub(correctAnswer);
  incorrectAnswer = scrub(incorrectAnswer);
  answers.push(correctAnswer);
  answers.push(incorrectAnswer);

  return answers;
}

export default function dragAndDrop(originalItem, newItemAttributes) {
  const newItem = baseSerializer(originalItem, newItemAttributes);

  const { question } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question)
    };
  }

  if (question.zones
    || question.dropObjects
    || question.correctFeedback
    || question.incorrectFeedback) {
    newItem.answers = serializeAnswers(
      originalItem.question.dropObjects,
      question.dropObjects,
      _.get(originalItem, 'originalItem.answers'),
      _.get(question, 'correctFeedback'),
      _.get(question, 'incorrectFeedback')
    );
  }

  return scrub(newItem);
}
