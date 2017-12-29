import React                  from 'react';
import Editor                 from '../../../common/oea_editor';
import types                  from '../../../../../constants/question_types';
import { localeFromLanguage } from '../../../../../constants/language_types';
import localize               from '../../../../locales/localize';
import HelpLink                   from '../../help_link';

class QuestionText extends React.Component {
  static propTypes = {
    itemId: React.PropTypes.string.isRequired,
    text: React.PropTypes.string,
    editorKey: React.PropTypes.string,
    updateItem: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    itemType: React.PropTypes.string,
    fileIds: React.PropTypes.shape({}),
    language: React.PropTypes.string,
    isActive: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({ text: nextProps.text });
    }
  }

  render() {
    const strings = this.props.localizeStrings();
    strings.setLanguage(localeFromLanguage(this.props.language));
    const questionTextStrings = strings.questionText;
    const helpLink = this.props.isActive ?
      <HelpLink to="/help.html#user-content-question-text" /> :
      null;
    switch (this.props.itemType) {
      case types.movableFillBlank:
        return (
          <div>
            <div className="au-c-movable__answers__label">
              {strings.instructions}
            </div>
            <div className="au-c-input au-c-fill-in-the-blank-text">
              {helpLink}
              <label htmlFor={`fillBlankText_${this.props.itemId}`} />
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--medium au-c-wysiwyg"
                  type="text"
                  placeholder={questionTextStrings.fitbPlaceholder}
                  onBlur={e => this.props.updateItem({ question: { text: e.target.value } })}
                  onChange={e => this.setState({ text: e.target.value })}
                  value={this.state.text}
                  id={`fillBlankText_${this.props.itemId}`}
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="au-c-input au-c-question__text">
            {helpLink}
            <label htmlFor={`question_text_${this.props.itemId}`} />
            <Editor
              textSize="medium"
              fileIds={this.props.fileIds}
              text={this.state.text}
              placeholder={questionTextStrings.otherPlaceholder}
              editorKey={this.props.editorKey}
              onBlur={(val, fileIds) => this.props.updateItem({ question: { text: val, fileIds } })}
              bankId={this.props.bankId}
              language={this.props.language}
            />
          </div>
        );
    }
  }
}

// send narrow=false to this so that we can
//   change the language of localization
export default localize(QuestionText, false);
