import _                  from 'lodash';
import baseDeserializer   from './base';
import genusTypes         from '../../../../constants/genus_types';

function deserializeTarget(targets) {
  return {};
}

function deserializeZones(zones) {
  return {};
}

function deserializedropObjects(droppables) {
  return {};
}

export default function dragAndDrop(item) {
  const newItem = baseDeserializer(item);

  // TODO: finish when I have data
  newItem.question = {
    ...newItem.question,
    target: deserializeTarget(_.get(item, 'question.targets')),
    zones: deserializeZones(_.get(item, 'question.zones')),
    dropObjects: deserializedropObjects(_.get(item, 'question.droppables')),
  };

  return newItem;
}
