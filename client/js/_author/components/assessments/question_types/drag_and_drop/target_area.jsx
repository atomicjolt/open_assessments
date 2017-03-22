import React    from 'react';
import Menu     from './target_menu';
import Zone     from './target_zone';

export default function targetArea(props) {

  return (
    <div className="au-c-drag-and-drop__target-area">
      <Menu />
      <Zone
        target={props.question.target}
        zones={props.question.zones}
      />
    </div>
  );
}

targetArea.propTypes = {};
