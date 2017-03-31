import React      from 'react';

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
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`upload_alt_text_${this.props.id}`}>Alt-Text</label>
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id={`upload_alt_text_${this.props.id}`}
              type="text"
              tabIndex="0"
              onBlur={e => this.setState({ altText: e.target.value })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`upload_license_${this.props.id}`}>License</label>
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id={`upload_license_${this.props.id}`}
              type="text"
              tabIndex="0"
              onBlur={e => this.setState({ license: e.target.value })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
        <div className="au-c-input au-c-input-label--left">
          <label htmlFor={`upload_copyright_${this.props.id}`}>Copyright</label>
          <div className="au-c-input__contain">
            <input
              className="au-c-text-input au-c-text-input--smaller"
              id={`upload_copyright_${this.props.id}`}
              type="text"
              tabIndex="0"
              onBlur={e => this.setState({ copyright: e.target.value })}
            />
            <div className="au-c-input__bottom" />
          </div>
        </div>
      </div>
    );
  }
}
