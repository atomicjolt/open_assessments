"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import * as CommunicationActions              from "../../actions/communications";
import * as AssessmentProgress                from "../../actions/assessment_progress";
import appHistory                             from "../../history";
import { localizeStrings }                    from "../../selectors/localize";
import TwoButtonNav                           from "../assessments/two_button_nav";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import { questionResults }                    from "../../selectors/assessment";
import {
  questionCount,
  questions,
  outcomes,
  assessmentLoaded,
  primaryActionState,
  secondaryActionState,
}  from "../../selectors/assessment";

const select = (state, props) => {
  return {

    // Assessment configuration settings. these should never be modified.
    settings        : state.settings,

    // Assessment to be rendered.
    assessment      : state.assessment,

    // Returns true if assessment has loaded, false otherwise
    assessmentLoaded: assessmentLoaded(state, props),

    // State of user-assessment interactions.
    assessmentProgress        : state.assessmentProgress.toJS(),

    // Current page of items to display when paging through items
    currentItem     : state.assessmentProgress.get('currentItemIndex'),

    // Array of user responses
    responses       : state.assessmentProgress.get('responses').toJS(),

    // How many questions to display at a time. Default to show all questions
    // in a section if not specified
    questionsPerPage: state.settings.questions_per_page || questionCount(state, props),

    // How many Items are in the assessment
    questionCount   : questionCount(state, props),

    // Array containing all assessment Items
    allQuestions    : questions(state, props),

    // Array of graded user response objects containing keys
    // correct:true/false, feedback:"Answer feedback",
    // answerIds: answers feedback applies to
    questionResults : questionResults(state, props),

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: localizeStrings(state, props),

    // State of the nav primary action button. e.g. (PRIMARY_ACTION.SUBMIT)
    primaryActionState: primaryActionState(state),

    // State of the nav secondary action button. e.g. (SECONDARY_ACTION.PREV)
    secondaryActionState: secondaryActionState(state),

    // TODO
    outcomes        : outcomes(state, props)
  };
};

export class Assessment extends React.Component{

  componentWillMount(){
    if(this.props.assessmentProgress.assessmentResult != null){
      appHistory.push("assessment-result");
    }
  }

  componentDidMount(){
    // Trigger action to indicate the assessment was viewed
    this.props.assessmentViewed(this.props.settings, this.props.assessment);

    this.props.sendSize();
    this.props.scrollParentToTop();
    this.props.hideLMSNavigation();
  }

  componentDidUpdate(prevProps) {
    this.props.sendSize();
    this.props.scrollParentToTop();
    if(this.props.assessmentProgress.isSubmitted) {
      appHistory.push("assessment-complete");
    }

    if(this.props.assessmentProgress.currentItemIndex != prevProps.assessmentProgress.currentItemIndex) {
      window.scrollTo(0, 0);
    }
  }

  /**
   * Will check if assessment is completed and then dispatch submit assessment
   * action
   */
  submitAssessment(){
    var complete = this.checkCompletion();
    if(complete === true){
      window.onbeforeunload = null;
      this.props.submitAssessment(
        this.props.assessment.id,
        this.props.assessment.assessmentId,
        this.props.allQuestions,
        this.props.responses,
        this.props.settings,
        this.props.outcomes
      );
    } else {
      //TODO display some sort of warning message?
    }
  }

  /**
   * Returns true if all questions have been answered, false otherwise.
   */
  checkCompletion(){
    return true;
    //TODO calculate number of unanswered questions
    // var questionsNotAnswered = [];
    // var responses = this.props.responses;
    // for (var i = 0; i < answers.length; i++) {
    //   if(answers[i] == null || answers[i].length == 0){
    //     questionsNotAnswered.push(i+1);
    //   }
    // };
    // if(questionsNotAnswered.length > 0){
    //   return questionsNotAnswered;
    // }
    // return true;
  }

  /**
   * Return an item for a given index in props.allQuestions
   */
  getItem(index){
    const props = this.props;
    if(props.questionCount === undefined || index >= props.questionCount || index < 0){
      return <div></div>;
    }

    return (
      <Item
          localizedStrings = {props.localizedStrings}
          key              = {index /* react uses this to distinguish children */}
          settings         = {props.settings}
          assessment       = {props.assessment}
          question         = {props.allQuestions[index]}
          response         = {props.responses[index] || []}
          currentItemIndex = {index}
          questionCount    = {props.questionCount}
          questionResult   = {props.questionResults[index] || {}}
          allQuestions     = {props.allQuestions}
          outcomes         = {props.outcomes || {}}
          selectAnswer     = {
            (answerId, exclusive) =>
              {this.props.answerSelected(index, answerId, exclusive);}}/>
    );
  }

