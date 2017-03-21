import React        from 'react';
import _            from 'lodash';
import Item         from '../../../../_player/components/assessments/item';
import types        from '../../../../constants/question_types';

export default class PreviewQuestion extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      type: React.PropTypes.string,
      question: React.PropTypes.shape({}),
    }).isRequired,
  };

  constructor() {
    super();

    this.state = {
      response: [],
    };
  }

  convertType(type) {
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
      default:
        return null;
    }
  }

  serializeForPlayer(item) {
    switch (item.type) {
      case types.movableFillBlank:
        return {
          id: item.id,
          question_type: this.convertType(item.type),
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

      default:
        return {
          id: item.id,
          question_type: this.convertType(item.type),
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

  selectAnswer(id) {
    const { type } = this.props.item;
    if (type === types.multipleAnswer || type === types.multipleReflection) {
      if (_.includes(this.state.response, id)) {
        this.setState({ response: _.without(this.state.response, id) });
      } else {
        this.setState({ response: [...this.state.response, id] });
      }
    } else if (type === types.multipleChoice || type === types.reflection) {
      this.setState({ response: [id] });
    }
  }


  render() {
    const item = this.serializeForPlayer(this.props.item);

    const localizedStrings = {
      fileUpload: {
        chooseFile: 'Choose File'
      },
      audioUpload: {
        stop: 'Stop',
        record: 'Record',
      }
    };

    return (
      <div>
        <Item
          settings={{}}
          question={item}
          response={this.state.response}
          currentItemIndex={1}
          questionCount={1}
          questionResult={{}}
          selectAnswer={id => this.selectAnswer(id)}
          localizedStrings={localizedStrings}
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
