import React from 'react';
import _ from 'lodash';
import AudioLimit from '../question_common/audio_limit';
import Option from './option';
import AddOption from './add_option';
import Feedback   from '../question_common/single_feedback';
import localize   from '../../../../locales/localize';

class MWSandbox extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    createChoice: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    deleteChoice: React.PropTypes.func.isRequired,

    selectChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,

    isActive: React.PropTypes.bool,
    activeChoice: React.PropTypes.string,
    language: React.PropTypes.string.isRequired,
  };


  getChoices(choices) {
    const { id } = this.props.item;
    let index = 0;
    return _.map(choices, (choice) => {
      index += 1;
      return (
        <Option
          key={`${choice.id}_${this.props.language}`}
          choice={choice}
          index={index}
          selectChoice={() => this.props.selectChoice(choice.id)}
          updateChoice={
            (newChoice, fileIds) => this.props.updateChoice(
              id, choice.id, newChoice, fileIds)
          }
          deleteChoice={() => this.props.deleteChoice(choice)}
          isActive={this.props.isActive && choice.id === this.props.activeChoice}
          language={this.props.language}
        />
      );
    });
  }

  handleBlur(e) {
    this.props.updateItem({
      question:{
        timeValue: {
          hours: 0,
          minutes: 0,
          seconds: parseInt(e.target.value, 10)
        }
      }
    });
  }

  render() {
    const { question, id } = this.props.item;
    const strings = this.props.localizeStrings('mwSandbox');
    return (
      <div onBlur={e => this.props.blurOptions(e)}>
        <div className="au-c-movable__audio-settings is-active">
          <AudioLimit
            item={this.props.item}
            handleBlur={e => this.handleBlur(e)}
          />
        </div>
        <div className="au-c-question__answers au-c-movable__answers">
          {
            this.getChoices(_.get(this.props.item, 'question.choices', {}))
          }
          <AddOption updateChoice={() => this.props.createChoice(id)} />
        </div>
        <div className="au-c-question__feedback">
          <Feedback
            language={this.props.language}
            updateItem={this.props.updateItem}
            feedbackType="correctFeedback"
            feedback={question.correctFeedback}
            labelText={strings.feedback}
            bankId={this.props.item.bankId}
          />
        </div>
      </div>
    );
  }
}

export default localize(MWSandbox);
