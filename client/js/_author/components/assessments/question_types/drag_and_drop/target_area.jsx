import React    from 'react';
import _        from 'lodash';
import Menu     from './target_menu';
import Zone     from './target_zone';

export default function targetArea(props) {

  return (
    <div className="au-c-drag-and-drop__target-area">
      <Menu
        loadingMedia={props.loadingMedia}
        images={props.images}
        uploadMedia={props.uploadMedia}
        newZone={attributes => props.editZone('new', attributes)}
        hasTarget={!_.isEmpty(props.question.target)}
      />
      <Zone
        target={props.question.target}
        zones={props.question.zones}
        editZone={props.editZone}
      />
    </div>
  );
}

targetArea.propTypes = {
  loadingMedia: React.PropTypes.bool,
  images: React.PropTypes.shape({}).isRequired,
  question: React.PropTypes.shape({
    target: React.PropTypes.shape({}),
    zones: React.PropTypes.shape({}),
  }).isRequired,
  uploadMedia: React.PropTypes.func.isRequired,
  editZone: React.PropTypes.func.isRequired,
};
