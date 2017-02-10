import React        from 'react';

export default function bankListHeader(props) {
  return (
    <table className="c-table">
      <thead>
        <tr>
          <th />
          <th>
            <button
              className={props.sortName ? 'c-table__filter is-active' : 'c-table__filter'}
              onClick={() => props.sortBy('sortName')}
            >
              Name
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
              className={props.sortPublished ? 'c-table__filter is-active' : 'c-table__filter'}
              onClick={() => props.sortBy('sortPublished')}
            >
              Publish
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
  sortName        : React.PropTypes.string,
  sortPublished   : React.PropTypes.string,
};
