import React      from 'react';
import AddZone    from './add_zone_dropdown';
import MediaModal from '../../../common/upload_modal/editor_upload_modal';

export default class TargetMenu extends React.Component {
  static propTypes = {
    uploadMedia: React.PropTypes.func.isRequired,
    newZone: React.PropTypes.func.isRequired,
    images: React.PropTypes.shape({}).isRequired,
    loadingMedia: React.PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      add: null,
      showModal: false,
    };
  }

  replaceImage(media, metadata, newMedia) {
    this.props.uploadMedia(media, 'target', metadata, newMedia);
    this.setState({ showModal: false });
  }

  selectImage(media, metadata, newMedia) {
    this.setState({ showModal: false });
    if (this.state.add === 'snap' || this.state.add === 'drop') {
      const img = new Image();
      img.src = URL.createObjectURL(media);
      img.onload = () => {
        // TODO: make sure image isn't bigger than the area
        this.props.newZone({
          type: this.state.add,
          height: img.height,
          width: img.width,
        });
      };
    } else {
      this.replaceImage(media, metadata, newMedia);
    }
  }

  addByRegion() {
    this.props.newZone({
      type: this.state.add,
    });
  }

  addByImage() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div className="au-o-item__top">
        <div className="au-o-left">
          <div className="au-c-question__type">Target Image</div>
        </div>
        <div className="au-o-right">
          <button
            className="au-c-btn au-c-btn--sm au-c-btn--gray"
            onClick={() => this.setState({ showModal: true })}
          >
            Replace Image
          </button>
          <AddZone
            active={this.state.add === 'snap'}
            text="Add Snap Zone"
            toggle={() => this.setState({ add: this.state.add !== 'snap' ? 'snap' : null })}
            addByRegion={() => this.addByRegion()}
            addByImage={() => this.addByImage()}
          />
          <AddZone
            active={this.state.add === 'drop'}
            text="Add Drop Zone"
            toggle={() => this.setState({ add: this.state.add !== 'drop' ? 'drop' : null })}
            addByRegion={() => this.addByRegion()}
            addByImage={() => this.addByImage()}
          />
        </div>
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          id={null}
          loading={this.props.loadingMedia}
          media={this.props.images}
          mediaType={'img'}
          insertMedia={(media, metadata, newMedia) => this.selectImage(media, metadata, newMedia)}
          uploadOnly={!!this.state.add}
        />
      </div>
    );
  }
}
