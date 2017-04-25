import Factory              from './factory';
import AudioUpload          from './audio_upload';
import MultipleChoice       from './multiple_choice';
import MultipleAnswer       from './multiple_answer';
import FileUpload           from './file_upload';
import movableFillBlank     from './movable_fill_blank';
import movableWordSandbox   from './movable_words_sandbox';
import movableWordSentence  from './movable_word_sentence';
import imageSequence        from './image_sequence';
import dragAndDrop          from './drag_and_drop';
import genusTypes           from '../../../../constants/genus_types';
import base                 from './base';

describe('factory', () => {
  let result;
  let type;

  it('calls base', () => {
    result = Factory();
    expect(result).toBe(base);
  });

  it('calls audioUpload', () => {
    const result = Factory(genusTypes.item.audioUpload);
    expect(result).toBe(AudioUpload);
  });

  it('calls multipleChoice', () => {
    const result = Factory(genusTypes.item.multipleChoice);
    expect(result).toBe(MultipleChoice);
  });

  it('calls multipleAnswer', () => {
    const result = Factory(genusTypes.item.multipleAnswer);
    expect(result).toBe(MultipleAnswer);
  });

  it('calls fileUpload', () => {
    const result = Factory(genusTypes.item.fileUpload);
    expect(result).toBe(FileUpload);
  });

  it('calls movableFillBlank', () => {
    const result = Factory(genusTypes.item.movableFillBlank);
    expect(result).toBe(movableFillBlank);
  });

  it('calls movableWordSandbox', () => {
    const result = Factory(genusTypes.item.movableWordSandbox);
    expect(result).toBe(movableWordSandbox);
  });

  it('calls movableWordSentence', () => {
    const result = Factory(genusTypes.item.movableWordSentence);
    expect(result).toBe(movableWordSentence);
  });

  it('calls imageSequence', () => {
    const result = Factory(genusTypes.item.imageSequence);
    expect(result).toBe(imageSequence);
  });

  it('calls dragAndDrop', () => {
    result = Factory(genusTypes.item.dragAndDrop);
    expect(result).toBe(dragAndDrop);
  });
});
