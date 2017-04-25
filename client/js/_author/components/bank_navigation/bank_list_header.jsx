import React        from 'react';
import localize     from '../../locales/localize';

function bankListHeader(props) {
  const strings = props.localizeStrings('bankListHeader');
  return (
    <table className="au-c-table">
      <thead>
        <tr>
          <th />
          <th>
            <button
              className={props.sortName ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortName')}
            >
              {strings.name}
              <i className={props.sortName === 'desc' ? 'material-icons top is-active' : 'material-icons top'}>
                keyboard_arrow_up
              </i>
              <i className={props.sortName === 'asc' ? 'material-icons bottom is-active' : 'material-icons bottom'}>
                keyboard_arrow_down
              </i>
            </button>
          </th>
          <th>
            <button
              className={props.sortPublished ? 'au-c-table__filter is-active' : 'au-c-table__filter'}
              onClick={() => props.sortBy('sortPublished')}
            >
              {strings.published}
              <i className={props.sortPublished === 'desc' ? 'material-icons top is-active' : 'material-icons top'}>
                keyboard_arrow_up
              </i>
              <i className={props.sortPublished === 'asc' ? 'material-icons bottom is-active' : 'material-icons bottom'}>
                keyboard_arrow_down
              </i>
            </button>
          </th>
          <th />
        </tr>
      </thead>
    </table>
  );
}

bankListHeader.propTypes = {
  sortBy          : React.PropTypes.func.isRequired,
  localizeStrings : React.PropTypes.func.isRequired,
  sortName        : React.PropTypes.string,
  sortPublished   : React.PropTypes.string,
};

export default localize(bankListHeader);
