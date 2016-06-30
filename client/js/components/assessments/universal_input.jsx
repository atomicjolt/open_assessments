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
    checkedResponse: React.PropTypes.object
  }

  wasSelected(id){
    if( this.props.response ){
      return this.props.response.indexOf(id) > -1;
    } else {
      return null;
    }
  }

  render(){
    var item = this.props.item;
    var answerInputs;

    switch(item.question_type){
      case "edx_multiple_choice":
      case "multiple_choice_question":
      case "true_false_question":
        answerInputs = item.answers.map((answer) => {
          var selectRadio = _.curryRight(this.props.selectAnswer);
          var id = item.id + "_" + answer.id;
          var feedback;

          if(this.props.checkedResponse && this.wasSelected(answer.id)){
            feedback = this.props.checkedResponse.feedback;
          }

          var gradeState = UNGRADED;

          if(this.props.checkedResponse && this.wasSelected(answer.id)){
            if(this.props.checkedResponse.correct === true){
              gradeState = CORRECT;
            } else if(this.props.checkedResponse.correct === false) {
              gradeState = INCORRECT;
            }
          }

          return (
            <RadioButton
              isDisabled={this.props.isResult}
              key={id}
              id={id}
              item={answer}
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
          return <Option isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-option"/>;
        });
        break;
      case "matching_question":
        answerInputs = <Matching isDisabled={this.props.isResult} item={item} name="answer-option"/>;
        break;
      case "edx_numerical_input":
      case "edx_text_input":
        answerInputs = item.answers.map((answer) => {
          return <TextField isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-text"/>;
        });
        break;
      case "text_only_question":
        answerInputs = <TextArea />;
        break;
      case "multiple_answers_question":
        answerInputs = item.answers.map((answer) => {
          return <CheckBox isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-check" checked={this.wasSelected(answer.id)} />;
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
