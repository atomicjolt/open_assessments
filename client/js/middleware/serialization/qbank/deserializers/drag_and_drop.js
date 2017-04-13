import _                        from 'lodash';
import baseDeserializer         from './base';
import { getQbankType, types }  from '../../../../constants/genus_types';
import { getImageUrl }          from '../../serializer_utils';


function deserializeTarget(targets) {
  const target = targets[0];
  if (target) {
    return {
      id: target.id,
      image: getImageUrl(target.text),
    };
  }
  return {};
}

function deserializeZones(zones) {
  const newZones = {};
  _.forEach(zones, (zone, index) => {
    newZones[zone.id] = {
      id: zone.id,
      label: zone.name,
      height: zone.spatialUnit.height,
      width: zone.spatialUnit.width,
      xPos: zone.spatialUnit.coordinateValues[0],
      yPos: zone.spatialUnit.coordinateValues[1],
      type: getQbankType(zone.dropBehaviorType),
      index
    };
  });
  return newZones;
}

function deserializeDropObjects(droppables, zoneConditions) {
  const newDropObjects = {};
  _.forEach(droppables, (droppable) => {
    newDropObjects[droppable.id] = {
      id: droppable.id,
      label: droppable.name,
      image: getImageUrl(droppable.text),
      type: getQbankType(droppable.dropBehaviorType),
      correctZone: _.get(_.find(zoneConditions, { droppableId: droppable.id }), 'zoneId'),
    };
  });
  return newDropObjects;
}

export default function dragAndDrop(item) {
  const newItem = baseDeserializer(item);
  const correctAnswer = _.find(item.answers, { genusTypeId: types.answer.rightAnswer });
  const incorrectAnswer = _.find(item.answers, { genusTypeId: types.answer.wrongAnswer });

  newItem.question = {
    ...newItem.question,
    target: deserializeTarget(_.get(item, 'question.targets')),
    zones: deserializeZones(_.get(item, 'question.zones')),
    visibleZones: _.get(item, 'question.zones[0].visible'),
    dropObjects: deserializeDropObjects(
      _.get(item, 'question.droppables'),
      _.get(correctAnswer, 'zoneConditions')),
    correctFeedback: {
      text: _.get(correctAnswer, 'feedback.text'),
      answerId: _.get(correctAnswer, 'id'),
      fileIds: _.get(correctAnswer, 'fileIds')
    },
    incorrectFeedback: {
      text: _.get(incorrectAnswer, 'feedback.text'),
      answerId: _.get(incorrectAnswer, 'id'),
      fileIds: _.get(incorrectAnswer, 'fileIds')
    },
  };

  return newItem;
}