  /**
   * Returns an array of Items containing the question at
   * state.assessmentProgress.currentItemIndex. The array will be of length
   * specified by props.settings.questions_per_section.
   */
  getItems(){
    let questionsPerPage = this.props.questionsPerPage;
    let current = this.props.assessmentProgress.currentItemIndex;
    let items = [];
    if(questionsPerPage > 0 && questionsPerPage < this.props.questionCount){
      let start = Math.floor(current / questionsPerPage) * questionsPerPage;
      let end = Math.floor(start + questionsPerPage);

      for(let i = start; i < end; i++){
        items.push(this.getItem(i));
      }
    } else {
      this.props.allQuestions.forEach((question, index) => {
        items.push(this.getItem(index));
      });
    }

    return items;
  }

  /**
   * Returns page content to be rendered. Will determine if questions
   * or loading bar should be rendered
   */
  getContent(){
    if(this.props.assessmentProgress.isSubmitted){
      return <Loading />;
    } else if(!this.props.assessmentLoaded) {
      return <Loading />;
    } else {
      return this.getItems();
    }
  }

/**
 * Returns a warning if there are unanswered questions and we are on the
 * last question.
 */
  getWarning(){
    let unanswered = this.checkCompletion();
    let warning;
    if(unanswered === true && this.props.isLastPage){
      warning = <div>{this.props.localizedStrings.assessment.unansweredQuestionWarning}</div>;
    }
    return warning;
  }

  submitButtonClicked(e){
    e.preventDefault();
    this.props.submitAssessment();
  }

  checkAnswersButtonClicked(e){
    e.preventDefault();

    const questionIndexes = _.range(
      this.props.assessmentProgress.currentItemIndex,
      this.props.assessmentProgress.currentItemIndex + this.props.questionsPerPage
    );

    this.props.checkAnswer(questionIndexes);
  }

  /**
   * Returns inner text for question counter
   */
  getCounter(){
    if(!this.props.assessmentLoaded){return;}

    var strings = this.props.localizedStrings;
    if(this.props.questionsPerPage === 1){
      return (
        strings.formatString(
          strings.assessment.counterQuestion,
          `${this.props.currentItem + 1}`,
          `${this.props.questionCount}`
        )
      );
    } else {
      var currentPage = (
        Math.floor(this.props.currentItem / this.props.questionsPerPage) + 1
      );
      var totalPages = (
        Math.floor(this.props.questionCount / this.props.questionsPerPage)
      );
      return (
        strings.formatString(
          strings.assessment.counterPage,
          `${this.props.currentItem + 1}`,
          `${this.props.questionCount}`
        )
      );
    }
  }

  popup(){
    return this.props.localizedStrings.assessment.leavingQuizPopup;
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  render(){
    if(this.props.settings.assessment_kind === "SUMMATIVE" && !__DEV__){
      window.onbeforeunload = () => this.popup();
    }

    let titleText =  this.props.assessment.title;
    let content = this.getContent();
    let warning;// = this.getWarning(); NOTE Temporarily removed warning because we have no need for it yet, and it looks bad.
    let counter = this.getCounter();

    if(this.props.assessmentLoaded){
      var nav = (
        <TwoButtonNav
          localizedStrings={this.props.localizedStrings.twoButtonNav}
          checkAnswers={(e) => this.checkAnswersButtonClicked(e)}
          submitAssessment={(e) => this.submitButtonClicked(e)}
          secondaryAction={this.props.secondaryActionState}
          primaryAction={this.props.primaryActionState}/>
      );
    }

    return (
      <div className="o-assessment-container">
        <div className="c-header">
          <div className="c-header__title">{titleText}</div>
          <div className="c-header__question-number">{counter}</div>
        </div>
        {warning}
        {content}
        {nav}
      </div>
    );
  }

}

export default connect(select, {...AssessmentProgress, ...CommunicationActions})(Assessment);
