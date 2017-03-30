import _ from 'lodash';
import { createSelector }  from 'reselect';

export const bankId = (state, props) => encodeURIComponent(props.bankId);
export const media = state => state.media;


export const bankMedia = createSelector(
  media,
  bankId,
  (_media, _bankId) => {
    return _media[_bankId];
  }
);
