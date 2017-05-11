import React                                                   from 'react';
import TestUtils                                               from 'react-dom/test-utils';
import localizeStrings                                         from '../../selectors/localize';
import AudioUpload, { __RewireAPI__ as AudioUploadRewireApi }  from './audio_upload';

class FakeRecorder extends React.Component {
  render() {
    return null;
  }
}

describe('audio upload', () => {

  let result;
  let props;
  beforeEach(() => {
    props = {
      selectAnswer     : () => {},
      localizedStrings : localizeStrings({ settings: { locale: 'en' } }),
      audioRecordStart : () => {},
      audioRecordStop  : () => {}
    };
    AudioUploadRewireApi.__Rewire__('Recorder', FakeRecorder);
    result = TestUtils.renderIntoDocument(<AudioUpload {...props} />);
  });

  afterEach(() => {
    AudioUploadRewireApi.__ResetDependency__('Recorder');
  });

  describe('toggle recorder', () => {
    it('toggles recorder', () => {
      result.setState({ recorder: 'start' });
      result.toggle();

      expect(result.state.recorder).toEqual('stop');
    });

    it('toggles recorder', () => {
      result.setState({ recorder: 'stop' });
      result.toggle();

      expect(result.state.recorder).toEqual('start');
    });

    it('sets stop recording timeout on start', () => {
      spyOn(window, 'setTimeout');
      result.setState({ recorder: 'stop' });
      result.toggle();

      expect(result.state.timeoutId).not.toEqual(null);
      expect(window.setTimeout).toHaveBeenCalled();
    });

    it('removes stop recording timeout on stop', () => {
      spyOn(window, 'clearTimeout');
      result.setState({ recorder: 'start' });
      const timeoutId = result.state.timeoutId;
      result.toggle();

      expect(result.state.timeoutId).toEqual(null);
      expect(window.clearTimeout).toHaveBeenCalledWith(timeoutId);
    });

    it('removes timeout on componentWillUnmount', () => {
      spyOn(window, 'clearTimeout');
      result.toggle();
      const timeoutId = result.state.timeoutId;
      result.componentWillUnmount();

      expect(window.clearTimeout).toHaveBeenCalledWith(timeoutId);
    });
  });

});
