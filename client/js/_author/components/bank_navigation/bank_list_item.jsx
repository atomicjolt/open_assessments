import React                    from 'react';
import Icon                     from './bank_icon';
import { colors, buttonStyle }  from '../../defines';

export default class BankListItem extends React.Component {
  static propTypes = {
    bank: React.PropTypes.shape({
      displayName: React.PropTypes.shape({
        text: React.PropTypes.string,
      }),
      type  : React.PropTypes.string.isRequired,
      id    : React.PropTypes.string.isRequired,
    }).isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { hovered: false };
  }

  getStyles() {
    const { hovered } = this.state;

    return {
      item: {
        borderBottom    : `1px solid ${colors.accentGrey}`,
        lineHeight      : '50px',
        backgroundColor : hovered ? colors.accentPurple : '',
        color           : hovered ? colors.white : '',
      },
      halves: {
        display       : 'inline-block',
        verticalAlign : 'top',
        whiteSpace    : 'nowrap',
      },
      name: {
        width         : '65%',
        overflow      : 'hidden',
        textOverflow  : 'ellipsis',
        cursor        : 'pointer',
      },
      options: {
        width: '35%',
      },
      publish: {
        color           : hovered ? colors.white : colors.grey,
        backgroundColor : hovered ? colors.lightAccentPurple : colors.white,
      },
      buttonContainer: {
        float   : 'right',
        display : hovered ? 'inline-block' : 'none',
      },
      button: {
        backgroundColor : colors.lightAccentPurple,
        verticalAlign   : 'middle',
        margin          : '5px',
      },
      embed: {
        padding: '9px 15px',
      },
    };
  }

  render() {
    const styles = this.getStyles();
    const { bank } = this.props;

    return (
      <div
        style={styles.item}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
      >
        <div
          style={{ ...styles.halves, ...styles.name }}
          tabIndex="0"
          onClick={() => this.props.getBankChildren(bank)}
        >
          <Icon type={bank.type} />
          {bank.displayName ? bank.displayName.text : null}
        </div>

        <div style={{ ...styles.halves, ...styles.options }}>
          <button style={{ ...buttonStyle, ...styles.publish }}>
            <Icon type="Publish" />
          </button>
          <div style={{ ...styles.halves, ...styles.buttonContainer }}>
            <button style={{ ...buttonStyle, ...styles.button, ...styles.embed }}>
              EMBED CODE
            </button>
            <button style={{ ...buttonStyle, ...styles.button }}>
              <i className="material-icons">mode_edit</i>
            </button>
            <button style={{ ...buttonStyle, ...styles.button }}>
              <i className="material-icons">remove_red_eye</i>
            </button>
            <button style={{ ...buttonStyle, ...styles.button }}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
