import fileUpload       from './file_upload';
import languages        from '../../../../constants/language_types';

describe('fileUpload serializer', () => {
  let item;
  let newItemAttr;

  beforeEach(() => {
    item = {
      question: {
        correctFeedback: { answerId: '1' }
      },
    };
    newItemAttr = {
      question: {
        choices: [{},
        {}],
        correctFeedback: {
          text: 'correctText',
          fileIds: {},
          id: '1',
        },
      },
      language: languages.languageTypeId.english,
    };
  });

  it('handles the serialization', () => {
    const result = fileUpload(item, newItemAttr);
    expect(result.answers[0].genusTypeId).toContain('MIT.EDU');
  });
});
