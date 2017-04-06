const initialState = {
  loading: true,
  image: {},
  audio: {},
  video: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MEDIA_DONE': {
      return { ...action.payload, ...{ loading: false } };
    }
    default:
      return state;
  }
};
