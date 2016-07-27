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
    // Assessment configuration settings. these should never be modified.
    settings: React.PropTypes.object,

    // Item to be displayed
    item: React.PropTypes.object.isRequired,

    selectAnswer: React.PropTypes.func.isRequired,

    // Whether or not entire question should be disabled
    isResult: React.PropTypes.bool,

    // Array of selected answer IDs
    response: React.PropTypes.array,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired,

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

        const multipleChoiceAnswer = (answer) => {
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
        };

        answerInputs = _.chunk(item.answers, 2).map((row, index) => {
          return (
            <ul key={index} className="o-grid">
              {row.map(multipleChoiceAnswer)}
            </ul>
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
      case "text_input_question":
      case "text_only_question":
      case "short_answer_question":
        answerInputs = (
          <div className="c-text-answer">
            <textarea
              placeholder="Enter answer here..."
              onBlur={(e) => props.selectAnswer(e.target.value, true)}
              rows={parseInt(props.item.question_meta.expectedLines) || 1} />
          </div>
        );
        break;
      case "multiple_answers_question":

        const multipleAnswer = (answer) => {
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
        };

        answerInputs = _.chunk(item.answers, 2).map((row, index) => {
          return (
            <ul key={index} className="o-grid">
              {row.map(multipleAnswer)}
            </ul>
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
            localizedStrings={this.props.localizedStrings.audioUpload}
            selectAnswer={selectAudioAnswer(true)}
            timeout={this.props.settings.audio_recorder_timeout} />
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
        {answerInputs}
      </div>
    );
  }
}
