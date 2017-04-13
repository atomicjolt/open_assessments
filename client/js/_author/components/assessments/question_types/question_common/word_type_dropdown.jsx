import React    from 'react';

export default function wordType(props) {
  // need to figure out parts of speech for other languages
  return (
    <div className={`au-c-dropdown au-c-dropdown--smaller au-u-ml-sm ${props.wordType ? 'is-ordered' : null}`}>
      <label htmlFor={`option_word_${props.id}`} />
      <select
        name=""
        id={`option_word_${props.id}`}
        value={props.wordType}
        onChange={e => props.updateChoice({ wordType: e.target.value })}
      >
        <option value="other">Other</option>
        <option value="verb">Verb</option>
        <option value="adverb">Adverb</option>
        <option value="noun">Noun</option>
        <option value="pronoun">Pronoun</option>
        <option value="adjective">Adjective</option>
        <option value="preposition">Preposition</option>
      </select>
    </div>
  );
}

wordType.propTypes = {
  id: React.PropTypes.string.isRequired,
  wordType: React.PropTypes.string,
  updateChoice: React.PropTypes.func.isRequired,
};
