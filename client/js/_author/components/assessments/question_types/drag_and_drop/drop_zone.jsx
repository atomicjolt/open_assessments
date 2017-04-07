import React      from 'react';
import _          from 'lodash';

export default class DropZone extends React.Component {
  static propTypes = {
    zone: React.PropTypes.shape({
      id: React.PropTypes.string,
    }).isRequired,
    target: React.PropTypes.shape({
      getBoundingClientRect: React.PropTypes.func,
    }),
    editZone: React.PropTypes.func.isRequired,
    setActive: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
  };

  static saveZoneToState(zone) {
    return {
      leftPos: zone.xPos,
      topPos: zone.yPos,
      rightPos: zone.xPos + zone.width,
      bottomPos: zone.yPos + zone.height,
      initialX: null,
      initialY: null,
    };
  }

  static boundaryCheck(pos, boundary) {
    if (pos < 0) { return 0; }
    if (pos > boundary) { return boundary; }
    return pos;
  }

  constructor(props) {
    super(props);
    this.state = DropZone.saveZoneToState(props.zone);
  }

  zonePosition() {
    const { leftPos, topPos, rightPos, bottomPos } = this.state;
    return {
      position: 'absolute',
      top: `${topPos}px`,
      left: `${leftPos}px`,
      height: `${bottomPos - topPos}px`,
      width:  `${rightPos - leftPos}px`,
    };
  }

  moveCorner(corner, x, y) {
    const { leftPos, topPos, rightPos, bottomPos } = this.state;
    const target = this.props.target.getBoundingClientRect();

    const newY = DropZone.boundaryCheck(y - target.top, target.bottom - target.top);
    const newX = DropZone.boundaryCheck(x - target.left, target.right - target.left);
    const newTop = topPos < bottomPos ? newY : bottomPos;
    const newBottom = bottomPos < topPos ? topPos : newY;
    const newLeft = leftPos < rightPos ? newX : rightPos;
    const newRight = rightPos < leftPos ? leftPos : newX;

    if (!newTop || !newBottom || !newLeft || !newRight) { return; }

    switch (corner) {
      case 'topLeft':
        this.setState({
          topPos: newTop,
          leftPos: newLeft,
        });
        break;
      case 'topRight':
        this.setState({
          topPos: newTop,
          rightPos: newRight,
        });
        break;
      case 'bottomLeft':
        this.setState({
          bottomPos: newBottom,
          leftPos: newLeft,
        });
        break;
      case 'bottomRight':
        this.setState({
          bottomPos: newBottom,
          rightPos: newRight,
        });
        break;
      default:
        break;
    }
  }

  moveZone(x, y) {
    const { leftPos, topPos, rightPos, bottomPos, initialX, initialY } = this.state;
    const target = this.props.target.getBoundingClientRect();
    if (!x || !y) { return; }

    const deltaX = x - initialX;
    const deltaY = y - initialY;

    const newLeft = DropZone.boundaryCheck(leftPos + deltaX, target.right - target.left);
    const newTop = DropZone.boundaryCheck(topPos + deltaY, target.bottom - target.top);
    const newRight = DropZone.boundaryCheck(rightPos + deltaX, target.right - target.left);
    const newBottom = DropZone.boundaryCheck(bottomPos + deltaY, target.bottom - target.top);

    const updatedPositions = {
      initialX: x,
      initialY: y,
    };

    if (newLeft) {
      updatedPositions.rightPos = newRight;
    }
    if (newTop) {
      updatedPositions.bottomPos = newBottom;
    }
    if (newRight !== target.right - target.left) {
      updatedPositions.leftPos = newLeft;
    }
    if (newBottom !== target.bottom - target.top) {
      updatedPositions.topPos = newTop;
    }

    this.setState(updatedPositions);
  }

  updateZone() {
    const { leftPos, topPos, rightPos, bottomPos } = this.state;

    this.props.editZone(this.props.zone.id, {
      xPos: leftPos,
      yPos: topPos,
      height: bottomPos - topPos,
      width: rightPos - leftPos,
    });
  }

  // TODO: Some of this could be extracted to css, other parts not so much
  styles() {
    const manipulators = {
      display: this.props.isActive ? '' : 'none',
    };

    return {
      positioning: {
        position: 'absolute',
        height: '10px',
        width: '10px',
        border: '1px solid black',
        backgroundColor: 'white',
        ...manipulators,
      },
      topLeft: {
        top: '-5px',
        left: '-5px',
        cursor: 'nwse-resize',
      },
      topRight: {
        top: '-5px',
        right: '-5px',
        cursor: 'nesw-resize',
      },
      bottomLeft: {
        bottom: '-5px',
        left: '-5px',
        cursor: 'nesw-resize',
      },
      bottomRight: {
        bottom: '-5px',
        right: '-5px',
        cursor: 'nwse-resize',
      },
      middleSelector: {
        position: 'absolute',
        cursor: 'move',
        top: '5px',
        left: '5px',
        width: 'calc(100% - 10px)',
        height: 'calc(100% - 10px)',
        ...manipulators,
      },
      manipulators,
    };
  }

  render() {
    const { zone } = this.props;
    const styles = this.styles();
    const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

    return (
      <div
        className="au-c-drop-zone au-c-zone1 is-active"
        style={this.zonePosition(zone)}
        onClick={this.props.setActive}
      >
        {
          _.map(corners, corner => (
            <div
              key={`zone_corner_${zone.id}_${corner}`}
              style={{ ...styles.positioning, ...styles[corner] }}
              draggable
              onDrag={e => this.moveCorner(corner, e.pageX, e.pageY)}
              onDragEnd={() => this.updateZone()}
            />
          ))
        }
        <div
          style={styles.middleSelector}
          draggable
          onMouseDown={e => this.setState({ initialX: e.pageX, initialY: e.pageY })}
          onDrag={e => this.moveZone(e.pageX, e.pageY)}
          onDragEnd={() => {
            this.setState({ initialX: null, initialY: null });
            this.updateZone();
          }}
        />

        <div className="au-c-drop-zone__tag">
          {_.capitalize(zone.type)} {String.fromCharCode(zone.index + 65)}
        </div>

        <div className="au-c-drop-zone__tool-tip is-right" style={styles.manipulators}>
          <div className="au-c-input au-c-input-label--left au-c-input--white">
            <label htmlFor={`dropZone_${zone.id}`}>Label</label>
            <div className="au-c-input__contain">
              <input
                id={`dropZone_${zone.id}`}
                className="au-c-text-input au-c-text-input--smaller"
                defaultValue={zone.label}
                onBlur={e => this.props.editZone(zone.id, { label: e.target.value })}
                type="text"
              />
              <div className="au-c-input__bottom" />
            </div>
          </div>
          <button
            className="au-c-btn au-c-btn--square"
            onClick={() => this.props.editZone(zone.id, { delete: true })}
          >
            <i className="material-icons">delete</i>
          </button>
        </div>

      </div>
    );
  }
}
