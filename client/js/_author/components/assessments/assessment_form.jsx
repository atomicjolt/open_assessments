import React           from 'react';
import _               from 'lodash';
import NewItem         from './new_item_form';
import AddQuestion     from './add_question_button';
import Question        from './question_types/_question';
import localize        from '../../locales/localize';

// ideally we would get this directly from this.props.localizeStrings...
import stringFormatter from '../../locales/locales';

class AssessmentForm extends React.Component {
  static propTypes = {
    items: React.PropTypes.oneOfType(
      [React.PropTypes.shape({}), React.PropTypes.arrayOf(React.PropTypes.shape({}))]
    ),
    name: React.PropTypes.string,
    bankId: React.PropTypes.string.isRequired,
    updateAssessment: React.PropTypes.func.isRequired,
    updateItemOrder: React.PropTypes.func,
    publishedAndOffered: React.PropTypes.bool,
    createItem: React.PropTypes.func,
    updateSingleItemOrPage: React.PropTypes.func,
    updateNofM: React.PropTypes.func,
    deleteAssessmentItem: React.PropTypes.func,
    localizeStrings: React.PropTypes.func,
    assessmentOffered: React.PropTypes.arrayOf(
      React.PropTypes.shape({ nOfM: React.PropTypes.number }))
  };

  constructor() {
    super();
    this.state = {
      addingItem: false,
      activeItem: '',
      reorderActive: false,
      title: 'start'
    };
  }
  componentWillUpdate(nextProps) {
    if (this.props.items && this.props.items.length + 1 === nextProps.items.length) {
      this.setState({ activeItem: _.last(nextProps.items).id });
    }
  }

  createItem(newItem) {
    this.props.createItem(newItem);
    this.setState({ addingItem: false });
  }

  showNewModal() {
    return this.props.name && (this.state.addingItem || _.isEmpty(this.props.items));
  }

  activateItem(itemId) {
    if (itemId !== this.state.activeItem && !this.state.reorderActive) {
      this.setState({ activeItem: itemId, reorderActive: false });
    }
  }

  moveItem(oldIndex, newIndex) {
    const itemIds = _.map(this.props.items, 'id');
    const temp = itemIds[newIndex];
    itemIds[newIndex] = itemIds[oldIndex];
    itemIds[oldIndex] = temp;
    this.props.updateItemOrder(itemIds);
  }

  showNofMOption() {
    // Always show this option when editing an assessment
    // N is the number of questions the student has to answer
    // M is the total number of questions in the assessment
    // N < M. If N == M, then we just send -1 to the server, to indicate
    //    that the student has to answer all questions, so we leave
    //    the N == M option out of the selector.
    if (!this.props.items) {
      return null;
    }

    const strings = this.props.localizeStrings('assessmentForm');
    return (
      <div className="au-o-item__top">
        <div className="au-c-dropdown au-c-dropdown--small au-c-dropdown--side-label au-c-input-label--left au-u-ml-md au-u-right">
          <label
            className="au-u-mr-sm"
            htmlFor="nOfM"
          >
            {strings.nOfMLabel}</label>
          <select
            onChange={e => this.props.updateNofM(e.target.value)}
            name="nOfM"
            id="nOfM"
            value={this.props.assessmentOffered &&
              this.props.assessmentOffered.length > 0 ?
              this.props.assessmentOffered[0].nOfM : -1}
          >
            <option
              className="n-of-m-option"
              key="n_of_m_all"
              value={-1}
            >
              {strings.all}</option>
            {
              _.map(_.range(1, this.props.items.length), (ind) => {
                const label = stringFormatter.formatString(
                  strings.nOfM,
                  ind,
                  this.props.items.length
                );
                return (
                  <option
                    className="n-of-m-option"
                    key={`n_of_m_${ind}`}
                    value={ind}
                  >
                    {label}
                  </option>
                );
              })
            }
          </select>
        </div>
      </div>
    );
  }

  showSinglePageOption() {
    // Now that publishing disallows you from editing the assessment,
    //   if you want to show this section, you need to remove the
    //   if() conditional.
    if (this.props.publishedAndOffered) {
      const strings = this.props.localizeStrings('assessmentForm');
      return (
        <div className="au-o-item__top">
          <div className="au-c-checkbox au-u-right">
            <input type="checkbox" id="assessmentFormCheck01" name="check" onChange={e => this.props.updateSingleItemOrPage(e.target.checked)} />
            <label htmlFor="assessmentFormCheck01">{strings.singlePageAssessment}</label>
          </div>
        </div>
      );
    }
    return null;
  }

  newItem() {
    return (
      <NewItem
        cancel={() => this.setState({ addingItem: false })}
        create={newItem => this.createItem(newItem)}
      />
    );
  }

  updateAssessment(e) {
    if (e.target.value) {
      this.props.updateAssessment({ name: e.target.value });
    }
  }

  render() {
    const reorderActive = this.state.reorderActive;
    const canAddItem = !this.state.addingItem && this.props.name;
    const strings = this.props.localizeStrings('assessmentForm');
    return (
      <div className="au-o-contain">
        <div className="au-o-item">
          {this.showNofMOption()}
          {this.showSinglePageOption()}
          <div className="au-c-assessment-title">
            <label htmlFor="title_field" className="au-c-input test_label">
              <div className="au-c-input__contain">
                <input
                  key={this.props.name}
                  defaultValue={this.props.name}
                  className="au-c-text-input au-c-text-input--large"
                  type="text"
                  id="title_field"
                  placeholder={strings.placeholder}
                  onChange={e => this.setState({ title: e.target.value })}
                  onBlur={e => this.updateAssessment(e)}
                />
                { _.isEmpty(this.state.title) ?
                  <div>
                    <div className="au-c-input__bottom has-error" />
                    <div className="au-c-error-text">{strings.nameRequired}</div>
                  </div> :
                  <div className="au-c-input__bottom" />
                }
              </div>
            </label>
          </div>
        </div>
        { this.props.name ?
          _.map(_.compact(this.props.items), (item, index) => (
            <Question
              key={`question_${index}`}
              item={item}
              bankId={this.props.bankId}
              itemIndex={index}
              topItem={index === 0}
              bottomItem={index === (this.props.items.length - 1)}
              isActive={this.state.activeItem === item.id}
              reorderActive={reorderActive}
              activateItem={itemId => this.activateItem(itemId)}
              toggleReorder={() => this.setState({ reorderActive: !reorderActive })}
              deleteAssessmentItem={this.props.deleteAssessmentItem}
              moveItem={(oldIndex, newIndex) => this.moveItem(oldIndex, newIndex)}
            />
          )) : null
        }
        {this.showNewModal() ? this.newItem() : null }
        {canAddItem ? <AddQuestion newItem={() => this.setState({ addingItem: true })} /> : null}
      </div>
    );
  }
}
export default localize(AssessmentForm);
