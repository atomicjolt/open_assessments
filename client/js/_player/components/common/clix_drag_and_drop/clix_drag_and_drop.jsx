import React               from 'react';
import _                   from 'lodash';
import { DragDropContext } from 'react-dnd';
import HTML5Backend        from 'react-dnd-html5-backend';

import ClixDropZone     from './clix_drop_zone';
import Droppable        from './droppable';

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

  render() {
    return (
      <div>
        <div
          style={{
            position: 'relative',
            height: '500px',
            width: '500px',
            background: 'grey',
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: this.props.targets[0].text }} />
          {
            _.map(this.props.zones, (zone, index) => (
              <ClixDropZone
                dropItem={droppable => this.props.selectAnswer({ zone: index, droppable })}
                style={{
                  position: 'absolute',
                  top: zone.spatialUnit.coordinateValues[1] - (zone.spatialUnit.height / 2),
                  left: zone.spatialUnit.coordinateValues[0] - (zone.spatialUnit.width / 2),
                  height: zone.spatialUnit.height,
                  width: zone.spatialUnit.width,
                  border: '2px solid red',
                }}
              >
                {
                  _.filter(this.props.selectedAnswers, { zone: index }).map(answer => (
                    <Droppable text={answer.droppable.text} droppable={answer.droppable} />
                  ))
                }
              </ClixDropZone>
            ))
          }
        </div>
        <div style={{ width: '500px', height: '200px', border: '2px solid grey' }}>
          {
            _.map(this.props.answers, answer => (
              <Droppable text={answer.text} droppable={answer} />
            ))
          }

        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(ClixDragAndDrop);
