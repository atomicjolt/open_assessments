import React                  from 'react';
import _                      from 'lodash';
import { connect }            from 'react-redux';
import * as BankActions       from '../../../actions/qbank/banks';
import * as AssessmentActions from '../../../actions/qbank/assessments';
import * as ItemActions       from '../../../actions/qbank/items';
import NavBar                 from '../common/navigation_bar';
import BankList               from './bank_list';

function select(state) {
  const path = state.bankNavigation.location;
  const currentBankId = path.length ? path[path.length - 1].id : null;
  let banks = state.banks;

  _.forEach(path, (folder) => {
    const currentBank = _.find(banks, { id: folder.id });
    banks = currentBank.childNodes;
  });

  return {
    path,
    currentBankId,
    banks: _.merge(state.assessments[currentBankId], banks),
  };
}
export class BankNavigator extends React.Component {
  static propTypes = {
    banks: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({})),
      React.PropTypes.shape({})
    ]).isRequired,
    path               : React.PropTypes.arrayOf(React.PropTypes.shape({})).isRequired,
    updatePath         : React.PropTypes.func.isRequired,
    getBanks           : React.PropTypes.func.isRequired,
    getAssessments     : React.PropTypes.func.isRequired,
    getItems           : React.PropTypes.func.isRequired,
    createAssessment   : React.PropTypes.func.isRequired,
    currentBankId      : React.PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      sortName      : null,
      sortPublished : null,
    };
  }

  componentWillMount() {
    this.props.getBanks();
  }

  getBankChildren(bank) {
    this.props.updatePath(bank.id, bank.displayName.text);
    this.props.getAssessments(bank.id);
    this.props.getItems(bank.id);
  }

  sortByName() {
    const { sortName } = this.state;
    if (!sortName) {
      this.setState({ sortName: 'asc' });
    } else if (sortName === 'asc') {
      this.setState({ sortName: 'desc' });
    } else {
      this.setState({ sortName: null });
    }
  }

  sortByPublished() {
    const { sortPublished } = this.state;
    if (!sortPublished) {
      this.setState({ sortPublished: 'asc' });
    } else if (sortPublished === 'asc') {
      this.setState({ sortPublished: 'desc' });
    } else {
      this.setState({ sortPublished: null });
    }
  }

  sortBanks() {
    const { sortName, sortPublished } = this.state;
    if (!sortName && !sortPublished) { return this.props.banks; }

    let sortedBanks = this.props.banks;
    if (sortName) {
      sortedBanks = _.orderBy(sortedBanks, bank => bank.displayName.text, sortName);
    }
    if (sortPublished) {
      sortedBanks = _.orderBy(sortedBanks, bank => _.find(bank.assignedBankIds, { id: 'the publishedBankId' }), sortPublished);
    }

    return sortedBanks;
  }

  render() {
    return (
      <div>
        <NavBar
          view="banks"
          path={this.props.path}
          createAssessment={this.props.createAssessment}
          currentBankId={this.props.currentBankId}
          updatePath={this.props.updatePath}
        />
        <BankList
          banks={this.sortBanks()}
          getBankChildren={bank => this.getBankChildren(bank)}
          sortByName={() => this.sortByName()}
          sortByPublished={() => this.sortByPublished()}
          sortName={this.state.sortName}
          sortPublished={this.state.sortPublished}
        />
      </div>
    );
  }
}

export default connect(select, {
  ...BankActions,
  ...AssessmentActions,
  ...ItemActions
})(BankNavigator);
