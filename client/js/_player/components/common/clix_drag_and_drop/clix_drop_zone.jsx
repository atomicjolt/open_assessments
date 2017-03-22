import { DropTarget }   from 'react-dnd';
import { Dropzone }     from '../drop_zones';
import ItemTypes        from '../draggable_item_types';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

const target = {
  drop(props, monitor) {
    props.dropItem(monitor.getItem());
    return monitor.getItem();
  }
};

export default DropTarget(ItemTypes.CLIX_DROPPABLE, target, collect)(Dropzone);
