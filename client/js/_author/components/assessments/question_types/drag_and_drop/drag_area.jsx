import React      from 'react';
import _          from 'lodash';
import assets     from '../../../../../libs/assets';
import MediaModal from '../../../common/upload_modal/editor_upload_modal';


export default class DragArea extends React.Component {
  static propTypes = {
    dropObjects: React.PropTypes.shape({}).isRequired,
    images: React.PropTypes.shape({}).isRequired,
    uploadMedia: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    loadingMedia: React.PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {
      activeObject: '',
      showModal: false,
    };
  }

  render() {
    const logo = assets('./_author/images/CLIx-logo.png');

    return (
      <div className="au-c-drop-zone__answers au-o-row">
        {
          _.map(this.props.dropObjects, object => (
            <div
              className="au-o-quarter"
              key={`drag_object_${object.id}`}
              onClick={() => this.setState({ activeObject: object.id })}
            >
              <div
                className={`au-c-drop-zone-answer ${this.state.activeObject === object.id ? 'is-active' : ''}`}
                tabIndex="0"
              >

                <div className="au-c-dropdown au-c-dropdown--small">
                  <label htmlFor={`drag_object_dropDown_${object.id}`} />
                  <select name="" id={`drag_object_dropDown_${object.id}`}>
                    <option value="">Drop A</option>
                    <option value="">Snap B</option>
                  </select>
                </div>

                <div className="au-c-input au-c-input-label--left">
                  <label htmlFor={`drag_object_label_${object.id}`}>Label</label>
                  <div className="au-c-input__contain">
                    <input
                      id={`drag_object_label_${object.id}`}
                      className="au-c-text-input au-c-text-input--smaller"
                      type="text"
                      defaultValue={object.label}
                      onBlur={e => this.props.updateChoice(object.id, { label: e.target.value })}
                    />
                    <div className="au-c-input__bottom" />
                  </div>
                </div>

                <div className="au-c-drop-zone-answer__image">
                  <img src={object.image || logo} alt="default" />
                </div>
              </div>
            </div>
          ))
        }

        <div className="au-o-quarter">
          <div className="au-c-drop-zone-answer-add">

            <button
              className="au-c-drop-zone-answer-add__button"
              onClick={() => this.setState({ showModal: true })}
            >
              Add Image
            </button>

          </div>
        </div>
        <MediaModal
          isOpen={this.state.showModal}
          closeModal={() => this.setState({ showModal: false })}
          id={null}
          loading={this.props.loadingMedia}
          media={this.props.images}
          mediaType={'img'}
          mediaName={'Farts'}
          insertMedia={(img, metadata, isNew) => this.props.uploadMedia(img, 'dropObjects.new', metadata, isNew)}
        />
      </div>
    );
  }
}
