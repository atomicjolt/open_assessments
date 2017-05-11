import React  from 'react';
import _      from 'lodash';
import Loader from '../../../common/dot_loader';

const defaultText = { text: '', wordType: undefined };

export default function Option(props) {
  const activeClass = props.isActive ? 'is-active' : '';
  const { id } = props.choice;

  if (id === 'new') {
    return (
      <div className={`au-c-answer ${activeClass}`}>
        <div className="au-c-input">
          <Loader />
        </div>
      </div>
    );
  }

  const choiceText = _.get(props, `choice.texts[${props.language}]`, defaultText);
  return (
    <div
      onFocus={props.selectChoice}
      onClick={props.selectChoice}
      className={`au-c-answer au-o-flex-center ${activeClass}`}
    >
      <div className="au-c-input">
        <label htmlFor="option1" />
        <div className="au-c-input__contain">
          <input
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
            id={id}
            type="text"
            defaultValue={choiceText.text}
            placeholder={`Option ${props.index}`}
            onBlur={e => props.updateChoice({
              id: props.choice.id,
              text: e.target.value
            })}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
      <div className="au-c-dropdown au-c-dropdown--smaller au-u-ml-sm is-ordered">
        <label htmlFor="word_drop_down" />
        <select
          name=""
          id="word_drop_down"
          value={props.choice.wordType}
          onChange={e => props.updateChoice({
            id: props.choice.id,
            wordType: e.target.value
          })}
        >
          {/* TODO figure out parts of speech with other languages */}
          <option value={null}>Other</option>
          <option value="verb">Verb</option>
          <option value="adverb">Adverb</option>
          <option value="noun">Noun</option>
          <option value="pronoun">Pronoun</option>
          <option value="adjective">Adjective</option>
          <option value="preposition">Preposition</option>
        </select>
      </div>
      <button
        className="au-c-answer--delete"
        onClick={() => props.deleteChoice()}
      >
        <i className="material-icons">close</i>
      </button>
    </div>
  );

}

Option.propTypes = {
  selectChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  updateChoice: React.PropTypes.func.isRequired,
  choice: React.PropTypes.shape({
    wordType: React.PropTypes.string,
    id: React.PropTypes.string.isRequired,
    text: React.PropTypes.string,
  }).isRequired,
  index: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool.isRequired,
  language: React.PropTypes.string.isRequired,
};
