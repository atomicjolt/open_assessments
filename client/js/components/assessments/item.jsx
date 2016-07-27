"use strict";

import React  from "react";

import * as AssessmentActions  from "../../actions/assessment";
import UniversalInput          from "./universal_input";

export default class Item extends React.Component{

  static propTypes = {
    // Assessment configuration settings. these should never be modified.
    settings          : React.PropTypes.object,

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
    questionResult   : React.PropTypes.object.isRequired,

    selectAnswer      : React.PropTypes.func.isRequired,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired
  };

  getFeedback(){
    var response = this.props.questionResult;

    if(response){

      if(response.correct === true){
        return (
          <div className="c-question-feedback  c-feedback--correct">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"/>
            </svg>
            <div
              dangerouslySetInnerHTML={{__html:response.feedback}}>
            </div>
          </div>
        );
      } else if(response.correct === false) {
        return (
          <div className="c-question-feedback  c-feedback--incorrect">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z"/>
            </svg>
            <div
              dangerouslySetInnerHTML={{__html:response.feedback}}>
            </div>
          </div>
        );
      }
    }
  }

  render() {
    var questionDirections;
    if(this.props.question.question_type == "multiple_answers_question"){
      questionDirections = this.props.localizedStrings.item.questionDirectionMany;
    } else {
      questionDirections = this.props.localizedStrings.item.questionDirectionAll;
    }

    return (
        <div>
          <div className="c-question-prompt">
            {questionDirections}
            <div dangerouslySetInnerHTML={
              {__html: this.props.question.material}}>
            </div>
          </div>
          <div className="c-answers">
            <UniversalInput
              settings={this.props.settings}
              item={this.props.question}
              isResult={false}
              selectAnswer={this.props.selectAnswer}
              response={this.props.response}
              questionResult={this.props.questionResult}
              localizedStrings={this.props.localizedStrings}/>
          </div>
          {this.getFeedback()}
        </div>
    );
  }
}
