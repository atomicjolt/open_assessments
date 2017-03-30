const questionTypes = {
  audioUpload: 'Audio Record',
  fileUpload: 'File Upload',
  movableWordSandbox: 'Movable Word -- Sandbox',
  movableWordSentence: 'Movable Word -- Sentence',
  movableFillBlank: 'Movable Word -- Fill in the Blank',
  shortAnswer: 'Short Answer',
  imageSequence: 'Image Sequence',
  multipleChoice: 'Multiple Choice',
  reflection: 'Multiple Choice -- Reflection',
  multipleAnswer: 'Multiple Choice -- Multiple Select',
  multipleReflection: 'Multiple Choice -- Multiple Select & Reflection',
};

export default {
  en: {
    name: 'English',
    dir: 'ltr',
    addQuestionButton: {
      addQuestion: 'Add Question'
    },
    assessmentForm: {
      singlePageAssessment: 'Single page assessment',
      nameRequired: 'Name is required in order to edit',
      placeholder: 'Untitled Assessment'
    },
    bankListHeader: {
      name: 'Name',
      published: 'Published'
    },
    editAssessment: {
      confirm: 'Are you sure you want to delete this item?'
    },
    navigationBarContent: {
      new: 'NEW',
      publish: 'Publish',
      unpublish: 'Unpublish',
      preview: 'Preview Assessment'
    },
    newItemForm: {
      addQuestion: 'Add Question',
      name: 'Name',
      cancel: 'Cancel',
      saveNewQuestion: 'Save New Question',
      ...questionTypes
    }
  }
};
