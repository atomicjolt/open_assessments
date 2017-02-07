import React                  from 'react';
import { connect }            from 'react-redux';
import NewQuestion            from './new_question'
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';

function select(state) {

}
export class NewAssessment extends React.Component {
  static propTypes = {
    bankId: React.PropTypes.number,
  };

  // const newAssessment = {
  //   name        : 'Bens Brand New Assessment',
  //   description : 'This is the description of this assessment. It exists because',
  // };

  constructor() {
    super();
    this.titleField = null;
    this.state = {
      // bankId: this.props.params.bankId,
      // props.createAssessment(props.currentBankId, newAssessment)
    };
  }

  render() {
    return (
      <div className="o-contain">
        <div className="o-item">
          <div className="o-item__top">
            <div className="c-checkbox u-right">
              <input type="checkbox" id="check01" name="check" />
              <label htmlFor="check01">Single page assessment</label>
            </div>
          </div>

          <div className="c-assessment-title">
            <label className="c-input">
              <div className="c-input__contain">
                <input className="c-text-input c-text-input--large" type="text" placeholder="Untitled Assessment" ref={e => { this.titleField = e; }} />
                <div className="c-input__bottom" />
              </div>
            </label>
          </div>
        </div>
        <NewQuestion bankId={this.props.params.id} />
      </div>

    );

  }
}
// { this.titleField.value }
export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(NewAssessment);
