import React from 'react';
import _ from 'lodash';

import AudioLimit from '../question_common/audio_limit';
import Option from './option';
import AddOption from './add_option';

export default class MWSandbox extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    updateItem: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    selectChoice: React.PropTypes.func.isRequired,
    blurOptions: React.PropTypes.func.isRequired,
    activeChoice: React.PropTypes.bool,
  };

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

  // getChoices(choices) {
  //   const { question } = this.props.item;
  //   return _.each(choices, (choice) => {
  //     return (
  //       <Option
  //         key={`assessmentChoice_${choice.id}`}
  //         {...choice}
  //         updateChoice={() => {}/* (newChoice, fileIds) => this.props.updateChoice(id, choice.id, newChoice, fileIds)*/}
  //         updateItem={() => this.props.updateItem({ question })}
  //         deleteChoice={() => this.deleteChoice(choice)}
  //         shuffle={false /* question.shuffle*/}
  //         moveUp={()=>{} /* () => this.moveChoice(choice, true) */}
  //         moveDown={()=>{} /* () => this.moveChoice(choice)*/}
  //         first={choice.order === 0}
  //         last={question ? choice.order === _.size(question.choices) - 1 : true}
  //         bankId={this.props.item.bankId}
  //         itemId={this.props.item.id}
  //         questionFileIds={question.fileIds}
  //         setActiveChoice={choiceId => this.props.selectChoice(choiceId)}
  //         isActive={this.props.isActive && choice.id === this.props.activeChoice}
  //       />
  //     );
  //   });
  // }

  render() {
    return (
      <div>
        <div className="au-c-moveable__audio-settings is-active">
          <AudioLimit
            item={this.props.item}
            handleBlur={e => this.handleBlur(e)}
          />
        </div>
        <div className="au-c-question__answers au-c-moveable__answers">
          <Option isActive />
          <Option />
          <AddOption />
        </div>
      </div>
    );
  }
}
