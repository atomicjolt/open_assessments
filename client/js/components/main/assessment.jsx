"use strict";

import React                                  from "react";
import { connect }                            from "react-redux";

import * as CommunicationActions              from "../../actions/communications";
import * as AssessmentProgress                from "../../actions/assessment_progress";
import appHistory                             from "../../history";
import { localizeStrings }                    from "../../selectors/localize";
import { SECONDARY_ACTION, PRIMARY_ACTION }   from "../assessments/two_button_nav";
import TwoButtonNav                           from "../assessments/two_button_nav";
import Item                                   from "../assessments/item";
import Loading                                from "../assessments/loading";
import ProgressDropdown                       from "../common/progress_dropdown";
import { questionCount, questions, outcomes } from "../../selectors/assessment";
import { questionResults }                    from "../../selectors/assessment";

const select = (state, props) => {
  return {

    // Assessment configuration settings. these should never be modified.
    settings        : state.settings,

    // Assessment to be rendered.
    assessment      : state.assessment,

    // State of user-assessment interactions.
    assessmentProgress        : state.assessmentProgress.toJS(),

    // Current page of items to display when paging through items
    currentItem     : state.assessmentProgress.get('currentItemIndex'),

    // Array of user responses
    responses       : state.assessmentProgress.get('responses').toJS(),

    // How many questions to display at a time. Default to show all questions
    // in a section if not specified
    questionsPerPage: state.settings.questions_per_page || questionCount(state, props),

    // When the next question should be unlocked. Should be either "ON_CORRECT",
    // "ON_ANSWER_CHECK", or "ALWAYS"
    unlockNext: state.settings.unlock_next,

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

  componentDidUpdate() {
    this.props.sendSize();
    this.props.scrollParentToTop();
    if(this.props.assessmentProgress.isSubmitted) {
      appHistory.push("assessment-complete");
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
   * Determine if user should be allowed to go to next questions or not
   *
   * unlockNext - Global setting controlling when next button should
   * be available to the user. Should be one of "ON_CORRECT", "ON_ANSWER_CHECK",
   * "ALWAYS"
   *
   * currentItem - The index of the current item in the array of items
   *
   * questionsPerPage - Global setting controller how many items should be
   * displayed at once.
   *
   * questionResponses - Array of all graded responses
   *
   * responses - Array of question responses for displayed questions
   *
   * return - True if user is allowed to move onto next set of
   * questions. False otherwise.
   */
  getNextUnlocked(unlockNext, questionsPerPage, questionResponses){
    if(unlockNext === "ON_CORRECT") {
      const incorrectResponse = _.find(questionResponses, (response) => {
        return !response.correct;
      });

      return _.isUndefined(incorrectResponse) && _.compact(_.values(questionResponses)).length === questionsPerPage;
    } else if(unlockNext === "ON_ANSWER_CHECK") {

      return _.compact(_.values(questionResponses)).length === questionsPerPage;
    }
    return true;
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
          localizedStrings = {props.localizedStrings.item}
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
    } else if(!this.props.questionCount) {
      return <Loading />;
    } else {
      return this.getItems();
    }
  }

  /**
   * Returns true if the current page of items is the last page, false otherwise.
   */
  isLastPage(){
    var questionsPerPage = this.props.questionsPerPage;
    var currentPage = Math.floor(this.props.currentItem / questionsPerPage);
    var lastPage = Math.floor((this.props.questionCount - 1) / questionsPerPage);
    return currentPage === lastPage;
  }

  /**
   * Returns true if the current page of items is the first page of items,
   * false otherwise
   */
  isFirstPage(){
    var questionsPerPage = this.props.questionsPerPage;
    var currentPage = Math.floor(this.props.currentItem / questionsPerPage);
    return currentPage === 0;
  }

/**
 * Returns a warning if there are unanswered questions and we are on the
 * last question.
 */
  getWarning(){
    let unanswered = this.checkCompletion();
    let warning;
    if(unanswered === true && this.isLastPage()){
      warning = <div>this.props.localizedStrings.unansweredQuestionWarning</div>;
    }
    return warning;
  }

  nextButtonClicked(e){
    e.preventDefault();
    this.props.nextQuestions(this.props.questionsPerPage);
  }

  previousButtonClicked(e){
    e.preventDefault();
    this.props.previousQuestions(this.props.questionsPerPage);
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
    return this.props.localizedStrings.leavingQuizPopup;
  }

  checkProgress(current, total){
    return Math.floor(current/total * 100);
  }

  render(){
    if(this.props.settings.assessment_kind === "SUMMATIVE"){
      window.onbeforeunload = this.popup;
    }

    let titleText =  this.props.assessment.title;
    let content = this.getContent();
    let warning = this.getWarning();
    let counter = this.getCounter();

    let nextUnlocked = this.getNextUnlocked(
      this.props.unlockNext,
      this.props.questionsPerPage,
      this.props.questionResults,
    );

    let secondaryAction = SECONDARY_ACTION.PREV;
    let primaryAction = PRIMARY_ACTION.CHECK_ANSWERS;

    // Figure out which nav buttons to render
    if(this.isFirstPage() === true){secondaryAction = SECONDARY_ACTION.NONE;}

    if(nextUnlocked === true && this.isLastPage() === true){
      primaryAction = PRIMARY_ACTION.SUBMIT;
    } else if(nextUnlocked === true){
      primaryAction = PRIMARY_ACTION.NEXT;
    }

    return (
      <div className="o-assessment-container">
        <div className="c-header">
          <div className="c-header__title">{titleText}</div>
          <div className="c-header__question-number">{counter}</div>
        </div>
        {warning}
        {content}
        <TwoButtonNav
          localizedStrings={this.props.localizedStrings.twoButtonNav}
          goToNextQuestions={(e) => this.nextButtonClicked(e)}
          goToPreviousQuestions={(e) => this.previousButtonClicked(e)}
          checkAnswers={(e) => this.checkAnswersButtonClicked(e)}
          submitAssessment={(e) => this.submitButtonClicked(e)}
          secondaryAction={secondaryAction}
          primaryAction={primaryAction}/>
      </div>
    );
  }

}

export default connect(select, {...AssessmentProgress, ...CommunicationActions})(Assessment);
