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
                className={props.selectedMediaId === item.id ? 'is-active' : ''}
                onClick={() => props.selectMedia(item)}
              >
                <td>
                  <div className="au-c-modal-media__thumbnail">
                    <img src={item.url} alt={item.altText.text} height="15" width="20" />
                  </div>
                </td>
                <td>{item.description.text}</td>
                <td>{item.license.text}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

mediaTable.propTypes = {
  media: React.PropTypes.shape({
    url: React.PropTypes.string,
    id: React.PropTypes.string,
    description: React.PropTypes.shape({
      text: React.PropTypes.string,
    }),
    license: React.PropTypes.shape({
      text: React.PropTypes.string,
    }),
    altText: React.PropTypes.shape({
      text: React.PropTypes.string,
    })
  }),
  selectedMediaId: React.PropTypes.string,
};
