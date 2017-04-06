import React      from 'react';
import _          from 'lodash';

export default class DropZone extends React.Component {
  static propTypes = {
    zone: React.PropTypes.shape({}).isRequired,
    target: React.PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = this.saveZoneToState(props.zone);
  }

  saveZoneToState(zone) {
    return {
      leftPos: zone.xPos,
      topPos: zone.yPos,
      rightPos: zone.xPos + zone.width,
      bottomPos: zone.yPos + zone.height,
      initialX: null,
      initialY: null,
    };
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

  boundaryCheck(pos, boundary) {
    if (pos < 0) { return 0; }
    if (pos > boundary) { return boundary; }
    return pos;
  }

  moveCorner(corner, x, y) {
    const { leftPos, topPos, rightPos, bottomPos } = this.state;
    const target = this.props.target.getBoundingClientRect();

    const newY = this.boundaryCheck(y - target.top, target.bottom);
    const newX = this.boundaryCheck(x - target.left, target.right);
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
    if (!x || !y) { return; }

    const deltaX = x - initialX;
    const deltaY = y - initialY;

    this.setState({
      leftPos: leftPos + deltaX,
      topPos: topPos + deltaY,
      rightPos: rightPos + deltaX,
      bottomPos: bottomPos + deltaY,
      initialX: x,
      initialY: y,
    });
  }

  styles() {
    const border = '2px solid lime';

    return {
      positioning: {
        position: 'absolute',
        height: '10px',
        width: '10px',
      },
      topLeftSelector: {
        borderTop: border,
        borderLeft: border,
        top: '-5px',
        left: '-5px',
        cursor: 'nwse-resize',
      },
      topRightSelector: {
        borderTop: border,
        borderRight: border,
        top: '-5px',
        right: '-5px',
        cursor: 'nesw-resize',
      },
      bottomLeftSelector: {
        borderBottom: border,
        borderLeft: border,
        bottom: '-5px',
        left: '-5px',
        cursor: 'nesw-resize',
      },
      bottomRightSelector: {
        borderBottom: border,
        borderRight: border,
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
      },
    };
  }

  render() {
    const { zone } = this.props;
    const styles = this.styles();

    return (
      <div
        className="au-c-drop-zone au-c-zone1 is-active"
        style={this.zonePosition(zone)}
      >
        <div
          style={{ ...styles.positioning, ...styles.topLeftSelector }}
          draggable
          onDrag={e => this.moveCorner('topLeft', e.pageX, e.pageY)}
        />
        <div
          style={{ ...styles.positioning, ...styles.topRightSelector }}
          draggable
          onDrag={e => this.moveCorner('topRight', e.pageX, e.pageY)}
        />
        <div
          style={{ ...styles.positioning, ...styles.bottomLeftSelector }}
          draggable
          onDrag={e => this.moveCorner('bottomLeft', e.pageX, e.pageY)}
        />
        <div
          style={{ ...styles.positioning, ...styles.bottomRightSelector }}
          draggable
          onDrag={e => this.moveCorner('bottomRight', e.pageX, e.pageY)}
        />
        <div
          style={styles.middleSelector}
          draggable
          onMouseDown={e => this.setState({ initialX: e.pageX, initialY: e.pageY })}
          onDrag={e => this.moveZone(e.pageX, e.pageY)}
          onMouseUp={() => this.setState({ initialX: null, initialY: null })}
        />

        <div className="au-c-drop-zone__tag">{_.capitalize(zone.type)} {String.fromCharCode(0 + 65)}</div>

        <div className="au-c-drop-zone__tool-tip is-right" style={{ display: 'none' }}>
          <div className="au-c-input au-c-input-label--left au-c-input--white">
            <label htmlFor="">Label</label>
            <div className="au-c-input__contain">
              <input className="au-c-text-input au-c-text-input--smaller" type="text" />
              <div className="au-c-input__bottom" />
            </div>
          </div>
          <button className="au-c-btn au-c-btn--square"><i className="material-icons">delete</i></button>
        </div>

      </div>
    );
  }
}
