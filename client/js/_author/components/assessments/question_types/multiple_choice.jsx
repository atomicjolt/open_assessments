import React    from 'react';
import _        from 'lodash';
import Option   from './multiple_choice_option';
import Add      from './add_option';

export default class multipleChoice extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      answers: React.PropTypes.arrayOf(React.PropTypes.shape),
      id: React.PropTypes.string,
      question: React.PropTypes.shape({
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({})),
      }),
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
  };

  hasQuestions() {
    const { question } = this.props.item;
    return question
    && question.choices
    && question.choices.length;
  }

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

  moveChoice(choice, up) {
    const { choices } = this.props.item.question;
    const index = _.findIndex(choices, { id: choice.id });

    if ((up && index === 0) || (!up && choice === _.last(choices))) {
      return;
    }

    const newIndex = up ? index - 1 : index + 1;

    const earlierItem = choices[newIndex];
    choices[newIndex] = choice;
    choices[index] = earlierItem;

    this.props.updateItem({
      question: {
        choices,
      }
    });
  }

  render() {
    const { question, id } = this.props.item;
    return (
      <div className="c-question__answers c-question__answers--maintain">
        {
          _.map(this.hasQuestions() ? question.choices : [{}], choice => (
            <Option
              key={`assessmentChoice_${choice.id}`}
              {...choice}
              updateChoice={newChoice => this.props.updateChoice(id, newChoice)}
              updateItem={() => this.props.updateItem({ question })}
              deleteChoice={() => this.deleteChoice(choice)}
              moveUp={() => this.moveChoice(choice, true)}
              moveDown={() => this.moveChoice(choice)}
            />
          ))
        }
        <Add
          updateChoice={() => this.props.updateChoice(id, {})}
        />
      </div>
    );
  }
}
