import React            from 'react';
import TestUtils        from 'react-dom/test-utils';
import localizeStrings  from '../../selectors/localize';
import RecorderTimer    from './recorder_timer';


describe('recorder timer', () => {

  let result;
  let props;
  beforeEach(() => {
    props = {
      timeout: 100,
      localizedStrings : localizeStrings({ settings: { locale: 'en' } }),
    };
    result = TestUtils.renderIntoDocument(<RecorderTimer {...props} />);
  });

  afterEach(() => {
  });

  describe('toggle timer', () => {
    it('starts timer', () => {
      result.handleTimerCount();
      expect(result.state).toEqual({
        minsCt       : 0,
        secsCt       : 0,
        secsStringCt : '00',
        prcntCt      : 0
      });
    });

    it('stops timer', () => {
      result.clearTimerCount();

      expect(result.state).toEqual({
        minsCt       : 0,
        secsCt       : 0,
        secsStringCt : '00',
        prcntCt      : 0
      });
    });
  });

  describe('count secs', () => {
    let secCt = 8;
    const minCt = 0;
    it('counts from 08 to 09 as a string', () => {
      result.setState(
        {
          minsCt       : minCt,
          secsCt       : secCt,
          secsStringCt : `0${secCt + 1}`,
          prcntCt      : result.state.prcntCt,
        }
      );
      result.tick(secCt);
      expect(result.state).toEqual({
        minsCt       : 0,
        secsCt       : 9,
        secsStringCt : '09',
        prcntCt      : result.state.prcntCt
      });
    });
    it('counts from 09 to 10, going from string back to number', () => {
      secCt = 9;
      result.setState(
        {
          minsCt       : minCt,
          secsCt       : secCt,
          secsStringCt : `0${secCt + 1}`,
          prcntCt      : result.state.prcntCt,
        }
      );
      result.tick(secCt);
      expect(result.state).toEqual({
        minsCt       : minCt,
        secsCt       : 10,
        secsStringCt : 10,
        prcntCt      : result.state.prcntCt
      });
    });
    it('counts from 59 to 00, going from number back to string', () => {
      secCt = 59;
      result.setState(
        {
          minsCt       : minCt,
          secsCt       : secCt,
          secsStringCt : '59',
          prcntCt      : result.state.prcntCt,
        }
      );
      result.tick(secCt);
      expect(result.state).toEqual({
        minsCt       : minCt + 1,
        secsCt       : 0,
        secsStringCt : '00',
        prcntCt      : result.state.prcntCt
      });
    });
  });

  describe('calc percentage', () => {
    const secCt = 49;
    const prctCt = 49;
    const minCt = 0;
    it('calculates the percent', () => {
      result.setState(
        {
          minsCt       : minCt,
          secsCt       : secCt,
          secsStringCt : 49,
          prcntCt      : prctCt,
        }
      );
      result.tick(secCt);
      expect(result.state).toEqual({
        minsCt       : minCt,
        secsCt       : 50,
        secsStringCt : 50,
        prcntCt      : 50
      });
    });
  });

});
