import React from 'react';

export default class CheckBox extends React.Component {

  static propTypes = {
    item: React.PropTypes.object.isRequired,
    id: React.PropTypes.string.isRequired,
    isHtml: React.PropTypes.bool,
    selectAnswer: React.PropTypes.func.isRequired,
    isDisabled: React.PropTypes.bool,
    checked: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    focused: React.PropTypes.bool,
    onFocus: React.PropTypes.func.isRequired
  }

  selectAnswer() {
    if (!this.props.isDisabled) {
      this.props.selectAnswer(this.props.item.id);
    }
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
    const {
      id, name, isDisabled, isHtml, checked, focused, onFocus
    } = this.props;

    return (
      <div className="o-grid">
        <label
          htmlFor={id}
          key={id}
          className={isDisabled // eslint-disable-line no-nested-ternary
          ? 'c-answer-container--disabled'
          : (focused && !isDisabled // eslint-disable-line no-nested-ternary
          ? 'c-answer-container is-focused' : (((checked && !isDisabled)
          ? 'c-answer-container is-checked'
          : 'c-answer-container')))
          }
          onKeyDown={(e) => { if (e.keyCode === 32) { this.selectAnswer(); } }}
        >
          <div className="c-answer-container__radio">
            <div
              className={focused && !isDisabled
              ? 'c-checkbox is-disabled'
              : 'c-checkbox'}
            >
              <input
                type="checkbox"
                className={focused && !isDisabled ? 'input-focused' : ''}
                disabled={isDisabled}
                name={name}
                id={id}
                checked={checked}
                onChange={() => this.selectAnswer()}
                onKeyDown={(e) => { if (e.keyCode === 32) { this.selectAnswer(); } }}
                onFocus={() => onFocus(true)}
                onBlur={() => onFocus(false)}
              />
              <div
                className={isDisabled
                ? 'c-checkbox__border--disabled'
                : 'c-checkbox__border'}
              >
                <span />
              </div>
            </div>
          </div>
          <div className="c-answer-container__content">
            {this.renderMaterial(this.props.item.material, isHtml)}
          </div>
        </label>
      </div>
    );
  }
}
