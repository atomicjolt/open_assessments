"use strict";

import React                from "react";

import RadioButton          from "../common/radio_button";
import Option               from "../common/option";
import TextField            from "../common/text_field";
import TextArea             from "../common/text_area";
import CheckBox             from "../common/checkbox";
import MappedImage          from "../common/mapped_image";
import Matching             from "../common/matching";
import DragAndDrop          from "../common/drag_and_drop";
import AudioUpload          from "../common/audio_upload";
import SentenceSandbox      from "../common/sentence_sandbox/sentence_sandbox";

export const CORRECT = "CORRECT";
export const INCORRECT = "INCORRECT";
export const UNGRADED = "UNGRADED";

export default class UniversalInput extends React.Component{

  static propTypes = {
    // Item to be displayed
    item: React.PropTypes.object.isRequired,

    selectAnswer: React.PropTypes.func.isRequired,

    // Whether or not entire question should be disabled
    isResult: React.PropTypes.bool,

    // Array of selected answer IDs
    response: React.PropTypes.array,

    // Graded user response object containing keys
    // correct:true/false, feedback:"Answer feedback"
    questionResult: React.PropTypes.object
  }

  wasSelected(id){
    if(this.props.response){
      return this.props.response.indexOf(id) > -1;
    } else {
      return null;
    }
  }

  getGradeState(id, questionResult){
    if(!questionResult){return UNGRADED;}

    if(_.includes(questionResult.answerIds, id) && questionResult.correct){
      return CORRECT;
    } else if(_.includes(questionResult.answerIds, id) && !questionResult.correct) {
      return INCORRECT;
    }

    return UNGRADED;
  }

  getFeedback(id, questionResult){
    if(!questionResult){return;}

    if(_.includes(questionResult.answerIds, id)){
      return questionResult.feedback;
    }
  }

  render(){
    var props = this.props;
    var item = props.item;
    var answerInputs;

    switch(item.question_type){

      case "edx_multiple_choice":
      case "multiple_choice_question":
      case "true_false_question":
        answerInputs = item.answers.map((answer) => {
          var selectRadio = _.curryRight(props.selectAnswer);
          var id = item.id + "_" + answer.id;
          var gradeState = this.getGradeState(answer.id, props.questionResult);
          var feedback = this.getFeedback(answer.id, props.questionResult);

          return (
            <RadioButton
                isDisabled={props.isResult}
                key={id}
                id={id}
                item={answer}
                isHtml={item.isHtml}
                name="answer-radio"
                checked={this.wasSelected(answer.id)}
                gradeState={gradeState}
                feedback={feedback}
                selectAnswer={selectRadio(true)}/>
          );
        });
        break;
      case "edx_dropdown":
        answerInputs = item.answers.map((answer) => {
          return <Option isDisabled={props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-option"/>;
        });
        break;
      case "matching_question":
        answerInputs = <Matching isDisabled={props.isResult} item={item} name="answer-option"/>;
        break;
      case "edx_numerical_input":
      case "edx_text_input":
        answerInputs = item.answers.map((answer) => {
          return <TextField isDisabled={props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-text"/>;
        });
        break;
      case "text_only_question":
      case "short_answer_question":
        answerInputs = (
          <li>
            <textarea
              rows={parseInt(props.item.question_meta.expectedLines) || 1}
              onBlur={(e) => props.selectAnswer(e.target.value, true)} />
          </li>
        );
        break;
      case "multiple_answers_question":
        answerInputs = item.answers.map((answer) => {
          var selectCheckbox = _.curryRight(props.selectAnswer);
          var id = item.id + "_" + answer.id;
          var gradeState = this.getGradeState(answer.id, props.questionResult);
          var feedback = this.getFeedback(answer.id, props.questionResult);

          return (
            <CheckBox
                isDisabled={props.isResult}
                key={id}
                id={id}
                item={answer}
                isHtml={item.isHtml}
                checked={this.wasSelected(answer.id)}
                gradeState={gradeState}
                feedback={feedback}
                selectAnswer={selectCheckbox(false)} />
          );
        });
        break;
      case "edx_image_mapped_input":
        answerInputs = item.answers.map((answer)=>{
          return <MappedImage key={item.id + "_" + answer.id} item={answer} />;
        });
        break;
      case "edx_drag_and_drop":
        answerInputs = item.answers.map((answer)=>{
          return <DragAndDrop key={item.id + "_" + answer.id} item={answer} />;
        });
        break;

      case "audio_upload_question":
        var selectAudioAnswer = _.curryRight(props.selectAnswer);
        answerInputs = (
          <AudioUpload
            selectAnswer={selectAudioAnswer(true)} />
        );
        break;
      case "drag_and_drop":
        var selectAnswer = _.curryRight(props.selectAnswer);
        answerInputs = <FillTheBlankDnd
          currentAnswer={this.props.response}
          selectAnswer={selectAnswer(false)}
        />
        break;
      case "sentence_sandbox":
        var selectAnswer = _.curryRight(props.selectAnswer);
        answerInputs = <SentenceSandbox
          answers={item.answers}
          selectAnswer={selectAnswer(false)}
          wordChain={props.response}
        />
    }

    return (
      <div>
        <ul>
          {answerInputs}
        </ul>
      </div>
    );
  }
}
