import React      from 'react';
import _          from 'lodash';
import { colors } from '../../defines';
import Header     from './bank_list_header';
import Item       from './bank_list_item';

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
      <Header
        sortByName={props.sortByName}
        sortByPublished={props.sortByPublished}
        sortName={props.sortName}
        sortPublished={props.sortPublished}
      />
      {
        _.map(props.banks, bank => (
          <Item
            key={`bank_${bank.id}`}
            bank={bank}
            getBankChildren={props.getBankChildren}
          />
        ))
      }
    </div>
  );
}

bankList.propTypes = {
  banks: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.shape({})),
    React.PropTypes.shape({})
  ]).isRequired,
  getBankChildren : React.PropTypes.func.isRequired,
  sortByName      : React.PropTypes.func.isRequired,
  sortByPublished : React.PropTypes.func.isRequired,
  sortName        : React.PropTypes.string,
  sortPublished   : React.PropTypes.string,
};
