import React        from 'react';
import { colors }   from '../../defines';
import SortButton   from './sort_button';

export default function (props) {
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

  // TODO: Sorting
  return (
    <div style={styles.bar}>
      <div style={styles.name}>
        <div style={styles.title}>Name</div>
        <SortButton />
      </div>
      <div style={styles.publish}>
        <div style={styles.title}>Publish</div>
        <SortButton />
      </div>
    </div>
  );
}
