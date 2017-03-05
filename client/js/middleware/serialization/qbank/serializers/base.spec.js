import { baseItem } from './base';
import languages from '../../../../constants/language_types';


describe('baseSerialization', () => {
  let item;
  beforeEach(() => {
    item = {
      assessmentId:'fakeid',
      bankId:'assessment.Bank%3A577fcf75c89cd90cbd5616f8%40ODL.MIT.EDU',
      id:'assessment.Item%3A58b7140ac89cd95590bd329b%40ODL.MIT.EDU',
      name:'Sample Question',
      type:'fileUpload',
      answers: null,
      question:{
        choices:null,
        fileIds:{ file_id: 'file_id' },
        id:'questionID',
        text:'Question Text',
      }
    };
  });

  describe('item', () => {});

  describe('question', () => {
    it('should only include base fields if question has not changed', () => {
      const result = baseItem(item, item);
      expect(result.question).toEqual({
        id: 'questionID',
        genusTypeId: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
        fileIds: { file_id: 'file_id' }
      });
    });

    it('it should include updated fields', () => {
      const result = baseItem(item, {
        language: languages.languageTypeId.english,
        question: {
          text: 'How-Dee!',
        }
      });

      expect(result.question).toEqual({
        id: item.question.id,
        genusTypeId: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
        questionString: {
          text: 'How-Dee!',
          languageTypeId: '639-2%3AENG%40ISO',
          formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
          scriptTypeId: '15924%3ALATN%40ISO'
        },
      });
    });
  });
});
