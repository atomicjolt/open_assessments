import React    from 'react';
import _        from 'lodash';
import WordType from '../question_common/word_type_dropdown';
import localize from '../../../../locales/localize';

const defaultText = { text: '', wordType: 'other' };

function option(props) {
  const strings = props.localizeStrings('movableWordSentanceOption');

  let boxClass = '';
  if (!_.isNil(props.answerOrder) && props.answerOrder !== '') { boxClass = 'is-ordered'; }
  if (_.includes(props.duplicateAnswers, props.answerOrder)) { boxClass = 'is-error'; }

  const choiceText = _.get(props, `texts[${props.language}]`, defaultText);
  return (
    <div
      onFocus={props.selectChoice}
      onClick={props.selectChoice}
      className={`au-c-answer au-o-flex-center ${props.isActive ? 'is-active' : ''}`}
    >
      <div className={`au-c-dropdown au-c-dropdown--tiny au-u-mr-sm ${boxClass}`}>
        <label htmlFor={`option_order_${props.id}`} />
        <select
          name=""
          id={`option_order_${props.id}`}
          value={props.answerOrder}
          onChange={e => props.updateChoice({ answerOrder: e.target.value })}
        >
          <option value="">{strings.NA}</option>
          {
            _.map(_.range(0, props.itemCount), index => (
              <option
                key={`movableWordOrderOption_${props.id}_${index}`}
                value={index}
              >
                {index + 1}
              </option>
            ))
          }
        </select>
      </div>

      <div className="au-c-input">
        <label htmlFor={`option_text_${props.id}`} />
        <div className="au-c-input__contain">
          <input
            defaultValue={choiceText.text}
            onBlur={e => props.updateChoice({ text: e.target.value })}
            className="au-c-text-input au-c-text-input--small au-c-wysiwyg"
            id={`option_text_${props.id}`}
            type="text"
            placeholder={strings.newOption}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>

      <WordType
        id={props.id}
        wordType={props.wordType}
        updateChoice={props.updateChoice}
      />
      <button onClick={props.deleteChoice} className="au-c-answer--delete">
        <i className="material-icons">close</i>
      </button>
    </div>
  );
}

option.propTypes = {
  id: React.PropTypes.string.isRequired,
  wordType: React.PropTypes.string,
  answerOrder: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  itemCount: React.PropTypes.number.isRequired,
  isActive: React.PropTypes.bool,
  selectChoice: React.PropTypes.func.isRequired,
  updateChoice: React.PropTypes.func.isRequired,
  deleteChoice: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  duplicateAnswers: React.PropTypes.arrayOf(React.PropTypes.string),
  language: React.PropTypes.string,
};

export default localize(option);
