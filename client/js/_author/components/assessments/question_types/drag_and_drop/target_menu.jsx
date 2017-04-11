import React      from 'react';
import AddZone    from './add_zone_dropdown';
import MediaModal from '../../../common/upload_modal/editor_upload_modal';
import localize           from '../../../../locales/localize';

export class TargetMenu extends React.Component {
  static propTypes = {
    uploadMedia: React.PropTypes.func.isRequired,
    newZone: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    images: React.PropTypes.shape({}).isRequired,
    loadingMedia: React.PropTypes.bool,
    hasTarget: React.PropTypes.bool,
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
  }

  selectImage(media, metadata, newMedia) {
    const type = this.state.add;
    if (type === 'snap' || type === 'drop') {
      const img = new Image();
      img.src = URL.createObjectURL(media);
      img.onload = () => {
        // TODO: make sure image isn't bigger than the area
        this.props.newZone({
          type,
          height: img.height,
          width: img.width,
        });
      };
      this.props.uploadMedia(media, 'dropObjects.new', metadata, newMedia);
    } else {
      this.replaceImage(media, metadata, newMedia);
    }
    this.setState({
      showModal: false,
      add: null
    });
  }

  addByRegion() {
    this.props.newZone({
      type: this.state.add,
    });
    this.setState({ add: null });
  }

  addByImage() {
    this.setState({ showModal: true });
  }

  render() {
    const strings = this.props.localizeStrings('targetMenu');

    return (
      <div className="au-o-item__top">
        <div className="au-o-left">
          <div className="au-c-question__type">{strings.targetImage}</div>
        </div>
        <div className="au-o-right">
          <button
            className="au-c-btn au-c-btn--sm au-c-btn--gray"
            onClick={() => this.setState({ showModal: true })}
          >
            {this.props.hasTarget ? strings.replace : strings.addImage}
          </button>
          <AddZone
            active={this.state.add === 'snap'}
            text={strings.addSnap}
            toggle={() => this.setState({ add: this.state.add !== 'snap' ? 'snap' : null })}
            addByRegion={() => this.addByRegion()}
            addByImage={() => this.addByImage()}
          />
          <AddZone
            active={this.state.add === 'drop'}
            text={strings.addDrop}
            toggle={() => this.setState({ add: this.state.add !== 'drop' ? 'drop' : null })}
            addByRegion={() => this.addByRegion()}
            addByImage={() => this.addByImage()}
          />
        </div>
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
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

export default localize(TargetMenu);
