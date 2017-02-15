import React    from 'react';
import _          from 'lodash';
import genusTypes from '../../../../constants/genus_types';
import Feedback from './question_common/single_feedback';


function getFeedback(item){
  return _.get(item, ['answers', '0', 'feedback', 'text'], '');
}

function getAudioLimit(item){
  const original = _.get(item, ['question', 'timeValue'], {
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  const time = _.mapValues(original, (t) => parseInt(t));
  const seconds = time.hours * 3600 + time.minutes * 60 + time.seconds;
  return seconds;
}

export default function (props) {
  return (
    <div>
    <div className="c-question__answers o-row" role="radiogroup">
      <div className="c-file-upload__audio-settings is-active">
        <span>Audio record limit</span>
        <div className="c-input c-input--inline">
          <label htmlFor="audio-limit"></label>
          <div className="c-input__contain">
            <input
              className="c-text-input c-text-input--smaller"
              id="audio-limit"
              type="text"
              maxLength="3"
              defaultValue={getAudioLimit(props.item)}
              onBlur={ (e) => {
                props.updateItem({
                  question:{
                    genusTypeId: genusTypes.question.audioUpload,
                    timeValue: {
                      hours: 0,
                      minutes: 0,
                      seconds: parseInt(e.target.value)
                    }
                  }
                })
              }}
            />
            <div className="c-input__bottom has-error"></div>
          </div>
        </div>
        <span>seconds. (240 maximum)</span>
        <span className="c-inline-error">Please enter a number under 240</span>
      </div>
    </div>
    <Feedback
      feedback={getFeedback(props.item)}
      updateItem={props.updateItem} />
  </div>
  );
}
