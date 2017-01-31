import React        from 'react';
import { colors }   from '../../defines';
import SortButton   from './sort_button';

export default function (props) {
  const styles = {
    bar: {
      backgroundColor : colors.lightBackground,
      borderBottom    : `1px solid ${colors.accentGrey}`,
    },
    title: {
      color       : colors.textGrey,
      fontSize    : '1.5em',
      display     : 'inline-block',
      lineHeight  : '60px',
    },
    name: {
      display     : 'inline-block',
      paddingLeft : '30px',
      width       : '45%',
    },
    publish: {
      display : 'inline-block',
      width   : '20%',
    },
  };

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
      <div style={styles.title}>Embed</div>
    </div>
  );
}