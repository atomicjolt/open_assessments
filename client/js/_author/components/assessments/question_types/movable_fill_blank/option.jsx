import React        from 'react';
import _            from 'lodash';
import Loader       from '../../../common/dot_loader';
import Radio        from '../question_common/option_radio';
import WordType     from '../question_common/word_type_dropdown';

export default function multipleChoiceOptions(props) {
  if (props.id === 'new') {
    return (
      <div className={`au-c-answer ${props.isActive ? 'is-active' : ''}`}>
        <div className="au-c-input">
          <Loader />
        </div>
      </div>
    );
  }

  const isActive = props.isActive ? 'is-active' : '';
  const choiceText = _.get(props, `texts[${props.language}]`, {});
  return (
    <div
      onFocus={() => props.setActiveChoice(props.id)}
      onClick={() => props.setActiveChoice(props.id)}
      className={`au-c-answer au-o-flex-center ${isActive}`}
    >
      <div className="au-c-input">
        <Radio
          id={props.id}
          itemId={props.itemId}
          isCorrect={props.isCorrect}
          updateChoice={props.updateChoice}
        />
        <label htmlFor={`${props.id}_text`} />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small"
            id={`${props.id}_text`}
            type="text"
            defaultValue={choiceText.text}
            onBlur={e => props.updateChoice({
              texts:{
                [props.language]: { text: e.target.value }
              }
            })}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
      <WordType
        id={props.id}
        wordType={props.wordType}
        updateChoice={choice => props.updateChoice({
          texts: {
            [props.language]: choice
          }
        })}
      />
      <button
        className="au-c-answer--delete"
        tabIndex="0"
        onClick={props.deleteChoice}
      >
        <i className="material-icons">close</i>
      </button>
    </div>
  );
}

multipleChoiceOptions.propTypes = {
  id: React.PropTypes.string,
  updateChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  setActiveChoice: React.PropTypes.func.isRequired,
  isCorrect: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  itemId: React.PropTypes.string,
  language: React.PropTypes.string,
  wordType: React.PropTypes.string
};
