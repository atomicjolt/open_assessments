import React      from 'react';
import _          from 'lodash';
import DropObject from './drop_object';
import MediaModal from '../../../common/upload_modal/editor_upload_modal';
import localize           from '../../../../locales/localize';


class DragArea extends React.Component {
  static propTypes = {
    dropObjects: React.PropTypes.shape({}).isRequired,
    zones: React.PropTypes.shape({}).isRequired,
    images: React.PropTypes.shape({}).isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    updateDropObject: React.PropTypes.func.isRequired,
    localizeStrings: React.PropTypes.func.isRequired,
    loadingMedia: React.PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      activeObject: null,
      showModal: false,
    };
  }

  insertMedia(img, metadata, isNew) {
    this.props.uploadMedia(img, 'dropObjects.new', metadata, isNew);
    this.setState({ showModal: false });
  }

  render() {
    const strings = this.props.localizeStrings('dragArea');

    return (
      <div className="au-c-drop-zone__answers au-o-row">
        {
          _.map(this.props.dropObjects, object => (
            <DropObject
              key={`drop_object_${object.id}`}
              object={object}
              zones={this.props.zones}
              setActive={() => this.setState({ activeObject: object.id })}
              isActive={this.state.activeObject === object.id}
              updateObject={newAttributes => this.props.updateDropObject(object.id, newAttributes)}
            />
          ))
        }

        <div className="au-o-quarter">
          <div className="au-c-drop-zone-answer-add">

            <button
              className="au-c-drop-zone-answer-add__button"
              onClick={() => this.setState({ showModal: true })}
            >
              {strings.addImage}
            </button>

          </div>
        </div>
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          loading={this.props.loadingMedia}
          media={this.props.images}
          mediaType={'img'}
          insertMedia={(img, metadata, isNew) => this.insertMedia(img, metadata, isNew)}
        />
      </div>
    );
  }
}

export default localize(DragArea);
