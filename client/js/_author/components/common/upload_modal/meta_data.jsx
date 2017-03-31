import React      from 'react';
import _          from 'lodash';

export default class Metadata extends React.Component {
  static propTypes = {
    id: React.PropTypes.string.isRequired,
    updateMetadata: React.PropTypes.func.isRequired,
  };

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



  render() {
    const metadataTypes = ['altText', 'license', 'copyright'];

    return (
      <div>
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`upload_desc_${this.props.id}`}>Description</label>
          <div className="au-c-input__contain">
            <textarea
              ref={(area) => { this.textArea = area; }}
              className="au-c-textarea au-c-text-input--smaller"
              id={`upload_desc_${this.props.id}`}
              type="text"
              tabIndex="0"
              onBlur={e => this.props.updateMetadata('description', e.target.value)}
              onChange={() => this.areaResize()}
              rows="1"
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        {
          _.map(metadataTypes, type => (
            <div className="au-c-input au-c-input-label--left">
              <label htmlFor={`upload_${type}_${this.props.id}`}>{_.capitalize(type)}</label>
              <div className="au-c-input__contain">
                <input
                  className="au-c-text-input au-c-text-input--smaller"
                  id={`upload_${type}_${this.props.id}`}
                  type="text"
                  tabIndex="0"
                  onBlur={e => this.updateMetadata(type, e.target.value)}
                />
                <div className="au-c-input__bottom" />
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}
