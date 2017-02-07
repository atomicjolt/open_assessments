import React        from 'react';
import { colors }   from '../../defines';
import SortButton   from './sort_button';

export default function bankListHeader(props) {
  const styles = {
    bar: {
      backgroundColor : colors.lightBackground,
      borderBottom    : `1px solid ${colors.accentGrey}`,
      position        : 'relative',
    },
    title: {
      color       : colors.textGrey,
      fontSize    : '1.3em',
      display     : 'inline-block',
      lineHeight  : '60px',
    },
    name: {
      display     : 'inline-block',
      paddingLeft : '30px',
      width       : '65%',
    },
    publish: {
      display : 'inline-block',
      width   : '35%',
    },
  };
  //
  // (
  //   <div style={styles.bar}>
  //     <div style={styles.name}>
  //       <div style={styles.title}>Name</div>
  //       <SortButton
  //         sort={() => props.sortBy('sortName')}
  //         order={props.sortName}
  //       />
  //     </div>
  //     <div style={styles.publish}>
  //       <div style={styles.title}>Publish</div>
  //       <SortButton
  //         sort={() => props.sortBy('sortPublished')}
  //         order={props.sortPublished}
  //       />
  //     </div>
  //   </div>
  // );

  return (
    <table className="c-table">
      <thead>
        <tr>
          <th />
          <th className="is-active">
            <button onClick={() => props.sortBy('sortName')}>
              Name
              <i className="material-icons">keyboard_arrow_up</i>
              <i className="material-icons">keyboard_arrow_down</i>
            </button>
          </th>
          <th>Publish</th>
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
