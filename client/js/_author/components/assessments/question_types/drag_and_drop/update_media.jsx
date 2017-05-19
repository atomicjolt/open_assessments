import React             from 'react';
import { connect }       from 'react-redux';

import * as AssetActions from '../../../../../actions/qbank/assets';
import localize          from '../../../../locales/localize';
import MediaModal        from '../../../common/upload_modal/editor_upload_modal';

function select(state) {
  return {
    loadingMedia: state.media.loading,
    images: state.media.image,
  };
}

export class UpdateMedia extends React.Component {
  static propTypes = {
    images: React.PropTypes.shape({}),
    loadingMedia: React.PropTypes.bool,
    updateMedia: React.PropTypes.func,
    dropObject: React.PropTypes.shape({
      id: React.PropTypes.string
    }),
    language: React.PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  uploadMedia(file, metadata, newMedia) {
    this.setState({ showModal: false });
    this.props.updateMedia(
      file,
      `dropObjects[${this.props.dropObject.id}]`,
      metadata,
      newMedia,
    );
  }

  render() {
    return (
      <div>
        <button
          onClick={() => this.setState({ showModal: true })}
          className="au-c-drop-zone-answer-add__button"
        >
          Add Image
        </button>
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          loading={this.props.loadingMedia}
          media={this.props.images}
          mediaType={'img'}
          insertMedia={
          (media, metaData, newMedia, language) =>
            this.uploadMedia(media, metaData, newMedia, language)}
          language={this.props.language}
        />
      </div>
    );
  }
}

export default connect(select, AssetActions)(localize(UpdateMedia));
