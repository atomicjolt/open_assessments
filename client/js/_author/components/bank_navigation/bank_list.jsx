import React      from 'react';
import _          from 'lodash';
import { colors } from '../../defines';
import Header     from './bank_list_header';

export default function bankList(props) {
  const styles = {
    container: {
      display         : 'block',
      position        : 'absolute',
      top             : '150px',
      left            : '15vw',
      right           : '15vw',
      backgroundColor : colors.white,
      boxShadow       : `0px 0px 10px ${colors.grey}`,
    }
  };

  return (
    <div style={styles.container}>
      <Header />
      list Items
    </div>
  );
}

bankList.propTypes = {

};
