import React            from 'react';
import MultipleChoice   from './multiple_choice';
import InactiveHeader   from './question_common/question_inactive_header';
import Settings         from './question_common/question_settings';
import QuestionText     from './question_common/question_text';
import Feedback         from './question_common/feedback';

export default class Question extends React.Component{
  static propTypes = {
    genusTypeId: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  content() {
    switch (this.props.genusTypeId) {
      case 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU':
        return <MultipleChoice {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="o-item c-question is-active" tabIndex="0">
        <InactiveHeader />
        <Settings />
        <div className="c-question__content">
          <QuestionText />
          {this.content()}
          <Feedback />
        </div>
      </div>
    );
  }
}
