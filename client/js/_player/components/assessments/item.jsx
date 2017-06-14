import React                   from 'react';
import _                       from 'lodash';
import videojs                 from 'video.js';
import UniversalInput          from './universal_input';

export default class Item extends React.Component {

  static propTypes = {
    // Assessment configuration settings. these should never be modified.
    settings          : React.PropTypes.object,

    // Item to be displayed
    question          : React.PropTypes.object.isRequired,

    // Array of selected answer IDs
    response          : React.PropTypes.array.isRequired,

    // The position of the item in the array of items
    currentItemIndex  : React.PropTypes.number.isRequired,

    // How many questions are being checked
    numQuestionsChecking  : React.PropTypes.number.isRequired,

    // The total number of items in the array of items
    questionCount     : React.PropTypes.number.isRequired,

    // Graded user response object containing keys
    // correct:true/false, feedback:"Answer feedback"
    questionResult    : React.PropTypes.object.isRequired,

    selectAnswer      : React.PropTypes.func.isRequired,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings  : React.PropTypes.object.isRequired,

    // Actions to call when media events occur
    videoPlay         : React.PropTypes.func.isRequired,
    videoPause        : React.PropTypes.func.isRequired,
    audioPlay         : React.PropTypes.func.isRequired,
    audioPause        : React.PropTypes.func.isRequired,
    audioRecordStart  : React.PropTypes.func.isRequired,
    audioRecordStop   : React.PropTypes.func.isRequired,
  }

  componentDidMount() {

    if (typeof MathJax !== 'undefined') {
      MathJax.Hub.Queue(new Array('Typeset', MathJax.Hub));
    }

    if (!_.isFunction(videojs)) { return; }
    // Look for videos that should be using videojs.
    const videoJSElements = document.querySelectorAll('video.video-js');
    _.each(videoJSElements,(element) => videojs(element));

    const material = document.getElementsByClassName('c-question')[0];
    if (material !== undefined) {
      // loadElements are elements we expect to change the size of the DOM when
      // they load, and that support the 'load' event.
      const loadElements = Array.from(material.querySelectorAll('img, object'));
      loadElements.forEach((e) => {
        e.addEventListener('load', () => this.props.sendSize());
      });

      // mediaElements are elements that could change the size of the DOM, and
      // support media element events like 'loadstart', and 'loadedmetadata'.
      const mediaElements = Array.from(material.querySelectorAll('video, audio'));
      mediaElements.forEach((e) => {
        e.addEventListener('loadstart', () => this.props.sendSize());
        e.addEventListener('loadedmetadata', () => this.props.sendSize());
      });
    }

    const videoElements = document.querySelectorAll('video');
    _.each(videoElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.videoPlay(e.target.id || e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        this.props.videoPause(e.target.id || e.target.src, e.target.currentTime);
      }, false);
    });

    const audioElements = document.querySelectorAll('audio');
    _.each(audioElements, (element) => {
      element.addEventListener('play', (e) => {
        this.props.audioPlay(e.target.id || e.target.src, e.target.currentTime);
      }, false);

      element.addEventListener('pause', (e) => {
        this.props.audioPause(e.target.id || e.target.src, e.target.currentTime);
      }, false);
    });
  }

  getFeedback() {
    const questionResult = this.props.questionResult;
    const questionType = this.props.question.question_type;
    let answerFeedback;


    if (questionResult) {

      if (questionResult.correct === true) {
        switch (questionType) {
          case 'survey_question':
            answerFeedback = (
              <div className="c-question-feedback  c-feedback--correct">
                <div dangerouslySetInnerHTML={{ __html:questionResult.feedback }} />
              </div>
            );
            break;
          default:
            answerFeedback = (
              <div className="c-question-feedback  c-feedback--correct">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                  <path d="M24 4C12.95 4 4 12.95 4 24c0 11.04 8.95 20 20 20 11.04 0 20-8.96 20-20 0-11.05-8.96-20-20-20zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z" />
                </svg>
                <div dangerouslySetInnerHTML={{ __html:questionResult.feedback }} />
              </div>
            );
        }
      } else if (questionResult.correct === false || questionResult.correct === null) {

        answerFeedback = (
          <div className="c-question-feedback  c-feedback--incorrect">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
              <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z" />
            </svg>
            <div
              dangerouslySetInnerHTML={{ __html:questionResult.feedback }}
              ref={node => (this.responseNode = node)}
            />
          </div>
        );
      }
    }
    return (
      <div>
        {answerFeedback}
      </div>
    );
  }

  disabledCheck() {
    const questRslt = this.props.questionResult;
    if (questRslt.correct === true) {
      return true;
    }
    return false;
  }

  render() {
    const numQuestionsChecking = this.props.numQuestionsChecking;
    return (
      <div className="c-question">
        <div className="c-question-prompt">
          <div dangerouslySetInnerHTML={{ __html: this.props.question.material }} />
        </div>
        <div className="c-answers">
          <UniversalInput
            settings={this.props.settings}
            item={this.props.question}
            isResult={this.disabledCheck()}
            selectAnswer={this.props.selectAnswer}
            response={this.props.response}
            questionResult={this.props.questionResult}
            localizedStrings={this.props.localizedStrings}
            audioRecordStart={this.props.audioRecordStart}
            audioRecordStop={this.props.audioRecordStop}
          />
        </div>
        {numQuestionsChecking ? null : this.getFeedback() }
      </div>
    );
  }
}
