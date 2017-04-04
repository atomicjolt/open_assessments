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

const feedback = {
  correctFeedback: 'Correct Feedback',
  incorrectFeedback: 'Incorrect Feedback'
}

export default {
  en: {
    name: 'English',
    dir: 'ltr',
    addImage: {
      addImage: 'Add Image'
    },
    addOption:{
      addOption: 'Add Option'
    },
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
    imageOption: {
      NA: 'N/A'
    },
    imageSequence: {
      ...feedback,
    },
    mcAddOption: {
      addOption: 'Add Option'
    },
    movableFillBlank: {
      ...feedback
    },
    movableWordSentanceOption: {
      NA: 'N/A',
      newOption: 'New Option'
    },
    movableWordSentence: {
      ...feedback
    },
    multipleChoice: {
      ...feedback
    },
    multipleChoiceOptions: {
      optionText: 'Option Text'
    },
    mwSandbox: {
      feedback: 'Feedback',
    },
    navigationBarContent: {
      new: 'NEW',
      publish: 'Publish',
      unpublish: 'Unpublish',
      preview: 'Preview Assessment',
      assessment: 'Assessment',
    },
    newItemForm: {
      addQuestion: 'Add Question',
      name: 'Name',
      cancel: 'Cancel',
      saveNewQuestion: 'Save New Question',
      ...questionTypes
    },
    optionFeedback: {
      feedback: 'Feedback',
    },
    previewQuestion: {
      fileUpload: {
        chooseFile: 'Choose File'
      },
      audioUpload: {
        stop: 'Stop',
        record: 'Record',
      }
    },
    shortAnswer: {
      answerBox: 'Answer Box',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      box: 'Box',
      feedback: 'Feedback'
    },
    question: {
      confirm: 'Are you sure you want to delete this option?'
    }
  }
};
