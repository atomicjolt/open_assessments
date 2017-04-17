import React   from 'react';
import TinyMCE from 'atomic-react-tinymce';

import 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/autolink/plugin';
import 'tinymce/plugins/paste/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/code/plugin';
import 'tinymce/plugins/media/plugin';
import 'tinymce/plugins/image/plugin';
import 'tinymce/plugins/charmap/plugin';
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/table/plugin';

import guid             from '../../../utils/guid';

// TODO: figure out how to localize this.
export default class TinyWrapper extends React.Component {
  static propTypes = {
    text: React.PropTypes.string,
    editorKey: React.PropTypes.string,
    onBlur: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func.isRequired,
    openModal: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.id = guid();
  }

  shouldComponentUpdate(nextProps) {
    // TinyMCE doesn't handle rerendering very well, and everything dealing
    // with the content inside of it is completely managed by tinyMCE, so we
    // only render when the editorKey changes. All state that needs to be
    // updated is done so in componentWillReceiveProps or in callbacks from tinyMCE.
    return nextProps.editorKey !== this.props.editorKey;
  }

  tinyMCEConfig() {
    // Whenever you add a plugin, make sure that it is imported above.
    return {
      closed: /^(br|hr|input|meta|img|link|param|area|source|track)$/,
      fixed_toolbar_container: `#toolbar-${this.props.editorKey || ''}${this.id}`,
      skin: false,
      menubar: false,
      statusbar: false,
      plugins: 'autolink link lists paste code charmap media image table',
      toolbar: 'bold italic removeformat | bullist numlist  blockquote table | code charmap subscript superscript | insert_image audio video',
      inline: true,
      paste_data_images: true,
      browser_spellcheck: true,
      setup: (editor) => {
        editor.addButton('insert_image', {
          text: '',
          icon: 'image',
          tooltip: 'Insert Image',
          onclick: () => {
            this.props.openModal(editor, 'img');
          },
        });
        editor.addButton('audio', {
          text: '',
          icon: 'audio',
          tooltip: 'Insert Audio',
          onclick: () => {
            this.props.openModal(editor, 'audio');
          },
        });
        editor.addButton('video', {
          text: '',
          icon: 'video',
          tooltip: 'Insert Video',
          onclick: () => {
            this.props.openModal(editor, 'video');
          }
        });
      },
    };
  }

  render() {
    return (
      <div>
        <label htmlFor={`${this.id}-tinymce`} />
        <div id={`toolbar-${this.props.editorKey || ''}${this.id}`} />
        <TinyMCE
          id={`${this.id}-tinymce`}
          content={this.props.text}
          config={this.tinyMCEConfig()}
          onBlur={(e) => {
            const content = e.target.getContent();
            const isChanged =
              e.target.isDirty() || content !== this.props.text;
            this.props.onBlur(content, isChanged);
          }}
          onFocus={this.props.onFocus}
          onChange={e => this.props.onChange(e.target.getContent())}
        />
      </div>
    );
  }
}
