import React    from 'react';
import Menu     from './target_menu';
import Zone     from './target_zone';

export default function targetArea(props) {

  return (
    <div className="au-c-drag-and-drop__target-area">
      <Menu
        loadingMedia={props.loadingMedia}
        images={props.images}
      />
      <Zone
        target={props.question.target}
        zones={props.question.zones}
      />
    </div>
  );
}

targetArea.propTypes = {};
