import React            from 'react';
import { connect }      from 'react-redux';
import _                from 'lodash';
import * as BankActions from '../actions/banks';
import assets           from '../libs/assets';

const select = state => ({
  banks: state.banks,
});

export class Home extends React.Component {
  static propTypes = {
    createAssessment  : React.PropTypes.func.isRequired,
    getAssessments    : React.PropTypes.func.isRequired,
    getBanks          : React.PropTypes.func.isRequired,
    banks             : React.PropTypes.shape({}).isRequired,
  };

  componentWillMount() {
    this.props.getBanks();
  }

  render() {
    const img = assets('./images/atomicjolt.jpg');

    const newAssessment = {
      name        : 'Bens Brand New Assessment',
      description : 'This is the description of this assessment. It exists because',
    };

    const bankId = 'assessment.Bank%3A57a8913bc89cd902273e0fcc%40ODL.MIT.EDU';

    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Open Assessments Author</h1>
        <button onClick={() => this.props.createAssessment(bankId, newAssessment)}>
          Create Assessment
        </button>
        {
          _.map(this.props.banks, bank => (
            <div
              key={`bank_${bank.id}`}
              style={{ border: '1px solid grey', padding: '5px', margin: '5px' }}
            >
              <h3>{bank.displayName.text}</h3>
              <button
                onClick={() => this.props.getAssessments(bank.id)}
                style={{ float: 'right' }}
              >
                Get Assessments
              </button>
              <div style={{ fontSize: '0.6em', color: 'grey' }}>{bank.id}</div>
              {bank.description.text}
              {
                _.map(bank.assessments, assessment => (
                  <div key={`assessment_${assessment.id}`}>
                    <h4>{assessment.displayName.text}</h4>
                    {assessment.description.text}
                  </div>
                ))
              }
            </div>
          ))
        }
        <img src={img} alt="Atomic Jolt Logo" style={{ position: 'fixed', bottom: '20px', right: '20px' }} />
      </div>
    );
  }
}

export default connect(select, BankActions)(Home);
