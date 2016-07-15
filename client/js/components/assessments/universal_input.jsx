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
    // switch("sentence_sandbox"){

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
        answerInputs = <TextArea />;
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
      case "sentence_sandbox":
        // TODO: Right now we're assuming that the words are going to be all that
        // is in item.answers. Change this when we get an actual example from
        // qbank.
        item = {
          answers: [
            {text: "the bags", id: "0"},
            {text: "the bus", id: "1"},
            {text: "on", id: "2"},
            {text: "are", id: "3"}
          ]
        }
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
