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
  dragAndDrop: 'Drag and Drop',
};

const feedback = {
  correctFeedback: 'Correct Feedback',
  incorrectFeedback: 'Incorrect Feedback',
  feedback: 'Feedback'
};

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
    audioLimit: {
      rangeWarning: 'Please enter a positive number under'
    },
    backButton: {
      back: 'Back'
    },
    bankListHeader: {
      name: 'Name',
      published: 'Published'
    },
    commonAddOption: {
      addOption: 'Add Option',
    },
    editAssessment: {
      confirm: 'Are you sure you want to delete this item?'
    },
    editorUploadModal: {
      cancel: 'Cancel',
      ok: 'OK',
      error: 'Error',
      insert: 'Insert',
      audioFile: 'Select an Audio file',
      imgFile: 'Select an Image',
      videoFile: 'Select a Video file',

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
    previewHeader: {
      closePreview: 'Close Preview'
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
    reorderHeader: {
      done: 'Done'
    },
    saveOption: {
      saveOptions: 'Save Changes'
    },
    settingsCheckbox: {
      maintainChoiceOrder: 'Maintain choice order',
      multipleAnswer: 'Multiple answer',
      reflection: 'Reflection'
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
    },
    questionHeader: {
      question: 'Question'
    },
    questionSettings: {
      name: 'Name',
      english: 'English',
      hindi: 'Hindi',
      telugu: 'Telugu'
    },
    questionText: {
      instructions: 'To insert blank, add [ _ ] where you want the blank to show up.',
      fitbPlaceholder: 'Fill in the [ _ ] Text',
      otherPlaceholder: 'Question Text'
    },
    dragAndDrop: {
      draggableAnswers: 'Draggable answers'
    },
    addZoneDropDown: {
      byRegion: 'by region',
      byImage: 'by image',
    },
    dragArea: {
      addImage: 'Add Image',
    },
    dropObject: {
      label: 'Label',
      selectAnswer: 'Select Answer'
    },
    dropZone: {
      label: 'Label',
    },
    targetMenu: {
      replace: 'Replace Image',
      targetImage: 'Target Image',
      addSnap: 'Add Snap Zone',
      addDrop: 'Add Drop Zone',
      addImage: 'Add Image',
      showZones: 'Show Zones',
    },
    targetPlaceholder: {
      addImg: 'Add Target Image',
    },
  }
};
