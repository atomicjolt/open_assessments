import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import Spinner    from '../common/spinner';
import BankAssessment from './bank_assessment';
import BankFolder from './bank_folder';

export default function bankList(props) {
  const items = (
    <table className="au-c-table">
      <tbody>
        {
        _.map(props.banks, bank => (
          <BankFolder
            key={`bank_${bank.id}`}
            bank={bank}
            getBankChildren={props.getBankChildren}
          />
        ))
        }
        {
          _.map(props.assessments, assessment => (
            <BankAssessment
              baseEmbedUrl={props.baseEmbedUrl}
              getEmbedCode={props.getEmbedCode}
              key={`bank_${assessment.id}`}
              bank={assessment}
              assessment={assessment}
              publishedBankId={props.publishedBankId}
              getBankChildren={props.getBankChildren}
              deleteAssessment={props.deleteAssessment}
              togglePublishAssessment={props.togglePublishAssessment}
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
          sortBy={props.sortBy}
          sortName={props.sortName}
          sortPublished={props.sortPublished}
        />
        <div className="au-c-scrollable">
          { _.isEmpty(props.banks) ? <Spinner /> : items }
        </div>
      </div>
    </div>
  );
}

bankList.propTypes = {
  assessments: React.PropTypes.arrayOf(
  React.PropTypes.shape({
    isPublished: React.PropTypes.bool.isRequired,
    bankId: React.PropTypes.string.isRequired,
    id: React.PropTypes.string.isRequired,
  })).isRequired,
  banks: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.shape({})),
    React.PropTypes.shape({})
  ]).isRequired,
  getBankChildren  : React.PropTypes.func.isRequired,
  sortBy           : React.PropTypes.func.isRequired,
  sortName         : React.PropTypes.string,
  sortPublished    : React.PropTypes.string,
  deleteAssessment : React.PropTypes.func,
  togglePublishAssessment: React.PropTypes.func,
};
