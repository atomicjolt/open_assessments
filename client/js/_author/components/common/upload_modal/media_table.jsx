import React    from 'react';
import _        from 'lodash';
import assets   from '../../../../libs/assets';

const placeholders = {
  video: (
    <img
      alt="placeholder"
      src={assets('./_author/images/video-thumbnail.png')}
    />
  ),
  audio: (
    <img
      alt="placeholder"
      src={assets('./_author/images/audio-thumbnail.png')}
    />
  )
};

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
                    { placeholders[item.type] || <img src={item.url} alt={item.altText.text} /> }
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
