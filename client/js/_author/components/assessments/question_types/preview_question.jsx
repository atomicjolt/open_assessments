import React        from 'react';
import _            from 'lodash';
import videojs      from 'video.js';

import Item         from '../../../../_player/components/assessments/item';
import types        from '../../../../constants/question_types';
import localize     from '../../../locales/localize';
import Spinner      from '../../common/dot_loader';

const exclusiveTypes = {
  multiple_choice_question: true,
  multiple_answers_question: false,
  movable_words_sentence: false,
  fill_the_blank_question: true,
  movable_words_sandbox: false,
  movable_object_chain: false,
  clix_drag_and_drop: false,
};

class PreviewQuestion extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      type: React.PropTypes.string,
      question: React.PropTypes.shape({}),
      isUpdating: React.PropTypes.bool.isRequired,
    }).isRequired,
    localizeStrings: React.PropTypes.func.isRequired
  };

  static convertType(type) {
    switch (type) {
      case types.multipleChoice:
      case types.reflection:
        return 'multiple_choice_question';
      case types.multipleAnswer:
      case types.multipleReflection:
        return 'multiple_answers_question';
      case types.shortAnswer:
        return 'short_answer_question';
      case types.fileUpload:
        return 'file_upload_question';
      case types.audioUpload:
        return 'audio_upload_question';
      case types.movableWordSentence:
        return 'movable_words_sentence';
      case types.movableFillBlank:
        return 'fill_the_blank_question';
      case types.movableWordSandbox:
        return 'movable_words_sandbox';
      case types.imageSequence:
        return 'movable_object_chain';
      case types.dragAndDrop:
        return 'clix_drag_and_drop';
      default:
        return null;
    }
  }

  constructor() {
    super();

    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    this.initializeVideoJs();
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.isUpdating !== prevProps.item.isUpdating) {
      this.initializeVideoJs();
    }
  }

  initializeVideoJs() {
    if (!_.isFunction(videojs) || !this.preview) return;
    // Look for videos that should be using videojs.
    const videoJSElements = this.preview.querySelectorAll('video.video-js');
    _.each(videoJSElements, element => videojs(element));
  }

  serializeForPlayer(item) {
    const questionType = PreviewQuestion.convertType(item.type);

    switch (item.type) {
      case types.movableFillBlank:
        return {
          id: item.id,
          question_type: questionType,
          material: item.question.text,
          isHtml: true,
          answers: _.map(item.question.choices, answer => ({
            id: answer.id,
            material: `<p class="${answer.wordType}">${answer.text}</p>`,
          })),
          question_meta: {
            fillTheBlankSentence: _.map(item.question.text.split(' '), (word) => {
              if (word === '[_]') {
                return '<p class="interaction-placeholder"></p>';
              }
              return `<p class="other">${word}</p>`;
            }),
            expectedLines: 1,
          }
        };

      case types.imageSequence:
        return {
          id: item.id,
          question_type: questionType,
          material: item.question.text,
          isHtml: true,
          answers: _.map(item.question.choices, answer => ({
            id: answer.id,
            material: `<p><img src="${answer.text}"></p>`
          })),
          question_meta: {
            expectedLines: 1,
          }
        };
      case types.movableWordSandbox:
      case types.movableWordSentence:
        return {
          id: item.id,
          question_type: questionType,
          material: item.question.text,
          isHtml: true,
          answers: _.map(item.question.choices, answer => ({
            id: answer.id,
            material: `<p class="${answer.wordType}">${answer.text}</p>`
          })),
        };

      case types.dragAndDrop:
        return {
          id: item.id,
          response: this.state.response,
          question_type: questionType,
          material: item.question.text,
          isHtml: true,
          answers: _.map(item.question.dropObjects, droppable => ({
            id: droppable.id,
            text: `<img src="${droppable.image}">`,
            reuse: 1
          })),
          question_meta: {
            targets: [{
              id: item.question.target.id,
              text: `<img src="${item.question.target.image}">`,
            }],
            zones: _.map(item.question.zones, zone => ({
              id: zone.id,
              spatialUnit: {
                height: zone.height,
                width: zone.width,
                coordinateValues: [zone.xPos, zone.yPos]
              },
              name: zone.label,
              dropBehaviorType: `%3A${zone.type}%40`,
              visible: zone.visible,
            })),
          }
        };

      default:
        return {
          id: item.id,
          question_type: questionType,
          material: item.question.text,
          isHtml: true,
          answers: _.map(item.question.choices, answer => ({
            id: answer.id,
            material: answer.text,
          })),
          question_meta: {
            expectedLines: 1,
          }
        };
    }
  }

  selectAnswer(answerData) {
    // Almost all of this logic is copied from the player assessment_progress reducer
    const isExclusive = exclusiveTypes[PreviewQuestion.convertType(this.props.item.type)];
    let response;

    if (isExclusive) {
      response = [];
    } else {
      response = _.cloneDeep(this.state.response);
    }

    const answerIndex = _.findIndex(this.state.response, (answer) => {
      if (typeof answerData === 'string' || typeof answerData === 'number') {
        return answerData === answer;
      }

      return _.isEqual(answer.id, answerData.id);
    });
    if (answerIndex > -1) {
      if (!isExclusive) {
        _.pullAt(response, answerIndex);
      }
    } else {
      response.push(answerData);
    }

    return this.setState({ response });
  }


  render() {
    if (this.props.item.isUpdating) {
      return (
        <div className="loader-container">
          <Spinner />
        </div>
      );
    }

    const item = this.serializeForPlayer(this.props.item);
    return (
      <div ref={ref => (this.preview = ref)}>
        <Item
          settings={{}}
          question={item}
          response={this.state.response}
          currentItemIndex={1}
          questionCount={1}
          questionResult={{}}
          selectAnswer={id => this.selectAnswer(id)}
          localizedStrings={this.props.localizeStrings('previewQuestion')}
          sendSize={() => {}}
          videoPlay={() => {}}
          videoPause={() => {}}
          audioPlay={() => {}}
          audioPause={() => {}}
          audioRecordStart={() => {}}
          audioRecordStop={() => {}}
          createChoice={() => {}}
          deleteChoice={() => {}}
        />
      </div>
    );
  }
}

export default localize(PreviewQuestion);
