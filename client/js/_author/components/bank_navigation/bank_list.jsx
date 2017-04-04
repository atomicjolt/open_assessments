import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import Spinner    from '../common/spinner';
import BankAssessment from './bank_assessment';
import BankFolder from './bank_folder';

export default function bankList(props) {
  let items = (
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

  if (_.isEmpty(props.banks) && _.isEmpty(props.assessments)) {

    items = <table className="au-c-table">
      <tbody>
        <tr><td>This bank is empty</td></tr>
      </tbody>
    </table>
}

  return (
    <div className="au-o-contain">

      <div className="au-o-item">
        <Header
          sortBy={props.sortBy}
          sortName={props.sortName}
          sortPublished={props.sortPublished}
        />
        <div className="au-c-scrollable">
          { props.banksLoaded ? items : <Spinner /> }
        </div>
      </div>
    </div>
  );
}

bankList.propTypes = {
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
};
