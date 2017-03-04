import React   from 'react';
import TinyMCE from 'react-tinymce';

import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/media/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/lists/plugin';

import guid    from '../../../utils/guid';

export default class TinyWrapper extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    uploadMedia: React.PropTypes.func.isRequired,
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
      file_picker_types: 'file image media',
      file_picker_callback: (callback, value, meta) => {
        switch (meta.filetype) {
          case 'image':
          case 'media':
            this.filePicker.onchange = e => this.props.uploadMedia(
              e.target.files[0],
              callback
            );
            this.filePicker.click();
            break;
          default:
            break;
        }
      },
      media_url_resolver: (data, resolve) => {
        // const type = data.source1mime ? ` type='${data.source1mime}'` : '';
        // return `<audio controls><source src='${data.source1}'${type}/></audio>`;
        // <span contenteditable="false" data-mce-object="audio" class="mce-preview-object mce-object-audio" data-mce-selected="1">
        resolve({ html: `<audio controls><source src='${data.url}'/></audio>` })
      },
      plugins: 'autolink link image lists paste code charmap media',
      toolbar: 'bold italic removeformat | bullist numlist  blockquote | code charmap subscript superscript | image media',
      inline: true,
      paste_data_images: true,
      browser_spellcheck: true,
    };
  }

  render() {
    return (
      <div>
        <label htmlFor={`${this.id}-tinymce`} />
        <div id={this.id} />
        <TinyMCE
          id={`${this.id}-tinymce`}
          content={this.props.text}
          config={this.tinyMCEConfig()}
          onBlur={e => this.props.onBlur(e.target.getContent(), e.target.isDirty())}
          onFocus={this.props.onFocus}
        />
        <input
          className="author--c-image-uploader author--c-file"
          type="file"
          ref={ref => (this.filePicker = ref)}
        />
      </div>
    );
  }
}
