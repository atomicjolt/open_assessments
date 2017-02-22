import React from 'react';
import _ from 'lodash';

import Item from '../../../_player/components/assessments/item';
import localizeStrings from '../../../_player/selectors/localize';

export default class PreviewContainer extends React.Component {
  static propTypes = {
    assessment: React.PropTypes.object,
    getAssessmentOffered: React.PropTypes.func,
    settings: React.PropTypes.object
  }

  render() {

    const question = {
      title:"Test Question Title",
      material:"Test Question Material"
    };
    const questionResult = {};
    const currentItemIndex = 0;
    const assessment = {};
    const questionCount = 10;

    return (<Item
      question={question}
      questionResult={questionResult}
      currentItemIndex={currentItemIndex}
      questionCount={questionCount}
      assessment={assessment}
      localizedStrings={localizeStrings({settings:{locale:"en"}})}
    />);
  }
}
