import React            from 'react';
import _                from 'lodash';
import MultipleChoice   from './multiple_choice';
import AudioUpload      from './audio_upload';
import genusTypes       from '../../../../constants/genus_types.js';
import InactiveHeader   from './question_common/question_inactive_header';
import Settings         from './question_common/question_settings';
import QuestionText     from './question_common/question_text';

export default class Question extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      genusTypeId: React.PropTypes.string,
    }).isRequired,
    updateItem: React.PropTypes.func.isRequired,
  };

  updateItem(newItemProperties) {
    const { item } = this.props;
    const { displayName, description, id } = item;

    const newItem = _.merge(
      {},
      {
        id,
        name: displayName.text,
        description: description.text
      },
      newItemProperties
    );

    this.props.updateItem(newItem);
  }

  content() {
    switch (this.props.item.genusTypeId) {
      case genusTypes.item.multipleChoice:
        return <MultipleChoice {...this.props} />;
      case genusTypes.item.audioUpload:
        return <AudioUpload
          updateItem={newProps => this.updateItem(newProps)}
          item={this.props.item}/>;
        case genusTypes.item.fileUpload:
      default:
        return null;
    }
  }

  render() {
    const { item } = this.props;
    const { displayName, genusTypeId, id, description } = item;
    return (
      <div className="o-item c-question is-active" tabIndex="0">
        <InactiveHeader
          name={displayName.text}
          type={genusTypeId}
        />
        <Settings
          id={id}
          updateItem={newProps => this.updateItem(newProps)}
          defaultName={displayName.text}
          language={displayName.languageTypeId}
          maintainOrder={false}
          multipleAnswer={false}
          reflection={false}
        />
        <div className="c-question__content">
          <QuestionText
            id={id}
            text={description.text}
            updateItem={newProps => this.updateItem(newProps)}
          />
          {this.content()}
        </div>
      </div>
    );
  }
}
