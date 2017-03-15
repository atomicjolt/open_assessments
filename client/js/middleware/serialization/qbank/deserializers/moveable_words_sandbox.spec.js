import { deserializeChoices } from './moveable_words_sandbox';

fdescribe('MoveableWordsSandbox', () => {

  let item;

  beforeEach(() => {
    item = {
      choices: [
        {
          id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
          text: '<p class=\'noun\'>the bus</p>'
        }, {
          id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
          text: '<p class=\'noun\'>the airport</p>'
        }]
    };
  });


  it('should deserialize choices', () => {
    const expectedChoices = [
      {
        id: 'id14a6824a-79f2-4c00-ac6a-b41cbb64db45',
        text: 'the bus',
        wordType: 'noun',
      },
      {
        id: 'id969e920d-6d22-4d06-b4ac-40a821e350c6',
        text: 'the airport',
        wordType: 'noun',
      }
    ];

    const result = deserializeChoices(item.choices);
    expect(result).toEqual(expectedChoices);
  });

  it('should deserialize answers', () => {
    expect(true).toBe(false);
  });
});
