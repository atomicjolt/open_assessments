import _                         from 'lodash';
import baseSerializer            from './base';
import { scrub }                 from '../../serializer_utils';
import genusTypes                from '../../../../constants/genus_types';
import guid                      from '../../../../utils/guid';

// _.get is my new cocaine
function serializeTargets(originalTarget, newTarget) {
  // TODO: not spider-man
  // const label = _.get(newTarget, 'label', originalTarget.label);
  return [{
    id: _.get(originalTarget, 'id', guid()),
    text: `<p><img src="http://i1.kym-cdn.com/photos/images/facebook/000/741/494/bcf.jpg" alt="target_area" /></p>`,
    // name: label,
    dropBehaviorType: genusTypes.target.reject,
  }];
}

function serializeZones(originalZones, newZones, targetId) {
  return _.map(originalZones, (zone) => {
    const newZone = newZones[zone.id];
    return {
      id: _.get(zone, 'id', guid()),
      spatialUnit: {
        height: _.get(newZone, 'height', zone.height),
        width: _.get(newZone, 'width', zone.width),
        // TODO: fis this for zeros
        coordinateValues: [_.get(newZone, 'xPos', zone.xPos), _.get(newZone, 'yPos', zone.xPos)],
        recordType: genusTypes.zone.rectangle,
      },
      reuse: 0, // an integer field to indicate how many times something can be re-used (zone or droppable) 0 is infinite
      dropBehaviorType: genusTypes.zone[_.get(newZone, 'type', zone.type)],
      name: _.get(newZone, 'label', zone.label),
      visible: true,    // Right?
      containerId: targetId,
      // description: 'left of ball'   // Dunno what this is for
    };
  });
}

function serializeDroppables(originalDroppables, newDroppables) {
  return _.map(originalDroppables, (droppable) => {
    const newDroppable = newDroppables[droppable.id];
    // TODO: not spider-man
    return {
      text: `<p><img src="http://i0.kym-cdn.com/photos/images/facebook/000/110/268/tumblr_lisp6ohmdy1qb3l9fo1_500.jpg" alt="${_.get(newDroppable, 'label', droppable.label)}" /></p>`,
      dropBehaviorType: genusTypes.zone[_.get(newDroppable, 'type', droppable.type)],
      name: _.get(newDroppable, 'label', droppable.label),
      reuse: 1,  // an integer field to indicate how many times something can be re-used (zone or droppable) 0 is infinite
    };
  });
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
