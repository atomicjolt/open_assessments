import React            from 'react';
import Editor           from '../../../common/oea_editor';
import localize         from '../../../../locales/localize';
import { languageText } from '../../../../../utils/utils';
import { getLanguage } from '../../../../../constants/language_types';

class optionFeedback extends React.Component {
  static propTypes = {
    feedback: React.PropTypes.string,
    feedbacks: React.PropTypes.arrayOf(React.PropTypes.object),
    bankId: React.PropTypes.string.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool,
    fileIds: React.PropTypes.shape({}),
    language: React.PropTypes.string.isRequired,
  };

  render() {
    const hidden = this.props.hidden ? 'is-hidden' : '';
    const strings = this.props.localizeStrings('optionFeedback');
    const text = languageText(this.props.feedbacks, this.props.language);

    return (
      <div
        key={this.props.language}
        className={`au-c-input au-c-input-label--left au-c-feedback ${hidden}`}
      >
        <label htmlFor="feedback1">{strings.feedback}</label>
        <Editor
          editorKey={getLanguage(this.props.language)}
          textSize="smaller"
          fileIds={this.props.fileIds}
          text={text}
          bankId={this.props.bankId}
          onBlur={(newText, fileIds) => this.props.updateChoice({ feedback: newText, fileIds })}
        />
      </div>
    );
  }
}

export default localize(optionFeedback);
