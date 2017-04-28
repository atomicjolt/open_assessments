import React       from 'react';
import _           from 'lodash';
import Option      from './option';
import Add         from '../question_common/add_option';
import Feedback    from '../question_common/single_feedback';
import SaveOptions from '../question_common/save_option_button';
import localize     from '../../../../locales/localize';

class MovableWordSentence extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      question: React.PropTypes.shape({}),
      id: React.PropTypes.string,
      bankId: React.PropTypes.string,
      type: React.PropTypes.string,
    }).isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    deleteChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    selectChoice: React.PropTypes.func.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    save: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
    activeChoice: React.PropTypes.string,
    language: React.PropTypes.string.isRequired,
    duplicateAnswers: React.PropTypes.arrayOf(React.PropTypes.string),
  };

  render() {
    const { question, id } = this.props.item;
    const strings = this.props.localizeStrings('movableWordSentence');

    return (
      <div>
        <div
          className="au-c-question__answers au-c-movable__answers"
          onBlur={e => this.props.blurOptions(e)} tabIndex="-1"
        >
          {
            _.map(question.choices, choice => (
              <Option
                key={`assessmentChoice_${choice.id}_${this.props.language}`}
                {...choice}
                updateChoice={
                  (newChoice, fileIds) => this.props.updateChoice(id, choice.id, newChoice, fileIds)
                }
                isActive={this.props.isActive && choice.id === this.props.activeChoice}
                deleteChoice={() => this.props.deleteChoice(choice)}
                selectChoice={() => this.props.selectChoice(choice.id)}
                itemCount={_.size(question.choices)}
                duplicateAnswers={this.props.duplicateAnswers}
                language={this.props.language}
              />
            ))
          }
          <Add
            createChoice={() => this.props.createChoice()}
          />
          <SaveOptions save={this.props.save} />
        </div>
        <div className="au-c-question__feedback">
          <Feedback
            language={this.props.language}
            updateItem={item => this.props.updateItem(item, true)}
            feedbackType="correctFeedback"
            feedback={question.correctFeedback}
            labelText={strings.correctFeedback}
            bankId={this.props.item.bankId}
          />
          <Feedback
            language={this.props.language}
            updateItem={item => this.props.updateItem(item, true)}
            feedbackType="incorrectFeedback"
            feedback={question.incorrectFeedback}
            labelText={strings.incorrectFeedback}
            bankId={this.props.item.bankId}
          />
        </div>
      </div>
    );
  }
}

export default localize(MovableWordSentence);
