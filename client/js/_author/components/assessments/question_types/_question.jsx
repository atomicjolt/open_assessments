import React            from 'react';
import MultipleChoice   from './multiple_choice';
import InactiveHeader   from './question_common/question_inactive_header';
import Settings         from './question_common/question_settings';
import QuestionText     from './question_common/question_text';
import Feedback         from './question_common/feedback';

export default class Question extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      genusTypeId: React.PropTypes.string,
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    deleteAssessmentItem: React.PropTypes.func,
  };

  updateItem(newItemProperties) {
    const { item } = this.props;
    const { displayName, description, id } = item;
    this.props.updateItem(
      {
        id,
        name: newItemProperties.name || displayName.text,
        description: newItemProperties.description || description.text,
      }
    );
  }

  content() {
    switch (this.props.item.genusTypeId) {
      case 'item-genus-type%3Aqti-choice-interaction%40ODL.MIT.EDU':
        return <MultipleChoice {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    const { item } = this.props;
    const { displayName, genusTypeId, id, description } = item;
    return (
      <div className="o-item c-question is-active" tabIndex="0">
        <InactiveHeader
          name={displayName.text}
          type={genusTypeId}
          deleteAssessmentItem={this.props.deleteAssessmentItem}
          id={id}
        />
        <Settings
          id={id}
          updateItem={newProps => this.updateItem(newProps)}
          defaultName={displayName.text}
          language={displayName.languageTypeId}
          maintainOrder={false}
          multipleAnswer={false}
          reflection={false}
        />
        <div className="c-question__content">
          <QuestionText
            id={id}
            text={description.text}
            updateItem={newProps => this.updateItem(newProps)}
          />
          {this.content()}
          <Feedback />
        </div>
      </div>
    );
  }
}
