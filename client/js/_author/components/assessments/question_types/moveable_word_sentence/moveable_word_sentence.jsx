import React      from 'react';
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
  };

  constructor() {
    super();
    this.state = {
      activeOption: '',
    };
  }

  selectChoice(choiceId) {
    this.setState({ activeChoice: choiceId });
  }

  //TODO: move up to question
  blurOptions(e) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement) ||
        (currentTarget === document.activeElement)
      ) {
        this.selectChoice(null);
      }
    }, 0);
  }

  render() {
    console.log(this.props);
    const { question, id, type } = this.props.item;
    return (
      <div
        className="au-c-question__answers au-c-moveable__answers"
        onBlur={e => this.blurOptions(e)} tabIndex="-1"
      >
        <Option
          updateChoice={(newChoice, fileIds) => this.props.updateChoice(id, choice.id, newChoice, fileIds)}
        />
        <Add

        />
      </div>
    );
  }
}
