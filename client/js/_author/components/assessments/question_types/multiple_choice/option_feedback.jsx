import React    from 'react';
import Editor   from '../../../common/oea_editor';
import localize from '../../../../locales/localize';

class optionFeedback extends React.Component {
  static propTypes = {
    feedback: React.PropTypes.string,
    bankId: React.PropTypes.string.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    hidden: React.PropTypes.bool,
    fileIds: React.PropTypes.shape({}),
  };

  render() {
    const hidden = this.props.hidden ? 'is-hidden' : '';
    const strings = this.props.localizeStrings('optionFeedback');
    return (
      <div className={`au-c-input au-c-input-label--left au-c-feedback ${hidden}`}>
        <label htmlFor="feedback1">{strings.feedback}</label>
        <Editor
          textSize="smaller"
          fileIds={this.props.fileIds}
          text={this.props.feedback}
          bankId={this.props.bankId}
          onBlur={(text, fileIds) => this.props.updateChoice({ feedback: text, fileIds })}
        />
      </div>
    );
  }
}

export default localize(optionFeedback);
