import factory              from './factory';
import AudioUpload          from './audio_upload';
import MultipleChoice       from './multiple_choice';
import MultipleAnswer       from './multiple_answer';
import Survey               from './reflection';
import FileUpload           from './file_upload';
import movableFillBlank     from './movable_fill_blank';
import movableWordSandbox   from './movable_words_sandbox';
import movableWordSentence  from './movable_word_sentence';
import imageSequence        from './image_sequence';
import dragAndDrop          from './drag_and_drop';

describe('factory', () => {
  it('throws an error without valid case', () => {
    expect(factory).toThrow(new Error('We could not find a type for serializing'));
  });

  it('calls audioUpload', () => {
    const result = factory('audioUpload');
    expect(result).toBe(AudioUpload);
  });

  it('calls multipleChoice', () => {
    const result = factory('multipleChoice');
    expect(result).toBe(MultipleChoice);
  });

  it('calls reflection', () => {
    const result = factory('reflection');
    expect(result).toBe(Survey);
  });

  it('calls multipleAnswer', () => {
    const result = factory('multipleAnswer');
    expect(result).toBe(MultipleAnswer);
  });

  it('calls multipleReflection', () => {
    const result = factory('multipleReflection');
    expect(result).toBe(Survey);
  });

  it('calls fileUpload', () => {
    const result = factory('fileUpload');
    expect(result).toBe(FileUpload);
  });

  it('calls movableFillBlank', () => {
    const result = factory('movableFillBlank');
    expect(result).toBe(movableFillBlank);
  });

  it('calls movableWordSandbox', () => {
    const result = factory('movableWordSandbox');
    expect(result).toBe(movableWordSandbox);
  });

  it('calls movableWordSentence', () => {
    const result = factory('movableWordSentence');
    expect(result).toBe(movableWordSentence);
  });

  it('calls imageSequence', () => {
    const result = factory('imageSequence');
    expect(result).toBe(imageSequence);
  });

  it('calls dragAndDrop', () => {
    const result = factory('dragAndDrop');
    expect(result).toBe(dragAndDrop);
  });
});
