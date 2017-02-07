import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import ListItem   from './bank_list_item';

export default function bankList(props) {
  return (
    <div className="o-contain">

      <div className="o-item">
        <Header
          sortBy={props.sortBy}
          sortName={props.sortName}
          sortPublished={props.sortPublished}
        />

        <div className="c-scrollable">
          <table className="c-table">
            <tbody>
              {
                _.map(props.banks, bank => (
                  <ListItem
                    key={`bank_${bank.id}`}
                    bank={bank}
                    getBankChildren={props.getBankChildren}
                    deleteAssessment={props.deleteAssessment}
                  />
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

bankList.propTypes = {
  banks: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.shape({})),
    React.PropTypes.shape({})
  ]).isRequired,
  getBankChildren  : React.PropTypes.func.isRequired,
  sortBy           : React.PropTypes.func.isRequired,
  sortName         : React.PropTypes.string,
  sortPublished    : React.PropTypes.string,
  deleteAssessment : React.PropTypes.func,
};
