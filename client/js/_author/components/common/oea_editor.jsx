import React       from 'react';
import TinyWrapper from './tiny_wrapper';

export default class OeaEditor extends React.Component{
  static propTypes = {};

  constructor() {
    super();

    this.state = {
      focused: false
    };
  }

  // leaving this in for now, so that we can reference it later for styling the
  // rich text editor
  // <input
  //   ref={ref => (this.description = ref)}
  //   className="c-text-input c-text-input--medium c-wysiwyg"
  //   id={`question_name_${this.props.id}`}
  //   type="text"
  //   placeholder="Question Text"
  //   tabIndex="0"
  //   defaultValue={this.props.text}
  //   onBlur={e => this.props.updateItem({ description: e.target.value })}
  // />

  onBlur(editorText) {
    this.setState({ focused: false });
    this.props.onBlur(editorText);
  }

  render() {
    const active = this.state.focused ? "is-focused" : "";

    return (
      <div className={`c-text-input c-text-input--medium c-wysiwyg ${active}`}>
        <TinyWrapper
          {...this.props}
          onBlur={(editorText) => this.onBlur(editorText)}
          onFocus={() => this.setState({ focused: true })}
        />
      </div>
    );
  }
}
