import React            from 'react';
import MultipleChoice   from './multiple_choice';
import InactiveHeader   from './question_common/question_inactive_header';
import Settings         from './question_common/question_settings';
import QuestionText     from './question_common/question_text';
import Feedback         from './question_common/feedback';

export default class Question extends React.Component {
  static propTypes = {
    genusTypeId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
    displayName: React.PropTypes.shape({
      text: React.PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.displayName.text,
    };
  }

  componentWilUpdate(nextProps, nextState) {
  //  TODO: something to manage state with updates from the server
  }

  updateItem() {
  //  call the update item prop with values from the state
    console.log("updating item");
  }

  updateState(key, value) {
    this.setState({ [key]: value });
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
    console.log(this.props);
    const { displayName, genusTypeId, id } = this.props;
    const { nameLanguage, maintainOrder, multipleAnswer, reflection } = this.state;
    return (
      <div className="o-item c-question is-active" tabIndex="0">
        <InactiveHeader
          name={displayName.text}
          type={genusTypeId}
        />
        <Settings
          id={id}
          updateState={(key, val) => this.updateState(key, val)}
          updateItem={() => this.updateItem()}
          defaultName={displayName.text}
          language={nameLanguage || displayName.languageTypeId}
          maintainOrder={maintainOrder}
          multipleAnswer={multipleAnswer}
          reflection={reflection}
        />
        <div className="c-question__content">
          <QuestionText
            id={id}
          />
          {this.content()}
          <Feedback />
        </div>
      </div>
    );
  }
}
