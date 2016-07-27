import React          from 'react';

import MovableWords   from './movable_words/movable_words';

export default class SentenceSandbox extends React.Component {
  render() {
    return <div>
      <MovableWords { ...this.props } />
    </div>
  }
}
