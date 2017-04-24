import Factory              from './factory';
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
    expect(Factory).toThrow(new Error('We could not find a type for serializing'));
  });

  it('calls audioUpload', () => {
    const result = Factory('audioUpload');
    expect(result).toBe(AudioUpload);
  });

  it('calls multipleChoice', () => {
    const result = Factory('multipleChoice');
    expect(result).toBe(MultipleChoice);
  });

  it('calls reflection', () => {
    const result = Factory('reflection');
    expect(result).toBe(Survey);
  });

  it('calls multipleAnswer', () => {
    const result = Factory('multipleAnswer');
    expect(result).toBe(MultipleAnswer);
  });

  it('calls multipleReflection', () => {
    const result = Factory('multipleReflection');
    expect(result).toBe(Survey);
  });

  it('calls fileUpload', () => {
    const result = Factory('fileUpload');
    expect(result).toBe(FileUpload);
  });

  it('calls movableFillBlank', () => {
    const result = Factory('movableFillBlank');
    expect(result).toBe(movableFillBlank);
  });

  it('calls movableWordSandbox', () => {
    const result = Factory('movableWordSandbox');
    expect(result).toBe(movableWordSandbox);
  });

  it('calls movableWordSentence', () => {
    const result = Factory('movableWordSentence');
    expect(result).toBe(movableWordSentence);
  });

  it('calls imageSequence', () => {
    const result = Factory('imageSequence');
    expect(result).toBe(imageSequence);
  });

  it('calls dragAndDrop', () => {
    const result = Factory('dragAndDrop');
    expect(result).toBe(dragAndDrop);
  });
});
