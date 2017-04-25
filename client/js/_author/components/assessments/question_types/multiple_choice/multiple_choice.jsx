import React          from 'react';
import _              from 'lodash';
import Option         from './multiple_choice_option';
import Add            from './add_option';
import Feedback       from '../question_common/single_feedback';
import types          from '../../../../../constants/question_types';
import localize       from '../../../../locales/localize';

class MultipleChoice extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      bankId: React.PropTypes.string,
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      type: React.PropTypes.string,
      multipleAnswer: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
    selectChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    deleteChoice: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    activeChoice: React.PropTypes.string,
    language: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();
    this.state = {
      newChoice: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.newChoice && _.has(nextProps, 'item.question.choices.new')) {
      this.setState({ newChoice: true });
    } else if (this.state.newChoice) {
      this.setState({ newChoice: false });
    }
  }

  getFeedback() {
    const { question, type } = this.props.item;
    const strings = this.props.localizeStrings('multipleChoice');
    if (type !== types.multipleChoice) {
      const text = _.includes([
        types.reflection,
        types.multipleReflection,
      ],
        type
      ) ? strings.feedback : strings.correctFeedback;
      return (
        <div className="au-c-question__feedback">
          <Feedback
            updateItem={this.props.updateItem}
            feedbackType="correctFeedback"
            language={this.props.language}
            feedback={question.correctFeedback}
            labelText={text}
            bankId={this.props.item.bankId}
          />
          {type === types.reflection || type === types.multipleReflection ?
            null :
            <Feedback
              updateItem={this.props.updateItem}
              feedbackType="incorrectFeedback"
              feedback={question.incorrectFeedback}
              labelText={strings.incorrectFeedback}
              bankId={this.props.item.bankId}
              language={this.props.language}
            />
          }
        </div>
      );
    }

    return null;
  }

  moveChoice(choice, up) {
    const newChoices = _.cloneDeep(this.props.item.question.choices);
    const oldPosition = choice.order;
    const newPosition = up ? oldPosition - 1 : oldPosition + 1;
    const swapChoice = _.find(newChoices, { order: newPosition });

    newChoices[choice.id].order = newPosition;
    newChoices[swapChoice.id].order = oldPosition;

    this.props.updateItem({
      question: {
        choices: newChoices,
      }
    });
  }

  render() {
    const { question, id, type } = this.props.item;
    return (
      <div>
        <div className="au-c-question__answers au-c-question__answers--maintain">
          <div className="au-no-outline" onBlur={e => this.props.blurOptions(e)} tabIndex="-1">
            {
              _.map(_.orderBy(question.choices, 'order'), choice => (
                <Option
                  key={`assessmentChoice_${choice.id}`}
                  {...choice}
                  itemType={type}
                  multipleAnswer={_.get(question, 'multipleAnswer', false)}
                  updateChoice={
                    (newChoice, fileIds) => this.props.updateChoice(
                      id,
                      choice.id,
                      newChoice,
                      fileIds
                    )
                  }
                  updateItem={() => this.props.updateItem({ question })}
                  deleteChoice={() => this.props.deleteChoice(choice)}
                  shuffle={question.shuffle}
                  moveUp={() => this.moveChoice(choice, true)}
                  moveDown={() => this.moveChoice(choice)}
                  first={choice.order === 0}
                  last={question ? choice.order === _.size(question.choices) - 1 : true}
                  bankId={this.props.item.bankId}
                  itemId={this.props.item.id}
                  questionFileIds={question.fileIds}
                  setActiveChoice={choiceId => this.props.selectChoice(choiceId)}
                  isActive={this.props.isActive && choice.id === this.props.activeChoice}
                  language={this.props.language}
                />
              ))
            }
            {
              !this.state.newChoice && this.props.isActive ? <Add
                createChoice={() => this.props.createChoice()}
              /> : null
            }
          </div>
        </div>
        <div className="au-c-question__feedback">
          { this.getFeedback() }
        </div>
      </div>
    );
  }
}

export default localize(MultipleChoice);
