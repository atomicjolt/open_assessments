"use strict";

import React                 from 'react';

import AssessmentActions     from "../../actions/assessment";
import ReviewAssessmentStore from "../../stores/review_assessment";
import ItemResult            from "./item_result";
import ResultSummary         from "./result_summary.jsx";
import StudyPlanButton       from "../post_nav/study_plan_button.jsx";

export default class SummativeResult extends React.Component{

  constructor(props){
    super(props);
  }

  getItemResults(){
    if(this.props.questionResponses){
      return this.props.questionResponses.map((qr, index)=>{
        let question = ReviewAssessmentStore.itemByIdent(qr.ident); // TODO itemByIdent will need to be moved to a selector or we need to rethink how we find these values.
        if(question === undefined){
          return <p>Question was removed.</p>;
        } else {
          return <ItemResult key={index}
                             question={question}
                             isCorrect={qr.correct}
                             index={index}
                             confidence={qr.confidence_level}
                             chosen={qr.responses_chosen}
                             correctAnswers={question.correct}/>;
        }
      });

    } else {
      return this.props.questions.map((question, index)=>{
        return <ItemResult key={index} question={question} isCorrect={this.props.assessmentResult.correct_list[index]} index={index} confidence={this.props.assessmentResult.confidence_level_list[index]}/>;
      });

    }
  }

  render() {

    var errors = "";
    var itemResults = this.getItemResults();

    if(this.props.assessmentResult.errors && this.props.assessmentResult.errors.length > 0){
      errors = <div className="row">
                  <div className="col-md-12">
                    <div>
                      This quiz was not setup correctly. Contact your instructor.
                    </div>
                  </div>
                </div>;
    }

    var quizType = this.props.isSummative ? "Quiz" : "Show What You Know";

    return (<div>
      <div>
        <div>{quizType}: {this.props.assessment ? this.props.assessment.title : ""}</div>
        {errors}
        <ResultSummary
            settings={this.props.settings}
            timeSpent={this.props.timeSpent}
            assessmentResult={this.props.assessmentResult}
            assessment={this.props.assessment}
            outcomes={this.props.outcomes()}
            user={this.props.user}
            questions={this.props.questions}
        />


        <StudyPlanButton/>

        <hr />

        <div id="questionsStart">
          {itemResults}
        </div>

      </div>
    </div>);
  }

}
