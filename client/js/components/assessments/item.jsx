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

    //TODO add documentation
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
    var correct;

    var response = this.props.checkedResponse;
    
    if(this.props.checkedResponse){
      if(response.correct === true){correct = "Correct";}
      else if(response.correct === false){correct = "Incorrect";}

      if(response.feedback){feedback = response.feedback;}
    }

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
      <div className="assessment_container">
        <div className="question">
          <div className="header">
            {counter}
            <p>{this.props.question.title}</p>
          </div>
          <div>
            <form className="edit_item">
              <div className="full_question" tabIndex="0">
                <div className="inner_question">
                  <div className="question_text">
                    {questionDirections}
                    <div
                        dangerouslySetInnerHTML={{
                          __html: this.props.question.material
                        }}>
                    </div>
                  </div>
                  <UniversalInput
                    item={this.props.question}
                    isResult={false}
                    selectAnswer={this.props.selectAnswer}
                    response={this.props.response}
                  />
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-6 col-xs-8" >
                    {feedback}
                  </div>
                  <div className="col-md-7 col-sm-6 col-xs-4">
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
