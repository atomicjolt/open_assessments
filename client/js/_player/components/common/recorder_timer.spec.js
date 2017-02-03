import React        from 'react';
import TestUtils    from 'react-addons-test-utils';
import RecorderTimer from './recorder_timer';


describe('recorder timer', () => {

  let result;
  let props;
  beforeEach(() => {
    props = {
      timeout: 100,
    };
    result = TestUtils.renderIntoDocument(<RecorderTimer {...props} />);
  });

  afterEach(() => {
  });

  describe('toggle timer', () => {
    it('starts timer', () => {
      result.handleTimerCount();
      expect(result.state).toEqual({
        minsCt: 0,
        secsCt: 0,
        secsStringCt: '00',
        prcntCt: 0
      });
    });

    it('stops timer', () => {
      result.clearTimerCount();

      expect(result.state).toEqual({
        minsCt: 0,
        secsCt: 0,
        secsStringCt: '00',
        prcntCt: 0
      });
    });
  });

  describe('count secs', () => {
    let secsCt = 8;
    it('counts from 08 to 09 as a string', () => {
      result.setState(
        {
          minsCt: 0,
          secsCt: secsCt,
          secsStringCt: '0' + secsCt + 1,
          prcntCt: result.state.prcntCt,
        }
      );
      result.tick(secsCt);
      expect(result.state).toEqual({
        minsCt: 0,
        secsCt: 9,
        secsStringCt: '09',
        prcntCt: result.state.prcntCt
      });
    });
    it('counts from 09 to 10, going from string back to number', () => {
      secsCt = 9;
      result.setState(
        {
          minsCt: 0,
          secsCt: secsCt,
          secsStringCt: '0' + secsCt + 1,
          prcntCt: result.state.prcntCt,
        }
      );
      result.tick(secsCt);
      expect(result.state).toEqual({
        minsCt: 0,
        secsCt: 10,
        secsStringCt: 10,
        prcntCt: result.state.prcntCt
      });
    });
    it('counts from 59 to 00, going from number back to string', () => {
      secsCt = 59;
      result.setState(
        {
          minsCt: 0,
          secsCt: secsCt,
          secsStringCt: '59',
          prcntCt: result.state.prcntCt,
        }
      );
      result.tick(secsCt);
      expect(result.state).toEqual({
        minsCt: 1,
        secsCt: 0,
        secsStringCt: '00',
        prcntCt: result.state.prcntCt
      });
    });
  });

  describe('calc percentage', () => {
    let secsCt = 49;
    let prcntCt = 49;
    it('calculates the percent', () => {
      result.setState(
        {
          minsCt: 0,
          secsCt: secsCt,
          secsStringCt: 49,
          prcntCt: prcntCt,
        }
      );
      result.tick(secsCt);
      expect(result.state).toEqual({
        minsCt: 0,
        secsCt: 50,
        secsStringCt: 50,
        prcntCt: 50
      });
    });
  });

});
