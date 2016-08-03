import React                            from 'react';

import { FillTheBlankDraggableWord }    from '../draggable_word';
import { FillTheBlankWordDropZone }     from '../drop_zones';
import Word                             from '../word';

export default (props) => {
  // range is times two minus 1 so that we have the correct spaces for the dropzones.
  return <div className="c-answers">
    <div className="c-blank-answers">
      {
        _.map(props.sentenceWords, (wordHtml, index) => {
          if(wordHtml.indexOf("interaction-placeholder") >= 0) {
            if(!_.isEmpty(props.selectedAnswer)) {
              return <div key={`${props.selectedAnswer.id}-${index}`} className="c-blank-drop-zone">
                <FillTheBlankDraggableWord
                  id={props.selectedAnswer.id}
                  material={props.selectedAnswer.material}
                  wordClassName="c-word c-word--blank"
                />
              </div>
            } else {
              return <FillTheBlankWordDropZone
                  className="c-blank-drop-zone"
                  key={index}
                  dropItem={(answerId) => { props.linkWord(answerId) }}
                >
                  <div className="c-blank" />
                </FillTheBlankWordDropZone>
            }
          } else

          return <Word className="c-word c-word--fill" key={index} material={wordHtml} />
        })
      }
    </div>
  </div>
}
