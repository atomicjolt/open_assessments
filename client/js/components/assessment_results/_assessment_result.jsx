"use strict";

import React                      from 'react';
import { connect }                from "react-redux";
import * as AssessmentActions     from "../../actions/assessment";
import FormativeResult            from "./formative_result.jsx";
import SummativeResult            from "./summative_result.jsx";
import ResultStyles               from "./result_styles.js";
import CommunicationHandler       from "../../utils/communication_handler";

const select = (state) => {
  return {
    assessmentResult : state.assessment.assessmentResult(),
    timeSpent        : state.assessment.timeSpent(),
    questions        : state.assessment.allQuestions(),
    outcomes         : state.assessment.outcomes(),
    assessment       : state.assessment.current(),
    settings         : state.settings.current()
  }
};

@connect(select, {...AssessmentActions}, null, {withRef: true})
export default class AssessmentResult extends React.Component{

  constructor(props, context){
    super(props, context);
    this.sendLtiOutcome();
    this.sendAnalytics();
  }

  sendAnalytics(){
    if(this.state.assessmentResult && this.state.assessmentResult.assessment_results_id) {
      this.props.assessmentPostAnalytics(this.state.assessmentResult.assessment_results_id, this.state.settings.externalUserId, this.state.settings.externalContextId);
    }
  }
  sendLtiOutcome(){
    if(this.isSummative() && this.state.assessmentResult.assessment_results_id){
      this.props.assessmentPostLtiOutcome(this.state.assessmentResult.assessment_results_id);
    }
  }

  componentDidMount(){
    CommunicationHandler.sendSize();
    CommunicationHandler.showLMSNavigation();
  }

  isSummative(){
    return this.state.settings.assessmentKind.toUpperCase() == "SUMMATIVE";
  }

  isFormative(){
    return this.state.settings.assessmentKind.toUpperCase() == "FORMATIVE";
  }

  getStyles(theme){
    return ResultStyles.getStyles(theme, this.isFormative());
  }

  render(){
    var styles = this.getStyles(this.context.theme);

    if(this.state.assessmentResult == null){
      return <div />;
    }

    if(this.isFormative()){
      return <FormativeResult
          assessmentResult={this.state.assessmentResult}
          settings={this.state.settings}
          questions={this.state.questions}
          assessment={this.state.assessment}
          styles={styles}
          context={this.context}
          />;
    } else {
      return <SummativeResult
          styles={styles}
          timeSpent={this.state.timeSpent}
          isSummative={this.isSummative()}
        />;
    }
  }
}

