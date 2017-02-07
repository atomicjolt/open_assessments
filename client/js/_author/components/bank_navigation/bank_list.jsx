import React      from 'react';
import _          from 'lodash';
import Header     from './bank_list_header';
import Item       from './bank_list_item';

export default function bankList(props) {
  //
  // (
  //   <div style={styles.container}>
  //     <Header
  //       sortBy={props.sortBy}
  //       sortName={props.sortName}
  //       sortPublished={props.sortPublished}
  //     />
  //     {
  //       _.map(props.banks, bank => (
  //         <Item
  //           key={`bank_${bank.id}`}
  //           bank={bank}
  //           getBankChildren={props.getBankChildren}
  //         />
  //       ))
  //     }
  //   </div>
  // );

  return (
    <div className="o-contain">

      <div className="o-item">
        <Header
          sortBy={props.sortBy}
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

        <div className="c-scrollable">
          <table className="c-table">
            <tbody>
            <tr>
              <td><i className="material-icons">description</i></td>
              <td>Assessment 1</td>
              <td><button className="c-btn c-btn--square c-publish"><i className="material-icons">cloud_upload</i></button></td>
              <td>
                <div className="c-table__icons">
                  <button className="c-btn c-btn--sm c-btn--table">embed code</button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">edit</i></button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">remove_red_eye</i></button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">delete</i></button>
                </div>
              </td>
            </tr>
            <tr>
              <td><i className="material-icons">folder</i></td>
              <td>Assessment 2</td>
              <td><button className="c-btn c-btn--square c-publish is-published"><i className="material-icons is-published">cloud_done</i></button></td>
              <td>
                <div className="c-table__icons">
                  <button className="c-btn c-btn--sm c-btn--table">embed code</button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">edit</i></button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">remove_red_eye</i></button>
                  <button className="c-btn c-btn--square c-btn--table"><i className="material-icons">delete</i></button>
                </div>
              </td>
            </tr>
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
  getBankChildren : React.PropTypes.func.isRequired,
  sortBy          : React.PropTypes.func.isRequired,
  sortName        : React.PropTypes.string,
  sortPublished   : React.PropTypes.string,
};
