import React      from 'react';
import _          from 'lodash';
import Checkbox   from '../../assessments/question_types/question_common/option_checkbox';

export default class Metadata extends React.Component {
  static propTypes = {
    mediaType: React.PropTypes.string,
    selectedLanguage: React.PropTypes.string,
    updateMetadata: React.PropTypes.func.isRequired,
    metadataTypes: React.PropTypes.arrayOf(React.PropTypes.string),
    metadataFileTypes: React.PropTypes.arrayOf(React.PropTypes.string),
    metaData: React.PropTypes.shape({
      description: React.PropTypes.string,
    }),
  };
  static labelName(type) {
    // TODO: modify this for regional language stuff
    switch (type) {
      case 'altText':
        return 'Alt Text';
      case 'license':
        return 'License';
      case 'copyright':
        return 'Copyright';
      case 'vttFile':
        return 'vtt File';
      case 'transcript':
        return 'Transcript';
      default:
        return '';
    }
  }

  constructor() {
    super();
    this.textArea = null;
    this.state = {
      baseScrollHeight: null,
    };
  }

  areaResize() {
    const minRows = 1;
    this.textArea.rows = minRows;
    const scrollHeight = this.textArea.scrollHeight;
    if (!this.state.baseScrollHeight) { this.setState({ baseScrollHeight: scrollHeight }); }
    const rows = Math.ceil((scrollHeight - (this.state.baseScrollHeight || scrollHeight)) / 17);
    this.textArea.rows = rows + minRows;
  }

  autoPlayOption(metaData) {
    return (<Checkbox
      id={'uniqueId'}
      itemId={'uniqueItemId'}
      isCorrect={metaData.autoPlay}
      updateChoice={e => this.props.updateMetadata('autoPlay', e.isCorrect)}
    />);
  }

  metaDataInputs() {
    return _.map(this.props.metadataTypes, (type) => {
      return this.props.selectedLanguage === '639-2%3AENG%40ISO' ?
        <div className="au-c-input au-c-input-label--left" key={`metadata_input_${type}`}>
          <label htmlFor={`meta_upload_${type}`}>{this.labelName(type)}</label>
          <div className="au-c-input__contain">
            <input
              value={this.props.metaData[type] || ''}
              className="au-c-text-input au-c-text-input--smaller"
              id={`meta_upload_${type}`}
              type="text"
              tabIndex="0"
              onChange={e => this.props.updateMetadata(type, e.target.value)}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
    : null;
    });
  }

  metaDataFileInputs() {
    return _.map(this.props.metadataFileTypes, type => (
      <div className="au-c-input au-c-input-label--left" key={`metadata_input_${type}`}>
        <label htmlFor={`meta_upload_${type}`}>{this.labelName(type)}</label>
        <div className="au-c-input__contain">
          <input
            className=""
            id={`meta_upload_${type}`}
            type="file"
            tabIndex="0"
            onChange={e => this.props.updateMetadata(type, e.target.files[0])}
          />
          <div className="au-c-input__bottom" />
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor="meta_upload_desc">Description</label>
          <div className="au-c-input__contain">
            <textarea
              value={this.props.metaData.description || ''}
              ref={(area) => { this.textArea = area; }}
              className="au-c-textarea au-c-text-input--smaller"
              id="meta_upload_desc"
              type="text"
              tabIndex="0"
              onChange={
                (e) => {
                  this.areaResize();
                  this.props.updateMetadata('description', e.target.value);
                }
              }
              rows="1"
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        { this.metaDataInputs() }
        { this.props.mediaType !== 'img' && this.props.selectedLanguage === '639-2%3AENG%40ISO' ?
          <div>
            Auto-play { this.autoPlayOption(this.props.metaData) }
          </div>
          : null
        }
        { this.metaDataFileInputs() }
      </div>
    );
  }
}
