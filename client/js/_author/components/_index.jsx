import React            from 'react';

export default class Index extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
