import React    from 'react';
import Menu     from './target_menu';
import Zone     from './target_zone';

export default function targetArea(props) {
  return (
    <div className="au-c-drag-and-drop__target-area">
      <Menu />
      <Zone />
    </div>
  );
}

targetArea.propTypes = {};
