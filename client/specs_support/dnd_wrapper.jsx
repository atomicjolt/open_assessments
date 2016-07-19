import React                from 'react';
import TestBackend          from 'react-dnd-test-backend';
import { DragDropContext }  from 'react-dnd';

export default function wrapInDndContext(DecoratedComponent) {
  @DragDropContext(TestBackend)
  class TestContextContainer extends React.Component {
    render() {
      return <DecoratedComponent {...this.props} />;
    }
  }

  return TestContextContainer;
}
