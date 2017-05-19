import _                           from 'lodash';
import baseDeserializer            from './base';
import { getQbankType, types }     from '../../../../constants/genus_types';
import { languages }               from '../../../../constants/language_types';
import { getImageUrl, getAltText } from '../../serializer_utils';

function toLanguageObject(textObjects) {
  return _.reduce(textObjects,
    (all, textObject) => ({ ...all, [textObject.languageTypeId]: textObject }), {});
}

function deserializeTarget(targets) {
  const target = targets[0];
  if (target) {

    const images = {};
    _.each(
      target.texts,
      (text) => { images[text.languageTypeId] = getImageUrl(text.text); }
    );

    return {
      id: target.id,
      image: images[languages.languageTypeId.english],
      images
    };
  }
  return {};
}

function deserializeZone(zone) {
  const labels = _.reduce(zone.names, (all, name) => ({
    ...all,
    [name.languageTypeId]: name
  }), {});
  return {
    id: zone.id,
    label: _.get(labels, `[${languages.languageTypeId.english}].text`),
    labels,
    height: zone.spatialUnit.height,
    width: zone.spatialUnit.width,
    xPos: zone.spatialUnit.coordinateValues[0],
    yPos: zone.spatialUnit.coordinateValues[1],
    type: getQbankType(zone.dropBehaviorType),
    index: zone.index
  };
}

function deserializeZones(zones) {
  const newZones = {};
  _.forEach(zones, (zone, index) => {
    newZones[zone.id] = deserializeZone({ ...zone, index });
  });
  return newZones;
}

function deserializeDropObject(droppable, zoneCondition) {
  const imageTexts = _.map(
    droppable.texts,
    (text) => {
      const imageText = getImageUrl(text.text);
      return { ...text, text: imageText };
    }
  );
  const imageAltTexts = _.map(
    droppable.texts,
    (text) => {
      const imageText = getAltText(text.text);
      return { ...text, text: imageText };
    }
  );

  const altTexts = toLanguageObject(imageAltTexts);
  const labels = toLanguageObject(droppable.names);
  const images = toLanguageObject(imageTexts);

  return {
    id: droppable.id,
    label: _.get(labels, `[${languages.languageTypeId.english}].text`),
    labels,
    image: _.get(images, `[${languages.languageTypeId.english}].text`),
    images,
    type: getQbankType(droppable.dropBehaviorType),
    correctZone: _.get(zoneCondition, 'zoneId'),
    altTexts
  };
}

function deserializeDropObjects(droppables, zoneConditions) {
  const newDropObjects = {};
  _.forEach(droppables, (droppable) => {
    const zoneCondition = _.find(zoneConditions, { droppableId: droppable.id });
    newDropObjects[droppable.id] = deserializeDropObject(droppable, zoneCondition);
  });
  return newDropObjects;
}

export default function dragAndDrop(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: types.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: types.answer.wrongAnswer });

  newItem.question = {
    ...newItem.question,
    target: deserializeTarget(_.get(item, 'question.multiLanguageTargets')),
    zones: deserializeZones(_.get(item, 'question.multiLanguageZones')),
    visibleZones: _.get(item, 'question.zones[0].visible'),
    dropObjects: deserializeDropObjects(
      _.get(item, 'question.multiLanguageDroppables'),
      _.get(correctAnswer, 'zoneConditions')),
    correctFeedback: {
      text: _.get(correctAnswer, 'feedback.text'),
      texts: _.get(correctAnswer, 'feedbacks'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      text: _.get(incorrectAnswer, 'feedback.text'),
      texts: _.get(incorrectAnswer, 'feedbacks'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
