import React           from 'react';
import _               from 'lodash';
import AssessmentItems from './assessment_items';
import NewItem         from './new_item_form';
import AddQuestion     from './add_question_button';

export default class AssessmentForm extends React.Component {
  static propTypes = {
    items: React.PropTypes.oneOfType(
      [React.PropTypes.shape({}), React.PropTypes.arrayOf(React.PropTypes.shape({}))]
    ),
    name: React.PropTypes.string,
    updateAssessment: React.PropTypes.func.isRequired,
    updateItemOrder: React.PropTypes.func.isRequired,
    publishedAndOffered: React.PropTypes.bool.isRequired,
    createItem: React.PropTypes.func,
    updateItem: React.PropTypes.func.isRequired,
    updateSingleItemOrPage: React.PropTypes.func.isRequired,
    updateChoice: React.PropTypes.func.isRequired,
    updateAnswer: React.PropTypes.func.isRequired,
    deleteAssessmentItem: React.PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      addingAssessment: false,
      activeItem: '',
      reorderActive: false,
    };
  }

  createItem(newItem) {
    this.props.createItem(newItem);
    this.setState({ addingAssessment: false });
  }

  showNewModal() {
    return this.state.addingAssessment || _.isEmpty(this.props.items);
  }

  activateItem(itemId) {
    if (itemId !== this.state.activeItem && !this.state.reorderActive) {
      this.setState({ activeItem: itemId, reorderActive: false });
    }
  }

  toggleReorder() {
    this.setState({ reorderActive: true });
  }

  moveItem(oldIndex, newIndex) {
    const itemIds = _.map(this.props.items, 'id');
    const temp = itemIds[newIndex];
    itemIds[newIndex] = itemIds[oldIndex];
    itemIds[oldIndex] = temp;
    this.props.updateItemOrder(itemIds);
  }

  showSinglePageOption() {
    if (this.props.publishedAndOffered) {
      return (
        <div className="o-item__top">
          <div className="c-checkbox u-right">
            <input type="checkbox" id="check01" name="check" onChange={e => this.props.updateSingleItemOrPage(e.target.checked)} />
            <label htmlFor="check01">Single page assessment</label>
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const reorderActive = this.state.reorderActive;
    const name = _.get(this, 'props.displayName.text', '');
    return (
      <div className="o-contain">
        <div className="o-item">
          {this.showSinglePageOption()}
          <div className="c-assessment-title">
            <label htmlFor="title_field" className="c-input">
              <div className="c-input__contain">
                <input
                  key={name}
                  defaultValue={name}
                  className="c-text-input c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder="Untitled Assessment"
                  onChange={e => this.setState({ title: e.target.value })}
                  onBlur={e => this.props.updateAssessment({ name: e.target.value })}
                />
                <div className="c-input__bottom" />
              </div>
            </label>
          </div>
        </div>
        <AssessmentItems
          items={this.props.items}
          activeItem={this.state.activeItem}
          reorderActive={reorderActive}
          activateItem={itemId => this.activateItem(itemId)}
          toggleReorder={() => this.setState({ reorderActive: !reorderActive })}
          updateItem={this.props.updateItem}
          updateChoice={this.props.updateChoice}
          updateAnswer={this.props.updateAnswer}
          deleteAssessmentItem={this.props.deleteAssessmentItem}
          moveItem={(oldIndex, newIndex) => this.moveItem(oldIndex, newIndex)}
        />

        {this.showNewModal() ? <NewItem
          cancel={() => this.setState({ addingAssessment: false })}
          create={newItem => this.createItem(newItem)}
        /> : <AddQuestion newItem={() => this.setState({ addingAssessment: true })} />}
      </div>
    );
  }
}
