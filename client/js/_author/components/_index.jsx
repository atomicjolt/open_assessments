import React            from 'react';
import Heading          from './common/heading';
import { colors }       from '../defines';

export default class Index extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  getStyles() {
    return {
      backgroundColor : colors.background,
      minHeight       : '100vh',
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles}>
        <Heading />
        {this.props.children}
      </div>
    );
  }
}
