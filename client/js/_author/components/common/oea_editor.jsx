import React from 'react';
import { connect } from 'react-redux';
import TinyMCE     from 'react-tinymce';
import guid from '../../../utils/guid';

import * as AssetActions from '../../../actions/qbank/assets';

function select(state) {
  return {
    uploadedAssets: state.uploadedAssets,
    apiUrl: state.settings.api_url,
  };
}

export class OeaEditor extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    uploadImage: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
  };

  constructor() {
    super();

    this.state = {
      text: '',
      imageCallback: null,
      imageGuid: null,
      uploadingImage: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const imageUrl = nextProps.uploadedAssets[this.state.imageGuid];
    if(this.state.uploadingImage && imageUrl) {
      this.state.imageCallback(imageUrl);
      this.setState({uploadingImage: false});
    }
  }

  shouldComponentUpdate() {
    // TinyMCE doesn't handle rerendering very well, and everything dealing
    // with the content inside of it is completely managed by tinyMCE, so we
    // never rerender. All state that needs to be updated is done so in
    // componentWillReceiveProps or in callbacks from tinyMCE.
    return false;
  }

  uploadImage(e) {
    const imageGuid = guid();
    this.setState({ imageGuid, uploadingImage: true });
    this.props.uploadImage(
      e.target.files[0],
      imageGuid,
      this.props.bankId,
      this.props.apiUrl
    );
  }

  tinyMCEConfig() {
    return {
      menubar: false,
      statusbar: false,
      file_picker_types: 'image',
      file_picker_callback: (imageCallback, value, meta) => {
        if (meta.filetype === 'image') {
          this.setState({ imageCallback });
          this.imageFilePicker.click();
        }
      },
      plugins: 'autolink link image lists',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright image',
    };
  }

  render() {
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
    return (
      <div>
        <TinyMCE
          content={this.props.text}
          config={this.tinyMCEConfig()}
          onBlur={e => this.props.onBlur(e.target.getContent())}
        />
        <input
          className="c-image-uploader"
          type="file"
          ref={ref => (this.imageFilePicker = ref)}
          onChange={e => this.uploadImage(e) }
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(OeaEditor);
