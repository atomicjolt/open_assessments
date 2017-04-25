import React            from 'react';
import _                from 'lodash';
import Editor           from '../../../common/oea_editor';
import { languageText } from '../../../../../utils/utils';
import { getLanguage }  from '../../../../../constants/language_types';

export default class SingleFeedback extends React.Component {
  static propTypes = {
    updateItem: React.PropTypes.func.isRequired,
    feedbackType: React.PropTypes.string.isRequired,
    bankId: React.PropTypes.string.isRequired,
    language: React.PropTypes.string.isRequired,
    feedback: React.PropTypes.shape({
      text: React.PropTypes.string,
    }),
    labelText: React.PropTypes.string,
  };

  updateItem(text, fileIds) {
    this.props.updateItem({
      question: {
        [this.props.feedbackType]: { text, fileIds }
      },
    });
  }

  render() {
    const texts = _.get(this.props.feedback, 'texts');
    const text = languageText(texts, this.props.language);

    return (
      <div className="au-c-input au-c-input-label--left au-c-feedback">
        <label htmlFor="feedbackCorrect">{this.props.labelText}</label>
        <Editor
          editorKey={getLanguage(this.props.language)}
          textSize="smaller"
          fileIds={_.get(this.props.feedback, 'fileIds')}
          text={text}
          bankId={this.props.bankId}
          onBlur={(newText, fileIds) => this.updateItem(newText, fileIds)}
        />
      </div>
    );
  }
}
