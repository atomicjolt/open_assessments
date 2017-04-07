import React  from 'react';
import _      from 'lodash';

import withDragDropContext  from '../with_drag_drop_context';
import ClixDropZone         from './clix_drop_zone';
import Droppable            from './droppable'; // eslint-disable-line import/no-named-as-default
import CustomDragLayer      from '../custom_drag_layer'; // eslint-disable-line import/no-named-as-default

export class ClixDragAndDrop extends React.Component {
  static propTypes = {
    answers: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    zones: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    targets: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    selectAnswer: React.PropTypes.func,
    selectedAnswers: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.shape({}),
      droppable: React.PropTypes.shape({}),
    }))
  };

  selectAnswer(zoneIndex, item, targetIndex, offset) {
    const target = this.props.targets[targetIndex];
    const zone = this.props.zones[zoneIndex];
    const coordinateValues = [];
    const isDrop = zone.dropBehaviorType.indexOf('%3Adrop%40') > -1;

    if (isDrop) {
      const targetBounds = this[`target_${targetIndex}`].getBoundingClientRect();
      coordinateValues.push(offset.x - targetBounds.left);
      coordinateValues.push(offset.y - targetBounds.top);
    } else {
      coordinateValues.push(zone.spatialUnit.coordinateValues[0] + (zone.spatialUnit.width / 2));
      coordinateValues.push(zone.spatialUnit.coordinateValues[1] + (zone.spatialUnit.height / 2));
    }

    const answer = {
      id: {
        id: item.droppableId,
        zoneIndex,
      },
      ...item,
      zoneIndex,
      containerId: target.id,
      coordinateValues,
    };

    this.props.selectAnswer(answer);

    // if they dropped it in a new zone, deselect it from the old zone
    if (zoneIndex !== item.previousZoneIndex && item.previousZoneIndex > -1) {
      this.props.selectAnswer({
        id: {
          id: item.droppableId,
          zoneIndex: item.previousZoneIndex,
        }
      });
    } else if (isDrop && zoneIndex === item.previousZoneIndex) {
      /*
        This is an ugly way of updating position, but select answer toggles
        instead of updates, so if we dropped a droppable in the same zone it
        started in we send it again - the first time unselected the answer, the
        second selects it again with the new position. It might be better to
        make select answer less generic instead, but its behaviour fits most of
        the other use cases well. This also is only needed for non snap zones.
      */

      this.props.selectAnswer(answer);
    }
  }

  deselectAnswer(item) {
    if (item.previousZoneIndex > -1) {
      this.props.selectAnswer({
        id: {
          id: item.droppableId,
          zoneIndex: item.previousZoneIndex,
        }
      });
    }
  }

  renderZones(targetIndex) {
    return _.map(this.props.zones, (zone, zoneIndex) => {
      const canDrop = (
        !_.find(this.props.selectedAnswers, { zoneIndex }) ||
        (zone.dropBehaviorType.indexOf('snap') === -1)
      );

      const className = zone.dropBehaviorType.indexOf('%3Adrop%40') > -1
        ? 'c-drag-zone c-drag-zone--drop'
        : 'c-drag-zone c-drag-zone--snap';


      return (
        <ClixDropZone
          key={zoneIndex}
          className={className}
          canDrop={canDrop}
          dropItem={(item, offset) => (
            this.selectAnswer(zoneIndex, item, targetIndex, offset)
          )}
          style={{
            left: zone.spatialUnit.coordinateValues[0],
            top: zone.spatialUnit.coordinateValues[1],
            height: zone.spatialUnit.height,
            width: zone.spatialUnit.width,
          }}
        >
          {
            zone.name
            ? <div className="c-drag-zone__name">{zone.name}</div>
            : null
          }
        </ClixDropZone>
      );
    });
  }

  renderSelectedAnswers() {
    return _.map(this.props.selectedAnswers, answer => (
      <Droppable
        key={answer.droppableId}
        style={{
          position: 'absolute',
          left: answer.coordinateValues[0] - (answer.width / 2),
          top: answer.coordinateValues[1] - (answer.height / 2),
        }}
        className="c-droppable-item"
        text={answer.droppableText}
        zoneIndex={answer.zoneIndex}
        droppableId={answer.droppableId}
      />
    ));
  }

  renderAvailableAnswers() {
    return _.map(this.props.answers, (answer) => {
      const useCount = _.filter(
        this.props.selectedAnswers,
        { droppableId: answer.id }
      ).length;

      return (
        <Droppable
          key={answer.id}
          className="c-droppable-item"
          hide={useCount >= parseInt(answer.reuse, 10)}
          showWhileDragging={useCount < (answer.reuse - 1)}
          droppableId={answer.id}
          text={answer.text}
          zoneIndex={-1}
        />
      );
    });
  }

  renderTargets() {
    return _.map(this.props.targets, (target, targetIndex) => (
      <div
        key={targetIndex}
        className="c-drag-target"
        style={{
          position: 'relative',
        }}
      >
        <div
          className="c-drag-target__background"
          ref={ref => (this[`target_${targetIndex}`] = ref)}
          dangerouslySetInnerHTML={{ __html: target.text }}
        />
        {this.renderZones(targetIndex)}
        {this.renderSelectedAnswers()}
      </div>
    ));
  }

  render() {
    return (
      <div className="c-clix-drag-and-drop">
        {this.renderTargets()}
        <ClixDropZone
          canDrop
          className="c-droppable-container"
          dropItem={item => (
            this.deselectAnswer(item)
          )}
        >
          {this.renderAvailableAnswers()}
        </ClixDropZone>
        <CustomDragLayer />
      </div>
    );
  }
}

export default withDragDropContext(ClixDragAndDrop);
