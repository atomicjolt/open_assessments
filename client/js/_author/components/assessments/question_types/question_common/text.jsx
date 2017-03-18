import React      from 'react';
import Editor     from '../../../common/oea_editor';
import types      from '../../../../../constants/question_types';

export default class questionText extends React.Component {
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
    switch (this.props.itemType) {
      case types.movableFillBlank:
        return (
          <div>
            <div className="au-c-movable__answers__label">
              To insert blank, add &#91; &#95; &#93; where you want the blank to show up.
            </div>
            <div className="au-c-input au-c-fill-in-the-blank-text">
              <label htmlFor={`fillBlankText_${this.props.itemId}`} />
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--medium au-c-wysiwyg"
                  type="text"
                  placeholder="Fill in the &#91; &#95; &#93; Text"
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
            <label htmlFor={`question_text_${this.props.itemId}`} />
            <Editor
              textSize="medium"
              fileIds={this.props.fileIds}
              text={this.state.text}
              placeholder="Question Text"
              editorKey={this.props.editorKey}
              onBlur={(val, fileIds) => this.props.updateItem({ question: { text: val, fileIds } })}
              bankId={this.props.bankId}
              uploadScopeId={this.props.itemId}
            />
          </div>
        );
    }
  }
}

questionText.propTypes = {
  itemId: React.PropTypes.string.isRequired,
  text: React.PropTypes.string,
  editorKey: React.PropTypes.string,
  updateItem: React.PropTypes.func.isRequired,
  bankId: React.PropTypes.string.isRequired,
};
