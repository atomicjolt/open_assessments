import React      from 'react';
import _          from 'lodash';
import localize from '../../../../locales/localize';

export class DropZone extends React.Component {
  static propTypes = {
    zone: React.PropTypes.shape({
      id: React.PropTypes.string,
    }).isRequired,
    target: React.PropTypes.shape({
      getBoundingClientRect: React.PropTypes.func,
    }),
    editZone: React.PropTypes.func.isRequired,
    setActive: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
    language: React.PropTypes.string
  };

  static saveZoneToState(zone) {
    const xPos = zone.xPos || 20;
    const yPos = zone.yPos || 20;
    return {
      leftPos: xPos,
      topPos: yPos,
      rightPos: xPos + zone.width,
      bottomPos: yPos + zone.height,
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
    // We use window to account for scroll
    const targetTop = target.top + window.scrollY;
    const targetLeft = target.left + window.scrollX;
    const targetBottom = targetTop + target.height;
    const targetRight = targetLeft + target.width;

    const newY = DropZone.boundaryCheck(y - targetTop, targetBottom - targetTop);
    const newX = DropZone.boundaryCheck(x - targetLeft, targetRight - targetLeft);

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

  render() {
    const { zone, isActive, language } = this.props;
    const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
    const strings = this.props.localizeStrings('dropZone');
    const labelText = _.get(zone, `labels[${language}].text`, '');

    return (
      <div
        className={`au-c-drop-zone ${isActive ? 'is-active' : ''}`}
        style={this.zonePosition()}
        onClick={this.props.setActive}
      >
        <div className={`au-c-zone ${isActive ? 'is-active' : ''}`}>
          {
            _.map(corners, corner => (
              <div
                className={`au-c-zone-corner-${corner} au-c-zone-position`}
                key={`zone_corner_${zone.id}_${corner}`}
                draggable
                onDrag={e => this.moveCorner(corner, e.pageX, e.pageY)}
                onDragEnd={() => this.updateZone()}
              />
            ))
          }
          <div
            className="au-c-zone-middle"
            draggable
            onMouseDown={e => this.setState({ initialX: e.pageX, initialY: e.pageY })}
            onDrag={e => this.moveZone(e.pageX, e.pageY)}
            onDragEnd={() => {
              this.setState({ initialX: null, initialY: null });
              this.updateZone();
            }}
          />
        </div>

        <div className="au-c-drop-zone__tag">
          {_.capitalize(zone.type)} {String.fromCharCode(zone.index + 65)}
        </div>

        <div className="au-c-drop-zone__tool-tip is-right">
          <div className="au-c-input au-c-input-label--left au-c-input--white">
            <label htmlFor={`dropZone_${zone.id}`}>{strings.label}</label>
            <div className="au-c-input__contain">
              <input
                id={`dropZone_${zone.id}`}
                className="au-c-text-input au-c-text-input--smaller"
                defaultValue={labelText}
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

export default localize(DropZone);
