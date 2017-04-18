import React          from 'react';
import _              from 'lodash';
import Feedback       from './question_common/single_feedback';
import localize       from '../../../locales/localize';

const BOX_SIZES = {
  small: {
    expectedLines: 1,
    expectedLength: 50,
    maxStrings: 1,
  },
  medium: {
    expectedLines: 1,
    expectedLength: 200,
    maxStrings: 1,
  },
  large: {
    expectedLines: 5,
    expectedLength: 200,
    maxStrings: 1,
  }
};

function getBoxSize(lines, length) {
  return _.findKey(BOX_SIZES, boxSize => (
    lines === boxSize.expectedLines && length === boxSize.expectedLength
  )) || 'large';
}

function updateItem(e, update) {
  update({
    question: { ...BOX_SIZES[e.target.value] }
  });
}

function shortAnswer(props) {
  const { question } = props.item;
  const lines = question && question.expectedLines;
  const length = question && question.expectedLength;
  const boxSize = getBoxSize(lines, length);
  const strings = props.localizeStrings('shortAnswer');
  return (
    <div>
      <div className="au-c-question__answers au-c-short-answer__answers">
        <div className="au-c-dropdown au-c-dropdown--medium au-c-input-label--top">
          <label htmlFor="short-answer-size">{strings.answerBox}</label>
          <select
            value={boxSize}
            onChange={e => updateItem(e, props.updateItem)}
            id="short-answer-size"
          >
            <option value="small">{strings.small}</option>
            <option value="medium">{strings.medium}</option>
            <option value="large">{strings.large}</option>
          </select>
        </div>

        <div className={`au-c-short-answer__example is-${boxSize}`}>
          <span>{strings[boxSize]} {strings.box}</span>
        </div>
      </div>
      <div className="au-c-question__feedback">
        <Feedback
          feedbackType="correctFeedback"
          feedback={question.correctFeedback}
          updateItem={props.updateItem}
          labelText={strings.feedback}
          bankId={props.item.bankId}
          language={props.language}
        />
      </div>
    </div>
  );
}

shortAnswer.propTypes = {
  item: React.PropTypes.shape({
    question: React.PropTypes.shape({
      lines: React.PropTypes.number
    }),
    bankId: React.PropTypes.string,
  }),
  updateItem: React.PropTypes.func.isRequired,
  localizeStrings: React.PropTypes.func.isRequired,
  language: React.PropTypes.string.isRequired,
};

export default localize(shortAnswer);
