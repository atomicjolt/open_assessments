import React from 'react';
import _ from 'lodash';

import Item from '../../../_player/components/assessments/item';
import localizeStrings from '../../../_player/selectors/localize';
import * as selectors from '../../../_player/selectors/assessment';
import Parser from '../../../parsers/clix/parser';


function transformItem(item) {
  return _.merge({}, item, {
    genusTypeId: _.get(item, 'question.genusTypeId', item.genusTypeId)
  });
}

export default class PreviewContainer extends React.Component {
  static propTypes = {
    previewItems: React.PropTypes.array.isRequired,
  }

  render() {
    const assessment = Parser.parse(
      'preview',
      { data: _.map(this.props.previewItems, transformItem) });

    const questions = selectors.questions({ assessment });

    const result = questions.map((question, index) =>
      <Item
        localizedStrings={localizeStrings({ settings:{ locale:'en' } })}
        key={ `item_${index}` }
        settings={{}}
        assessment={{}}
        question={question}
        response={[]}
        currentItemIndex={index}
        questionCount={0}
        questionResult={{}}
        allQuestions={[question]}
        outcomes={{}}
        sendSize={() => {}}
        videoPlay={() => {}}
        videoPause={() => {}}
        audioPlay={() => {}}
        audioPause={() => {}}
        audioRecordStart={() => {}}
        audioRecordStop={() => {}}
        selectAnswer={() => {}}
      />
    );

    return (<div className="o-assessment-container">
      <div className="c-header">
        <div className="c-header__title">Assessment Preview</div>
        <div className="c-header__question-number" />
      </div>
      <div>{result}</div>
    </div>
    );
  }
}
