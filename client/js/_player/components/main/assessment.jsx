import React        from 'react';
import { connect }  from 'react-redux';

import * as AssessmentProgress    from '../../actions/assessment_progress';
import * as CommunicationActions  from '../../actions/communications';
import * as MediaAnalyticsActions from '../../actions/media_analytics';
import appHistory                 from '../../history';
import * as selectors             from '../../selectors/assessment';
import localizeStrings            from '../../selectors/localize';
import Item                       from '../assessments/item';
import Loading                    from '../assessments/loading'; // eslint-disable-line import/no-named-as-default
import ThreeButtonNav             from '../assessments/three_button_nav';
import TwoButtonNav               from '../assessments/two_button_nav';


const select = (state, props) => ({
  // Assessment configuration settings. these should never be modified.
  settings        : state.settings,

  // If a vital API call(get assessment, etc) fails the error will be put here.
  application     : state.application,

  // Assessment to be rendered.
  assessment      : state.assessment,

  // Returns true if assessment has loaded, false otherwise
  assessmentLoaded: selectors.assessmentLoaded(state, props),

  // State of user-assessment interactions.
  assessmentProgress        : state.assessmentProgress.toJS(),

  // Current page of items to display when paging through items
  currentItem     : state.assessmentProgress.get('currentItemIndex'),

  // Array of user responses
  responses       : state.assessmentProgress.get('responses').toJS(),

  // How many questions to display at a time. Default to show all questions
  // in a section if not specified
  questionsPerPage: state.settings.questions_per_page || selectors.questionCount(state, props),

  // How many Items are in the assessment
  questionCount   : selectors.questionCount(state, props),

  // Array containing all assessment Items
  allQuestions    : selectors.questions(state, props),

  // Array of graded user response objects containing keys
  // correct:true/false, feedback:"Answer feedback",
  // answerIds: answers feedback applies to
  questionResults: selectors.questionResults(state, props),

  // User facing strings of the language specified by the 'locale' setting
  localizedStrings: localizeStrings(state, props),

  // State of the nav primary action button. e.g. (PRIMARY_ACTION.SUBMIT)
  primaryActionState: selectors.primaryActionState(state),

  // State of the nav secondary action button. e.g. (SECONDARY_ACTION.PREV)
  secondaryActionState: selectors.secondaryActionState(state),

  // TODO
  outcomes: selectors.outcomes(state, props),

  // How many items the student has given correct responses for
  correctItemCount: selectors.correctItemCount(state, props)
});

