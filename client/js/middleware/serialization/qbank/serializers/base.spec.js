import { baseItem } from './base';

fdescribe('baseSerialization', () => {
  let item;
  beforeEach(() => {
    item = {
      assessmentId:'fakeid',
      bankId:'assessment.Bank%3A577fcf75c89cd90cbd5616f8%40ODL.MIT.EDU',
      id:'assessment.Item%3A58b7140ac89cd95590bd329b%40ODL.MIT.EDU',
      name:'Sample Question',
      type:'fileUpload',
      question:{
        choices:null,
        fileIds:{ file_id: 'file_id' },
        id:'questionID',
        text:'Question Text',
      }
    };
  });

  describe('question', () => {
    it('should only include base fields if question has not changed', () => {
      const result = baseItem(item, {});
      expect(result.question).toEqual({
        id:item.question.id,
        genusTypeId: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU'
      });
    });

    it('it should include updated fields', () => {
      const result = baseItem(item, { question: { text: 'How-Dee!' } });

      expect(result.question).toEqual({
        id: item.question.id,
        genusTypeId: 'question-type%3Aqti-upload-interaction-generic%40ODL.MIT.EDU',
        questionString: 'How-Dee!'
      });
    });
  });
  // it('should only include updated fields')
});
