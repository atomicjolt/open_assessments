import React      from 'react';
import _          from 'lodash';
import Option     from './option';
import Add        from '../question_common/add_option';

export default class MoveableWordSentence extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      question: React.PropTypes.shape({}),
      id: React.PropTypes.string,
      type: React.PropTypes.string,
    }).isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    deleteChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.bool,
    activeChoice: React.PropTypes.string,
  };

  render() {
    const { question, id, type } = this.props.item;
    return (
      <div
        className="au-c-question__answers au-c-moveable__answers"
        onBlur={e => this.props.blurOptions(e)} tabIndex="-1"
      >
        {
          _.map(question.choices, choice => (
            <Option
              key={`assessmentChoice_${choice.id}`}
              {...choice}
              updateChoice={(newChoice, fileIds) => this.props.updateChoice(id, choice.id, newChoice, fileIds)}
              isActive={this.props.isActive && choice.id === this.props.activeChoice}
              deleteChoice={() => this.props.deleteChoice(choice)}
            />
          ))
        }
        <Add
          createChoice={() => this.props.createChoice(id)}
        />
      </div>
    );
  }
}
