import React    from 'react';
import _        from 'lodash';

export default function mediaTable(props) {

  return (
    <div className="au-c-modal-media__results">
      <table>
        <tbody>
          {
            _.map(props.media, item => (
              <tr
                key={`media_item_${item.id}`}
                className={props.activeItem === item.id ? 'is-active' : ''}
                onClick={() => props.selectItem(item.id)}
              >
                <td>
                  <div className="au-c-modal-media__thumbnail">
                    <img src={item.url} alt={item.altText.text} height="15" width="20" />
                  </div>
                </td>
                <td>{item.description.text}</td>
                <td>{item.license}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
