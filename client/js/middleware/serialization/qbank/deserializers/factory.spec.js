import factory              from './factory';
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

  it('calls base', () => {
    result = factory();
    expect(result).toBe(base);
  });

  it('calls audioUpload', () => {
    result = factory(genusTypes.item.audioUpload);
    expect(result).toBe(AudioUpload);
  });

  it('calls multipleChoice', () => {
    result = factory(genusTypes.item.multipleChoice);
    expect(result).toBe(MultipleChoice);
  });

  it('calls multipleAnswer', () => {
    result = factory(genusTypes.item.multipleAnswer);
    expect(result).toBe(MultipleAnswer);
  });

  it('calls fileUpload', () => {
    result = factory(genusTypes.item.fileUpload);
    expect(result).toBe(FileUpload);
  });

  it('calls movableFillBlank', () => {
    result = factory(genusTypes.item.movableFillBlank);
    expect(result).toBe(movableFillBlank);
  });

  it('calls movableWordSandbox', () => {
    result = factory(genusTypes.item.movableWordSandbox);
    expect(result).toBe(movableWordSandbox);
  });

  it('calls movableWordSentence', () => {
    result = factory(genusTypes.item.movableWordSentence);
    expect(result).toBe(movableWordSentence);
  });

  it('calls imageSequence', () => {
    result = factory(genusTypes.item.imageSequence);
    expect(result).toBe(imageSequence);
  });

  it('calls dragAndDrop', () => {
    result = factory(genusTypes.item.dragAndDrop);
    expect(result).toBe(dragAndDrop);
  });
});
