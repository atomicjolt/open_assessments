import React from 'react';

export default class CheckBox extends React.Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired,
    isHtml: React.PropTypes.bool,
    selectAnswer: React.PropTypes.func.isRequired,
    isDisabled: React.PropTypes.bool,
    checked: React.PropTypes.bool
  }

  selectAnswer() {
    this.props.selectAnswer(this.props.item.id);
  }

  renderMaterial(material, isHtml) {
    if (isHtml) {
      return (<div
        className="c-answer-container__content"
        dangerouslySetInnerHTML={{ __html: material }}
      />);
    }
    return (
      <div className="c-answer-container__content">
        <p>{material}</p>
      </div>
    );
  }

  render() {
    let containerStyle = '';

    if (this.props.checked === true) { containerStyle = 'is-clicked'; }

    return (
      <li className={`c-answer-container ${containerStyle}`}>
        <label htmlFor={this.props.id}>
          <div className="c-answer-container__radio">
            <div className="c-checkbox">
              <input
                type="checkbox"
                checked={this.props.checked}
                disabled={this.props.isDisabled}
                name="answer-checkbox"
                onChange={() => { this.selectAnswer(); }}
                id={this.props.id}
              />
              <div className="c-checkbox__border">
                <span />
              </div>
            </div>
          </div>
          <div className="c-answer-container__content">
            {this.renderMaterial(this.props.item.material, this.props.isHtml)}
          </div>
        </label>
      </li>
    );
  }
}
