import React            from 'react';
import MultipleChoice   from './multiple_choice';
import InactiveHeader   from './question_common/question_inactive_header';
import Settings         from './question_common/question_settings';
import QuestionText     from './question_common/question_text';
import Feedback         from './question_common/feedback';

export default function (props) {
  const content = () => {
    if (!props.question) { return null; }
    switch (props.question.type) {
      case 'OsidObject':            //Kill this monster
      case 'multipleChoice':
        return <MultipleChoice {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="o-item c-question is-active" tabIndex="0">
      <InactiveHeader />
      <Settings />
      <div className="c-question__content">
        <QuestionText />
        {content()}
        <Feedback />
      </div>
    </div>
  );
}
