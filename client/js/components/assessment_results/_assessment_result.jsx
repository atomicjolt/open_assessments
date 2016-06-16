"use strict";

import React                      from 'react';
import { connect }                from "react-redux";
import * as AssessmentActions     from "../../actions/assessment";
import FormativeResult            from "./formative_result.jsx";
import SummativeResult            from "./summative_result.jsx";
import CommunicationHandler       from "../../utils/communication_handler";
import { questions }                  from "../../selectors/assessment";

const select = (state) => {
  return {
    assessmentResult : state.assessmentResult,
    timeSpent        : state.timeSpent,
    questions        : questions(state),
    outcomes         : state.outcomes,
    assessment       : state.assessment,
    settings         : state.settings
  };
};

export class AssessmentResult extends React.Component{

  constructor(props, context){
    super(props, context);
    this.sendLtiOutcome();
    this.sendAnalytics();
  }

  sendAnalytics(){
    if(this.props.assessmentResult && this.props.assessmentResult.assessment_results_id) {
      this.props.assessmentPostAnalytics(this.props.assessmentResult.assessment_results_id, this.props.settings.externalUserId, this.props.settings.externalContextId);
    }
  }
  sendLtiOutcome(){
    if(this.isSummative() && this.props.assessmentResult.assessment_results_id){
      this.props.assessmentPostLtiOutcome(this.props.assessmentResult.assessment_results_id);
    }
  }

  componentDidMount(){
    CommunicationHandler.sendSize();
    CommunicationHandler.showLMSNavigation();
  }

  isSummative(){
    return this.props.settings.assessmentKind.toUpperCase() == "SUMMATIVE";
  }

  isFormative(){
    return this.props.settings.assessmentKind.toUpperCase() == "FORMATIVE";
  }


  render(){
    if(this.props.assessmentResult == null){
      return <div />;
    }
    if(this.isFormative()){
      return <FormativeResult
          assessmentResult={this.props.assessmentResult}
          settings={this.props.settings}
          questions={this.props.questions}
          assessment={this.props.assessment}
          context={this.context}
          />;
    } else {
      return <SummativeResult
          settings={this.props.settings}
          assessmentResult={this.props.assessmentResult}
          assessment={this.props.assessment}
          questionResponses={this.props.questionResponses}
          questions={this.props.questions}
          timeSpent={this.props.timeSpent}
          isSummative={this.isSummative()}
          outcomes={this.props.outcomes}
        />;
    }
  }
};

export default connect(select, {...AssessmentActions}, null, {withRef: true})(AssessmentResult);
