import _                  from 'lodash';
import baseDeserializer   from './base';
import { getQbankType }   from '../../../../constants/genus_types';
import { getImageUrl }    from '../../serializer_utils';

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
  _.forEach(zones, (zone) => {
    newZones[zone.id] = {
      id: zone.id,
      label: zone.name,
      height: zone.spatialUnit.height,
      width: zone.spatialUnit.width,
      xPos: zone.spatialUnit.coordinateValues[0],
      yPos: zone.spatialUnit.coordinateValues[1],
      type: getQbankType(zone.dropBehaviorType),
    };
  });
  return newZones;
}

function deserializeDropObjects(droppables) {
  const newDropObjects = {};
  _.forEach(droppables, (droppable) => {
    newDropObjects[droppable.id] = {
      id: droppable.id,
      label: droppable.name,
      image: getImageUrl(droppable.text),
      type: getQbankType(droppable.dropBehaviorType)
    };
  });
  return newDropObjects;
}

export default function dragAndDrop(item) {
  const newItem = baseDeserializer(item);

  newItem.question = {
    ...newItem.question,
    target: deserializeTarget(_.get(item, 'question.targets')),
    zones: deserializeZones(_.get(item, 'question.zones')),
    dropObjects: deserializeDropObjects(_.get(item, 'question.droppables')),
  };

  return newItem;
}
