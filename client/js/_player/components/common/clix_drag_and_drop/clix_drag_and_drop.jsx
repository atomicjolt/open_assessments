import React  from 'react';
import _      from 'lodash';

import withDragDropContext  from '../with_drag_drop_context';
import ClixDropZone         from './clix_drop_zone';
import Droppable            from './droppable';

export class ClixDragAndDrop extends React.Component {
  static propTypes = {
    answers: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    zones: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    targets: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string,
    })),
    selectAnswer: React.PropTypes.func,
    selectedAnswers: React.PropTypes.arrayOf(React.PropTypes.shape({}))
  };

  deselectAnswer(item) {
    if (item.previousZoneIndex > -1) {
      this.props.selectAnswer({
        id: {
          id: item.droppable.id,
          zoneIndex: item.previousZoneIndex,
        }
      });
    }
  }

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
      coordinateValues.push(zone.spatialUnit.coordinateValues[0]);
      coordinateValues.push(zone.spatialUnit.coordinateValues[1]);
    }

    const answer = {
      id: {
        id: item.droppable.id,
        zoneIndex,
      },
      ...item,
      zoneIndex,
      containerId: target.id,
      coordinateValues,
    };

    this.props.selectAnswer(answer);

    /*
      This is an ugly way of updating position, but select answer toggles
      instead of updates, so if we dropped a droppable in the same zone it
      started in we send it again - the first time unselected the answer, the
      second selects it again with the new position. It might be better to
      make select answer less generic instead, but its behaviour fits most of
      the other use cases well. This also is only needed for non snap zones.
    */

    if (isDrop && zoneIndex === item.previousZoneIndex) {
      this.props.selectAnswer(answer);
    }
  }

  render() {
    return (
      <div>
        {_.map(this.props.targets, (target, targetIndex) => (
          <div
            style={{
              position: 'relative',
              height: '500px',
              width: '500px',
              background: 'grey',
            }}
          >
            <div
              ref={ref => (this[`target_${targetIndex}`] = ref)}
              dangerouslySetInnerHTML={{ __html: target.text }}
            />
            {
              _.map(this.props.zones, (zone, zoneIndex) => {
                const canDrop = (
                  !_.find(this.props.selectedAnswers, { zoneIndex }) ||
                  (zone.dropBehaviorType.indexOf('snap') === -1)
                );

                return (
                  <ClixDropZone
                    canDrop={canDrop}
                    dropItem={(item, offset) => (
                      this.selectAnswer(zoneIndex, item, targetIndex, offset)
                    )}
                    style={{
                      position: 'absolute',
                      left: zone.spatialUnit.coordinateValues[0] - (zone.spatialUnit.width / 2),
                      top: zone.spatialUnit.coordinateValues[1] - (zone.spatialUnit.height / 2),
                      height: zone.spatialUnit.height,
                      width: zone.spatialUnit.width,
                      border: '2px solid red',
                    }}
                  />
                );
              })
            }
            {
              _.map(this.props.selectedAnswers, answer => (
                <Droppable
                  style={{
                    position: 'absolute',
                    left: answer.coordinateValues[0] - (answer.width / 2),
                    top: answer.coordinateValues[1] - (answer.height / 2),
                  }}
                  droppable={answer.droppable}
                  zoneIndex={answer.zoneIndex}
                />
              ))
            }
          </div>
        ))}
        <ClixDropZone
          canDrop
          dropItem={item => (
            this.deselectAnswer(item)
          )}
          style={{ width: '500px', height: '200px', border: '2px solid grey' }}
        >
          {
            _.map(this.props.answers, answer => (
              <Droppable
                hide={!!_.find(this.props.selectedAnswers, { droppable: { id: answer.id } })}
                style={{ width: '60px' }}
                text={answer.text}
                droppable={answer}
                zoneIndex={-1}
              />
            ))
          }
        </ClixDropZone>
      </div>
    );
  }
}

export default withDragDropContext(ClixDragAndDrop);
