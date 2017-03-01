import React       from 'react';
import TinyWrapper from './tiny_wrapper';

export default class OeaEditor extends React.Component {
  static propTypes = {
    onBlur: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      focused: false
    };
  }

  onBlur(editorText) {
    // TODO: This is where we will handle replacing the image source with the
    // "AssetContent:{asset_id}". We need to do it here instead of in the
    // tinymce callback because we want to be able to preview the uploads.

    this.setState({ focused: false });
    this.props.onBlur(editorText);
  }

  render() {
    // active is handled here instead of in TinyWrapper, because tinyMCE does
    // not handle rerendering very well. This may become unnecessary when
    // Brandon finishes the styles.

    const active = this.state.focused ? 'is-focused' : '';

    return (
      <div className="c-input__contain">
        <div className={`c-text-input c-text-input--medium c-wysiwyg ${active}`}>
          <TinyWrapper
            {...this.props}
            onBlur={editorText => this.onBlur(editorText)}
            onFocus={() => this.setState({ focused: true })}
          />
        </div>
        <div className={`c-input__bottom ${active}`} />
      </div>
    );
  }
}
