import React from 'react';
import { connect } from 'react-redux';
import TinyMCE     from 'react-tinymce';
import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/lists/plugin';
import guid from '../../../utils/guid';

import * as AssetActions from '../../../actions/qbank/assets';

function select(state) {
  return {
    uploadedAssets: state.uploadedAssets,
    apiUrl: state.settings.api_url,
  };
}

export class TinyWrapper extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    uploadImage: React.PropTypes.func.isRequired,
    bankId: React.PropTypes.string.isRequired,
    apiUrl: React.PropTypes.string.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      imageCallback: null,
      imageGuid: null,
      uploadingImage: false
    };

    this.id = guid();
  }

  componentWillReceiveProps(nextProps) {
    const imageUrl = nextProps.uploadedAssets[this.state.imageGuid];
    if (this.state.uploadingImage && imageUrl) {
      this.state.imageCallback(imageUrl);
      this.setState({ uploadingImage: false });
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
    // Whenever you add a plugin, make sure that it is imported above.
    return {
      fixed_toolbar_container: `#${this.id}`,
      skin: false,
      menubar: false,
      statusbar: false,
      file_picker_types: 'image',
      file_picker_callback: (imageCallback, value, meta) => {
        if (meta.filetype === 'image') {
          this.setState({ imageCallback });
          this.imageFilePicker.click();
        }
      },
      plugins: 'autolink link image lists paste code charmap',
      toolbar: 'bold italic removeformat | bullist numlist  blockquote | code charmap subscript superscript | image',
      inline: true,
      paste_data_images: true,
    };
  }

  render() {
    return (
      <div>
        <div id={this.id} />
        <TinyMCE
          content={this.props.text}
          config={this.tinyMCEConfig()}
          onBlur={e => this.props.onBlur(e.target.getContent())}
          onFocus={this.props.onFocus}
        />
        <input
          style={{width: '0.1px', height: '0.1px', display: 'none'}}
          className="c-image-uploader"
          type="file"
          ref={ref => (this.imageFilePicker = ref)}
          onChange={e => this.uploadImage(e)}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(TinyWrapper);
