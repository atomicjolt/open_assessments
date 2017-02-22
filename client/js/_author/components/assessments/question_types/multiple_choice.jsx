import React        from 'react';
import _            from 'lodash';
import Option       from './multiple_choice_option';
import Add          from './add_option';
import Feedback     from './question_common/feedback';

export default class MultipleChoice extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.shape({}),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
  };

  markedForDeletion(choice) {
    const { question } = this.props.item;
    const deleteChoice = _.find(question.choices, { id: choice.id });
    deleteChoice.delete = true;
    return question.choices;
  }

  deleteChoice(choice) {
    this.props.updateItem({
      question: {
        choices: this.markedForDeletion(choice)
      }
    });
  }

  moveChoice(choice, index, up) {
    const newChoices = _.cloneDeep(this.props.item.question.choices);
    const newIndex = up ? index - 1 : index + 1;

    const earlierItem = newChoices[newIndex];
    newChoices[newIndex] = choice;
    newChoices[index] = earlierItem;

    this.props.updateItem({
      question: {
        choices: newChoices,
      }
    });
  }

  render() {
    const { question, id } = this.props.item;
    return (
      <div className="c-question__answers c-question__answers--maintain">
        {
          _.map(_.orderBy(question.choices, 'order'), choice => (
            <Option
              key={`assessmentChoice_${choice.id}`}
              {...choice}
              updateChoice={newChoice => this.props.updateChoice(id, choice.id, newChoice)}
              updateItem={() => this.props.updateItem({ question })}
              deleteChoice={() => this.deleteChoice(choice)}
              moveUp={() => this.moveChoice(choice, true)}
              moveDown={() => this.moveChoice(choice)}
              first={choice.order === 0}
              last={question ? choice.order === _.size(question.choices) - 1 : true}
            />
          ))
        }
        <Add
          updateChoice={() => this.props.updateChoice(id)}
        />
        <Feedback />
      </div>
    );
  }
}
