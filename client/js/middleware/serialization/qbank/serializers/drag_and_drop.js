import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub, languageText, buildImageTag }   from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';

function serializeTargets(originalTarget, newTarget, fileIds, language) {
  if (!newTarget) { return null; }
  const originalImage = _.get(originalTarget, `images[${language}]`, '');
  const text = buildImageTag(
    _.get(newTarget, 'text', originalImage),
    _.get(newTarget, 'altText.text'),
    fileIds
  );
  return [scrub({
    id: _.get(originalTarget, 'id'),
    text: languageText(text, language),
    name: _.get(newTarget, 'altText.text'),
    dropBehaviorType: genusTypes.target.reject,
  })];
}

function serializeZones(originalZones, newZones, targetId, visible, language) {
  if (!newZones && _.isNil(visible)) { return null; }
  const zones = _.map(originalZones, (zone) => {
    const originalLabel = _.get(zones, `labels[${language}].text`, '');

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
      name: languageText(_.get(newZone, 'label', originalLabel), language),
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

function serializeDroppables(originalDroppables, newDroppables, fileIds, language) {
  if (!newDroppables) { return null; }
  const droppables =  _.map(originalDroppables, (droppable) => {
    const newDroppable = _.get(newDroppables, `[${droppable.id}]`, {});
    const images = _.merge(
      {}, droppable.images, newDroppable.images
    );
    const labels = _.merge({}, droppable.labels, newDroppable.labels);
    const image = newDroppable.text || _.get(images, `${language}.text`, '');
    const label = _.get(labels, `${language}.text`, '');
    const altText = _.get(droppable, `altTexts[${language}].text`, label);
    const text = buildImageTag(image, altText, fileIds);

    return scrub({
      id: droppable.id,
      text: languageText(text, language),
      dropBehaviorType: genusTypes.zone[_.get(newDroppable, 'type', droppable.type)],
      name: languageText(label, language),
      reuse: 1,
      delete: _.get(newDroppable, 'delete'),
    });
  });

  if (newDroppables && newDroppables.new) {
    const newAltText = _.get(newDroppables, 'new.altText.text');
    const newText = buildImageTag(newDroppables.new.text, newAltText, fileIds);
    droppables.push({
      text: languageText(newText, language),
      dropBehaviorType: genusTypes.zone.snap,
      reuse: 1,
    });
  }
  return droppables;
}

function serializeQuestion(originalQuestion, newQuestionAttributes, language) {
  const fileIds = { ...originalQuestion.fileIds, ...newQuestionAttributes.fileIds };
  const newQuestion = {
    targets: serializeTargets(
      originalQuestion.target,
      newQuestionAttributes.target,
      fileIds,
      language
    ),
    droppables: serializeDroppables(
      originalQuestion.dropObjects,
      newQuestionAttributes.dropObjects,
      fileIds,
      language
    ),
    zones: serializeZones(
      originalQuestion.zones,
      newQuestionAttributes.zones,
      _.get(originalQuestion, 'target.id'),
      _.get(newQuestionAttributes, 'visibleZones'),
      language
    ),
  };

  return scrub(newQuestion);
}

function serializeAnswers(oldDropObjects, dropObjects, oldAnswers,
  correctFeedback, incorrectFeedback, language) {
  const answers = [];

  let correctAnswer = {
    id: _.get(_.find(oldAnswers, { genusTypeId: genusTypes.answer.rightAnswer }), 'id'),
    genusTypeId: genusTypes.answer.rightAnswer,
    feedback: languageText(_.get(correctFeedback, 'text'), language),
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
    feedback: languageText(_.get(incorrectFeedback, 'text'), language),
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

  const { question, language } = newItemAttributes;
  if (question) {
    newItem.question = {
      ...newItem.question,
      ...serializeQuestion(originalItem.question, question, language)
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
      _.get(question, 'incorrectFeedback'),
      language
    );
  }

  return scrub(newItem);
}
