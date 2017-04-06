import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

function buildImageTag(url, alt) {
  return `<img src="${url}" alt="${alt}"/>`;
}

function serializeTargets(originalTarget, newTarget) {
  if (!newTarget) { return null; }
  return [scrub({
    id: _.get(originalTarget, 'id'),
    text: buildImageTag(_.get(newTarget, 'text', originalTarget.image), _.get(newTarget, 'altText')),
    name: _.get(newTarget, 'altText'),
    dropBehaviorType: genusTypes.target.reject,
  })];
}

function serializeZones(originalZones, newZones, targetId) {
  if (!newZones) { return null; }
  const zones = _.map(originalZones, (zone) => {
    const newZone = newZones[zone.id];
    return scrub({
      id: _.get(zone, 'id'),
      spatialUnit: {
        height: _.get(newZone, 'height', zone.height),
        width: _.get(newZone, 'width', zone.width),
        // TODO: fix this for zeros
        coordinateValues: [_.get(newZone, 'xPos', zone.xPos), _.get(newZone, 'yPos', zone.yPos)],
        recordType: genusTypes.zone.rectangle,
      },
      reuse: 0, // an integer field to indicate how many times something can be re-used (zone or droppable) 0 is infinite
      dropBehaviorType: genusTypes.zone[_.get(newZone, 'type', zone.type)],
      name: _.get(newZone, 'label', zone.label),
      visible: true,    // Right?
      containerId: targetId,
      // description: 'left of ball'   // Dunno what this is for
      delete: _.get(newZone, 'delete'),
    });
  });

  if (newZones && newZones.new) {
    zones.push({
      spatialUnit: {
        height: 100,
        width: 100,
        coordinateValues: [50, 50],
        recordType: genusTypes.zone.rectangle,
      },
      reuse: 0,
      dropBehaviorType: genusTypes.zone[newZones.new.type],
      visible: true,
      containerId: targetId,
      name: '',
      description: 'A new zone',
    });
  }

  return zones;
}

function serializeDroppables(originalDroppables, newDroppables) {
  if (!newDroppables) { return null; }
  const droppables =  _.map(originalDroppables, (droppable) => {
    const newDroppable = newDroppables[droppable.id];
    return scrub({
      id: droppable.id,
      text: buildImageTag(_.get(newDroppable, 'image', droppable.image), _.get(newDroppable, 'label', droppable.label)),
      dropBehaviorType: genusTypes.zone[_.get(newDroppable, 'type', droppable.type)],
      name: _.get(newDroppable, 'label', droppable.label),
      reuse: 1,  // an integer field to indicate how many times something can be re-used (zone or droppable) 0 is infinite
      delete: _.get(newDroppable, 'delete'),
    });
  });

  if (newDroppables && newDroppables.new) {
    droppables.push({
      text: buildImageTag(newDroppables.new.text, newDroppables.new.altText),
      dropBehaviorType: genusTypes.zone.snap,
      reuse: 1,
    });
  }

  return droppables;
}

function serializeQuestion(originalQuestion, newQuestionAttributes) {
  const newQuestion = {
    targets: serializeTargets(originalQuestion.target, newQuestionAttributes.target),
    droppables: serializeDroppables(
      originalQuestion.dropObjects,
      newQuestionAttributes.dropObjects
    ),
    zones: serializeZones(
      originalQuestion.zones,
      newQuestionAttributes.zones,
      _.get(originalQuestion, 'target.id')
    ),
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
