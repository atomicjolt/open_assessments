import React   from 'react';
import TinyMCE from 'react-tinymce';

import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/lists/plugin';

import guid    from '../../../utils/guid';

export default class TinyWrapper extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    uploadImage: React.PropTypes.func.isRequired,
    onBlur: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.id = guid();
  }

  shouldComponentUpdate() {
    // TinyMCE doesn't handle rerendering very well, and everything dealing
    // with the content inside of it is completely managed by tinyMCE, so we
    // never rerender. All state that needs to be updated is done so in
    // componentWillReceiveProps or in callbacks from tinyMCE.
    return false;
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
          this.imageFilePicker.onchange = e => this.props.uploadImage(
            e.target.files[0],
            imageCallback
          );
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
          className="c-image-uploader c-file"
          type="file"
          ref={ref => (this.imageFilePicker = ref)}
        />
      </div>
    );
  }
}
