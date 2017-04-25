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
    const body = document.getElementsByTagName('body')[0];
    body.className = '';
    props.dropItem(monitor.getItem(), monitor.getClientOffset());
    return monitor.getItem();
  },
  canDrop(props) {
    return props.canDrop;
  }
};

export default DropTarget( // eslint-disable-line new-cap
  ItemTypes.CLIX_DROPPABLE,
  target,
  collect
)(Dropzone);
