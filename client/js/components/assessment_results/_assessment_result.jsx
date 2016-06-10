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
    settings         : state.settings
  };
};

@connect(select, {...AssessmentActions}, null, {withRef: true})
export default class AssessmentResult extends React.Component{

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

  getStyles(theme){
    return ResultStyles.getStyles(theme, this.isFormative());
  }

  render(){
    var styles = this.getStyles(this.context.theme);

    if(this.props.assessmentResult == null){
      return <div />;
    }

    if(this.isFormative()){
      return <FormativeResult
          assessmentResult={this.props.assessmentResult}
          settings={this.props.settings}
          questions={this.props.questions}
          assessment={this.props.assessment}
          styles={styles}
          context={this.context}
          />;
    } else {
      return <SummativeResult
          styles={styles}
          timeSpent={this.props.timeSpent}
          isSummative={this.isSummative()}
        />;
    }
  }
}