export class Assessment extends React.Component {
  static propTypes = {
    assessmentProgress: React.PropTypes.shape({
      assessmentResult: React.PropTypes.string,
      isSubmitted: React.PropTypes.bool,
      currentItemIndex: React.PropTypes.number,
    }),
    assessmentViewed: React.PropTypes.func,
    settings: React.PropTypes.shape({
      assessment_kind: React.PropTypes.string,
      locale: React.PropTypes.string,
    }),
    assessment: React.PropTypes.shape({
      title: React.PropTypes.string,
      id: React.PropTypes.string,
      assessmentId: React.PropTypes.string,
      requireNAnswers: React.PropTypes.number,
    }),
    sendSize: React.PropTypes.func,
    scrollParentToTop: React.PropTypes.func,
    hideLMSNavigation: React.PropTypes.func,
    submitAssessment: React.PropTypes.func,
    allQuestions: React.PropTypes.arrayOf(React.PropTypes.shape({})),
    responses: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.shape({}))),
    outcomes: React.PropTypes.shape({}),
    answerSelected: React.PropTypes.func,
    questionsPerPage: React.PropTypes.number,
    questionCount: React.PropTypes.number,
    application: React.PropTypes.shape({
      error_message: React.PropTypes.string,
      error: React.PropTypes.shape({
        message: React.PropTypes.string,
      }),
    }),
    assessmentLoaded: React.PropTypes.bool,
    isLastPage: React.PropTypes.bool,
    localizedStrings: React.PropTypes.shape({
      dir: React.PropTypes.string,
      twoButtonNav: React.PropTypes.shape({}),
      assessment: React.PropTypes.shape({
        unansweredQuestionWarning: React.PropTypes.string,
        leavingQuizPopup: React.PropTypes.string,
      }),
    }),
    currentItem: React.PropTypes.number,
    correctItemCount: React.PropTypes.number,
    secondaryActionState: React.PropTypes.shape({}),
    primaryActionState: React.PropTypes.string,
  };

  /**
   * Returns true if all questions have been answered, false otherwise.
   */
  static checkCompletion() {
    return true;
    // TODO calculate number of unanswered questions
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

  componentWillMount() {
    if (this.props.assessmentProgress.assessmentResult != null) {
      appHistory.push('assessment-result');
    }
  }

  componentDidMount() {
    // Trigger action to indicate the assessment was viewed
    this.props.assessmentViewed(this.props.settings, this.props.assessment);

    this.props.sendSize();
    this.props.scrollParentToTop();
    this.props.hideLMSNavigation();
  }

  componentDidUpdate(prevProps) {
    this.props.sendSize();

    if (this.props.assessmentProgress.isSubmitted) {
      appHistory.push('assessment-complete');
    }

    if (this.props.assessmentProgress.currentItemIndex !==
      prevProps.assessmentProgress.currentItemIndex
    ) {
      this.props.scrollParentToTop(); // Scroll to top when we get a new question
      window.scrollTo(0, 0);
    }
  }

  /**
   * Return an item for a given index in props.allQuestions
   */
  getItem(index) {
    const props = this.props;
    if (props.questionCount === undefined || index >= props.questionCount || index < 0) {
      return null;
    }

    // Normally you don't want to use index for key, but in this case the
    // question index is a definitive identifier for the question in the assessment.
    return (
      <Item
        key={index}
        localizedStrings={props.localizedStrings}
        settings={props.settings}
        assessment={props.assessment}
        question={props.allQuestions[index]}
        response={props.responses[index] || []}
        currentItemIndex={index}
        questionCount={props.questionCount}
        questionResult={props.questionResults[index] || {}}
        allQuestions={props.allQuestions}
        outcomes={props.outcomes || {}}
        sendSize={props.sendSize}
        videoPlay={props.videoPlay}
        videoPause={props.videoPause}
        audioPlay={props.audioPlay}
        audioPause={props.audioPause}
        audioRecordStart={props.audioRecordStart}
        audioRecordStop={props.audioRecordStop}
        selectAnswer={(answerData, exclusive) => (
          this.props.answerSelected(index, answerData, exclusive)
        )}
      />
    );
  }

  /**
   * Returns an array of Items containing the question at
   * state.assessmentProgress.currentItemIndex. The array will be of length
   * specified by props.settings.questions_per_section.
   */
  getItems() {
    const questionsPerPage = this.props.questionsPerPage;
    const current = this.props.assessmentProgress.currentItemIndex;
    const items = [];
    if (questionsPerPage > 0 && questionsPerPage < this.props.questionCount) {
      const start = Math.floor(current / questionsPerPage) * questionsPerPage;
      const end = Math.floor(start + questionsPerPage);

      for (let i = start; i < end; i += 1) {
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
  getContent() {
    if (this.props.application.error_message) {
      return (
        <div className="c-player-error">
          <p>{this.props.application.error_message}:</p>
          <blockquote>{this.props.application.error.message}</blockquote>
        </div>
      );
    } else if (this.props.assessmentProgress.isSubmitted) {
      return <Loading />;
    } else if (!this.props.assessmentLoaded) {
      return <Loading />;
    }

    return this.getItems();
  }

  /**
   * Returns a warning if there are unanswered questions and we are on the last
   * question.
   */
  getWarning() {
    const unanswered = Assessment.checkCompletion();
    let warning;
    if (unanswered === true && this.props.isLastPage) {
      warning = <div>{this.props.localizedStrings.assessment.unansweredQuestionWarning}</div>;
    }
    return warning;
  }

  /**
   * Returns inner text for question counter
   */
  getCounter() {
    if (!this.props.assessmentLoaded) return '';

    const strings = this.props.localizedStrings;
    if (this.props.questionsPerPage === 1) {
      return (
        strings.formatString(
          strings.assessment.counterQuestion,
          `${this.props.currentItem + 1}`,
          `${this.props.questionCount}`
        )
      );
    }

    // const currentPage = (
    //   Math.floor(this.props.currentItem / this.props.questionsPerPage) + 1
    // );
    // const totalPages = (
    //   Math.floor(this.props.questionCount / this.props.questionsPerPage)
    // );
    return (
      strings.formatString(
        strings.assessment.counterPage,
        `${this.props.currentItem + 1}`,
        `${this.props.questionCount}`
      )
    );

  }

  submitButtonClicked() {
    this.props.submitAssessment();
  }

  /**
   * Will check if assessment is completed and then dispatch submit assessment
   * action
   */
  submitAssessment() {
    const complete = Assessment.checkCompletion();
    if (complete) {
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
      // TODO display some sort of warning message?
    }
  }

  popup() {
    return this.props.localizedStrings.assessment.leavingQuizPopup;
  }

  renderRemainingStatus() {
    const required = this.props.assessment.requireNAnswers;
    if (required === -1) return null;

    const correct = this.props.correctItemCount;
    const remaining = required - correct;
    const strings = this.props.localizedStrings;
    let text;

    if (remaining === 0) {
      text = strings.remaining.done;
    } else if (remaining === 1) {
      text = strings.remaining.one_left;
    } else if (remaining >= 2) {
      text = strings.formatString(strings.remaining.many_left, remaining);
    }

    return <div className="c-header__remaining">{text}</div>;
  }

  render() {
    if (this.props.settings.assessment_kind === 'SUMMATIVE' && !__DEV__) {
      window.onbeforeunload = () => this.popup();
    }

    const titleText =  this.props.assessment.title;
    const content = this.getContent();
    // NOTE Temporarily removed warning because we have no need for it yet, and it looks bad.
    // const warning = this.getWarning();
    const warning = null;
    const counter = this.getCounter();
    let nav = null;

    if (this.props.assessmentLoaded) {
      if (this.props.assessment.requireNAnswers === -1) {
        nav = (
          <TwoButtonNav
            localizedStrings={this.props.localizedStrings.twoButtonNav}
            submitAssessment={() => this.submitButtonClicked()}
            secondaryAction={this.props.secondaryActionState}
            primaryAction={this.props.primaryActionState}
          />
        );
      } else {
        nav = (
          <ThreeButtonNav />
        );
      }
    }

    return (
      <div
        className="o-assessment-container"
        lang={this.props.settings.locale}
        dir={this.props.localizedStrings.dir}
      >
        <div className="c-header">
          {this.renderRemainingStatus()}
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

export default connect(
  select,
  { ...AssessmentProgress, ...CommunicationActions, ...MediaAnalyticsActions }
)(Assessment);
