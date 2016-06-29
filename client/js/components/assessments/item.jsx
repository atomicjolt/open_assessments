"use strict";

import React  from "react";

import * as AssessmentActions  from "../../actions/assessment";
import UniversalInput          from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    // Item to be displayed
    question          : React.PropTypes.object.isRequired,

    // Array of selected answer IDs
    response          : React.PropTypes.array.isRequired,

    // The position of the item in the array of items
    currentItemIndex  : React.PropTypes.number.isRequired,

    // The total number of items in the array of items
    questionCount     : React.PropTypes.number.isRequired,

    // Graded user response object containing keys
    // correct:true/false, feedback:"Answer feedback"
    checkedResponse   : React.PropTypes.object.isRequired,

    selectAnswer      : React.PropTypes.func.isRequired,

    // TODO
    outcomes          : React.PropTypes.array,
  };

  getCounter(){
    if(this.props.shouldShowCounter){
      return (
        <span className="counter">
          {this.props.currentItemIndex + 1} of {this.props.questionCount}
        </span>
      );
    }
  }

  getFeedback(){
    var feedback;
    var feedbackStyle;
    var feedbackImage;
    var correct;

    var response = this.props.checkedResponse;


    if(this.props.checkedResponse){
      if(response.correct === true){
        correct = "Correct";
        feedbackStyle = "c-feedback--correct";
        feedbackImage = (
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
					    <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/>
					</svg>
        );
      }
      else if(response.correct === false){
        correct = "Incorrect";
        feedbackStyle = "c-feedback--incorrect";
        feedbackImage = (
      		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    			<path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/>
    		</svg>
        );
      }

      if(response.feedback){feedback = response.feedback;}
    }



    return (
    	<div className={`c-question-feedback ${feedbackStyle}`}>
        {feedbackImage}
    		<p>{feedback}</p>
    	</div>
    );

    return (
      <div>
        <p>{correct}</p>
        <p>{feedback}</p>
      </div>
    );
  }

  render() {
    var feedback = this.getFeedback();
    var counter = this.getCounter();

    var questionDirections;
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections = <div>Choose <b>ALL</b> that apply.</div>;
    } else {
      questionDirections = <div>Choose the <b>BEST</b> answer.</div>;
    }

    return (
        <div>
          <div className="c-question-prompt">
            <p>{this.props.question.title}</p>
            <p>{questionDirections}</p>
            <p dangerouslySetInnerHTML={
              {__html: this.props.question.material}}>
            </p>
          </div>
          <div className="c-answers">
            <UniversalInput
              item={this.props.question}
              isResult={false}
              selectAnswer={this.props.selectAnswer}
              response={this.props.response}/>
          </div>
          {feedback}
        </div>
    );
  }
}
