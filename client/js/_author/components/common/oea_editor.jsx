import React from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML, convertToRaw, ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import * as AssetActions from '../../../actions/qbank/assets';

export class OeaEditor extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    uploadImage: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    let contentState;

    if (this.props.text === '') {
      contentState = ContentState.createFromText('');
    } else {
      const blocksFromHTML = htmlToDraft(this.props.text);
      contentState = ContentState.createFromBlockArray(blocksFromHTML);
    }

    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState,
    };

    // const blocksFromHTML = convertFromHTML(this.props.text);
    // const state = ContentState.createFromBlockArray(
    //   blocksFromHTML.contentBlocks,
    //   blocksFromHTML.entityMap,
    // );
    //
    // this.state = {
    //   editorState: EditorState.createWithContent(state),
    // };


  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  }

  onBlur() {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.onBlur(draftToHtml(rawContentState));
  }

  uploadImage(file) {
    return new Promise((resolve) => {
      this.props.uploadImage(file, resolve, this.props.bankId);
    });
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onEditorStateChange={editorState => this.onEditorStateChange(editorState)}
        onBlur={() => this.onBlur()}
        toolbar={{
          image: {
            uploadCallback: file => this.uploadImage(file)
          }
        }}
      />
    );
  }
}

export default connect(null, AssetActions)(OeaEditor);
