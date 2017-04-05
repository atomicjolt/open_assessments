import React            from 'react';
import _                from 'lodash';

import appHistory       from '../../history';
import ListItem         from './list_item';
import PublishButton    from './buttons/publish_button';
import EmbedButton      from './buttons/embed_button';
import EditButton       from './buttons/edit_button';
import DeleteButton     from './buttons/delete_button';
import PreviewButton    from './buttons/preview_button';

export default function BankAssessment(props) {
  const { assessment, togglePublishAssessment } = props;
  const displayName = _.get(assessment, 'displayName.text');

  const selectItem = () => {
    if (assessment.isPublished) {
      appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}/preview`);
      return;
    }
    appHistory.push(`banks/${assessment.bankId}/assessments/${assessment.id}`);
  };

  return (
    <ListItem {...props} bank={props.assessment} selectItem={selectItem} onFocus={props.onFocus}>
      <td>
        <i className="material-icons">description</i>
      </td>
      <td>{displayName}</td>
      <td>
        <PublishButton
          assessment={assessment}
          togglePublishAssessment={togglePublishAssessment}
          onFocus={props.onFocus}
        />
      </td>
      <td>
        <div className="au-c-table__icons">
          <EmbedButton {...props} />
          <EditButton {...props} />
          <PreviewButton {...props} />
          <DeleteButton {...props} />
        </div>
      </td>
    </ListItem>
  );
}

BankAssessment.propTypes = {
  assessment: React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
    bankId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  }).isRequired,
  togglePublishAssessment: React.PropTypes.func.isRequired,
  onFocus: React.PropTypes.func.isRequired,
};
