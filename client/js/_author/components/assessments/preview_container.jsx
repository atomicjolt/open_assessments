import React from 'react';
import _ from 'lodash';

import Item from '../../../_player/components/assessments/item';
import localizeStrings from '../../../_player/selectors/localize';
import * as selectors from '../../../_player/selectors/assessment';
import Parser from '../../../parsers/clix/parser';

// function parsePreviewItem(item){
//   return item;
// }
//
// function parsePreview(items) {
//   return items.map(parsePreviewItem);
// }

export default class PreviewContainer extends React.Component {
  static propTypes = {
    // assessment: React.PropTypes.object,
    // getAssessmentOffered: React.PropTypes.func,
    // settings: React.PropTypes.object
  }

  render() {

    if(this.props.previewItems.length > 0){
      // const questions = selectors.questions({
      //   assessment: {
      //     standard: "CLIx",
      //     items: this.props.previewItems,
      //   },
      // });
      const assessment = Parser.parse("fakeid", {data: this.props.previewItems});
      debugger;
      const questions = selectors.questions({assessment});
      debugger;
    }
    // parsePreview(this.props.previewItems);

    const question = {
      title:"Test Question Title",
      material:"Test Question Material"
    };
    const questionResult = {};
    const currentItemIndex = 0;
    const assessment = {};
    const questionCount = 10;
    const index = 1
    const settings = {};

    return <Item
        localizedStrings={localizeStrings({settings:{locale:"en"}})}
        key              = {index /* react uses this to distinguish children */}
        settings         = {settings}
        assessment       = {assessment}
        question         = {question}
        response         = {[]}
        currentItemIndex = {index}
        questionCount    = {10}
        questionResult   = {{}}
        allQuestions     = {[question]}
        outcomes         = {{}}
        sendSize         = {() => {}}
        videoPlay        = {() => {}}
        videoPause       = {() => {}}
        audioPlay        = {() => {}}
        audioPause       = {() => {}}
        audioRecordStart = {() => {}}
        audioRecordStop  = {() => {}}
        selectAnswer     = {
          (answerId, exclusive) =>
            {this.props.answerSelected(index, answerId, exclusive);}}
        />

    // return (<Item
    //   question={question}
    //   questionResult={questionResult}
    //   currentItemIndex={currentItemIndex}
    //   questionCount={questionCount}
    //   assessment={assessment}
    //   localizedStrings={localizeStrings({settings:{locale:"en"}})}
    // />);
  }
}
