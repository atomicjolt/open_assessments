import React    from 'react';

export default class BreadCrumb extends React.Component {
  static propTypes = {
    name        : React.PropTypes.string.isRequired,
    id          : React.PropTypes.string.isRequired,
    current     : React.PropTypes.bool.isRequired,
    updatePath  : React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state = { hovered: false };
  }

  getStyles() {
    return {
      fontWeight      : this.props.current ? 'bold' : '',
      textDecoration  : this.state.hovered ? 'underline' : '',
      cursor          : 'pointer',
    };
  }

  render() {
    const { name, id } = this.props;
    const styles = this.getStyles();

    return (
      <span
        tabIndex="0"
        onClick={() => this.props.updatePath(id, name)}
        onMouseEnter={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        style={styles}
      > {name} /
      </span>
    );
  }
}
