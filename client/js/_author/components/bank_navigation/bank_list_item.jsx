import React                    from 'react';
import Icon                     from './bank_icon';
import { colors, buttonStyle }  from '../../defines';

// TODO: think about breaking this into smaller components
export default class BankListItem extends React.Component {
  static propTypes = {
    bank: React.PropTypes.shape({
      displayName : React.PropTypes.shape({}),
      type        : React.PropTypes.string.isRequired,
    }).isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { hovered: false };
  }

  getStyles() {
    const { hovered } = this.state;
    const isAssessment = this.props.bank.type === 'Assessment';

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
        display         : isAssessment ? 'inline-block' : 'none',
        color           : hovered ? colors.white : colors.grey,
        backgroundColor : hovered ? colors.lightAccentPurple : colors.white,
      },
      buttonContainer: {
        float   : 'right',
        display : hovered && isAssessment ? 'inline-block' : 'none',
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

  selectItem() {
    const { bank } = this.props;
    if (bank.type === 'Assessment') {
      // console.log(`take me to assessment ${bank.id}`);
    } else {
      this.props.getBankChildren(bank);
    }
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
          role="button"
          onClick={() => this.selectItem()}
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
