import React      from 'react';
import { connect }  from 'react-redux';

import {nextQuestions, previousQuestions}  from '../../actions/assessment_progress';
import {isFirstPage, isNextUnlocked, isPrevUnlocked, isLastPage, questionCount} from '../../selectors/assessment';
import localizeStrings                  from '../../selectors/localize';
import Button                              from '../common/button';

const select = (state, props) => {
  return {
    localizedStrings: localizeStrings(state, props).twoButtonNav,
    questionsPerPage: state.settings.questions_per_page || questionCount(state, props),
    isNextUnlocked:   isNextUnlocked(state, props),
    isPrevUnlocked:   isPrevUnlocked(state, props),
    isFirstPage:      isFirstPage(state, props),
    isLastPage:       isLastPage(state, props)
  };
};

const svg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
    <path d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z" />
  </svg>
);

/**
 * A button to navigate to the next Item or set of Items.  It's already
 * connected to the application.
 */
class _NextButton extends React.Component {

  click() {
    this.props.nextQuestions(this.props.questionsPerPage);
  }

  render() {
    let p = this.props;
    let disabled = !p.isNextUnlocked || p.isLastPage;
    return (
      <Button buttonClass="c-btn c-btn--next"
              buttonText={this.props.localizedStrings.nextButton}
              disabled={disabled}
              onClick={() => this.click()}>
        {svg}
      </Button>
    );
  }
};

/**
 * A button to navigate to the previous Item or set of Items.  It's already
 * connected to the application.
 */
class _PrevButton extends React.Component {

  render() {
    const { isPrevUnlocked, isFirstPage } = this.props;
    let disabled = !isPrevUnlocked || isFirstPage;
    return (
      <Button
        buttonClass="c-btn c-btn--previous"
        buttonText={this.props.localizedStrings.previousButton}
        disabled={disabled}
        onClick={() => this.props.previousQuestions(this.props.questionsPerPage) }>
        { svg }
      </Button>
    );
  }
}


export const NextButton = connect(select, {nextQuestions})(_NextButton);
export const PrevButton = connect(select, {previousQuestions})(_PrevButton);
