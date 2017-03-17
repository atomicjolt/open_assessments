import AudioLimit from './audio_limit';

describe('AudioLimit', () => {
  it('gets timeLimit', () => {
    const item =  {
      question: {
        timeValue: {
          hours: '1',
          minutes: '70',
          seconds: '100',
        }
      }
    };

    const result = AudioLimit.getAudioLimit(item);

    expect(result).toEqual(7900);
  });
});
