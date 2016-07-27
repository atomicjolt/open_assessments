import React            from 'react';

import DraggableWord    from '../draggable_word';
import { WordDropZone } from '../drop_zones';

export default (props) => {
  // range is times two minus 1 so that we have the correct spaces for the dropzones.
  return <div>
    {_.map(_.range(0, (props.sentenceChunks.length * 2) - 1), (index) => {
      if(index % 2 == 0) {
        return <div key={index} dangerouslySetInnerHTML={{__html: props.sentenceChunks[index / 2]}}></div>
      } else if(!_.isEmpty(props.selectedAnswer)) {
        return <DraggableWord
          key={`${props.selectedAnswer.id}-${index}`}
          id={props.selectedAnswer.id}
          material={props.selectedAnswer.material}
        />
      }

      return <WordDropZone key={index} style={{ display: "inline-block" }} dropItem={(answerId) => { props.linkWord(answerId) }}>
        <div className="end-drop-zone" style={{display: "inline-block", height: 23, width: 50, background: "grey"}}/>
      </WordDropZone>
    })}
  </div>
}
