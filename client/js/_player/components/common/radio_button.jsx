import React                             from 'react';

export default class RadioButton extends React.Component {

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
      return (
        <div
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
      id, item, name, isDisabled, isHtml, checked, focused, onFocus
    } = this.props;

    return (
      <div className="o-grid">
        <label
          htmlFor={id}
          key={id}
          className={isDisabled // eslint-disable-line no-nested-ternary
          ? 'c-answer-container--disabled'
          : ((focused && !isDisabled) || (checked && !isDisabled)
          ? 'c-answer-container is-focused'
          : 'c-answer-container')
          }
          onClick={() => this.selectAnswer()}
        >
          <div className="c-answer-container__radio">
            <div className="c-radio-button">
              <div className="c-radio-button__border">
                <i
                  className={(focused && !isDisabled) || (checked && !isDisabled)
                  ? 'material-icons c-material-icon-resize radio_button--focused'
                  : 'material-icons c-material-icon-resize'}
                  aria-hidden
                >
                  {checked
                  ? 'radio_button_checked'
                  : 'radio_button_unchecked'}
                </i>
                <input
                  type="radio"
                  disabled={isDisabled}
                  name={name}
                  id={id}
                  checked={checked}
                  onChange={() => this.selectAnswer()}
                  onFocus={() => onFocus(true)}
                  onBlur={() => onFocus(false)}
                />
                <span />
              </div>
            </div>
          </div>
          <div className="c-answer-container__content">
            {this.renderMaterial(item.material, isHtml)}
          </div>
        </label>
      </div>
    );
  }
}
