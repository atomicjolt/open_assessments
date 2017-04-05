import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import Spinner    from '../common/spinner';
import BankAssessment from './bank_assessment';
import BankFolder from './bank_folder';


export default class BankList extends React.Component {
  static propTypes = {
    assessments: React.PropTypes.shape({}),
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    banksLoaded: React.PropTypes.bool.isRequired,
    getBankChildren: React.PropTypes.func.isRequired,
    sortBy: React.PropTypes.func.isRequired,
    sortName: React.PropTypes.string,
    sortPublished: React.PropTypes.string,
    deleteAssessment: React.PropTypes.func,
    togglePublishAssessment: React.PropTypes.func,
  }

  constructor() {
    super();
    this.state = {
      focusedItem: null
    };
  }

  focusItem(shouldFocus, item) {
    if (shouldFocus) {
      this.setState({ focusedItem: item });
    } else {
      this.setState({ focusedItem: null });
    }
  }

  render() {
    const items = (
      <table className="au-c-table">
        <tbody>
        {
          _.map(this.props.banks, bank => (
            <BankFolder
              key={`bank_${bank.id}`}
              onFocus={shouldFocus => this.focusItem(shouldFocus, bank.id)}
              bank={bank}
              getBankChildren={this.props.getBankChildren}
              focused={this.state.focusedItem === bank.id}
            />
          ))
        }
        {
          _.map(this.props.assessments, assessment => (
            <BankAssessment
              onFocus={shouldFocus => this.focusItem(shouldFocus, assessment.id)}
              baseEmbedUrl={this.props.baseEmbedUrl}
              getEmbedCode={this.props.getEmbedCode}
              key={`bank_${assessment.id}`}
              bank={assessment}
              assessment={assessment}
              publishedBankId={this.props.publishedBankId}
              getBankChildren={this.props.getBankChildren}
              deleteAssessment={this.props.deleteAssessment}
              togglePublishAssessment={this.props.togglePublishAssessment}
              focused={this.state.focusedItem === assessment.id}
            />
          ))
        }
        </tbody>
      </table>
    );

    return (
      <div className="au-o-contain">

        <div className="au-o-item">
          <Header
            sortBy={this.props.sortBy}
            sortName={this.props.sortName}
            sortPublished={this.props.sortPublished}
          />
          <div className="au-c-scrollable">
            { this.props.banksLoaded ? items : <Spinner /> }
          </div>
        </div>
      </div>
    );
  }
}
