export default {
  en: {
    name: "English",
    dir: "ltr",
    assessment: {
      unansweredQuestionWarning: "Warning There are unanswered questions", // Warning displayed on last question if there are unanswered questions
      leavingQuizPopup: "Don’t leave!", // Text displayed on javascript window alert when a student navigates away from summative quiz
      counterQuestion: "Question {0} of {1}", // Counter for when only a single question is displayed at a time
      counterPage: "Page {0} of {1}" // Counter for when many questions are displayed at a time
    },
    remaining: {
      one_left: "Answer 1 more question.",
      many_left: "Answer {0} more questions.",
      done: "Well done!"
    },
    assessmentComplete: {
      complete: "Thank you" // Text displayed when quiz is completed
    },
    twoButtonNav:{
      previousButton: "Previous", // Text displayed on previous questions button
      nextButton: "Next", // Text displayed on next questions button
      checkAnswerButton: "Check Answer", // Text displayed on next questions button,
      saveFileButton: "Save File", // Text displayed on save file button
      saveAnswerButton: "Save Answer", // Text displayed on save answer button
      submitButton: "Finish" // Text displayed on submit button
    },
    retriesExceeded: {
      triesExceeded: "Too many tries" // Text displayed when a student has run out of quiz attempts
    },
    start: {
      summativeInstruction: "Summative Quiz", // Instructions for summative quiz
      formativeInstruction: "Formative Quiz", // Instructions for formative quiz
      showWhatYouKnowInstruction: "Show What You Know", // Instructions for 'show what you know' style quiz
      startButton: "Start Quiz" // Text displayed on start quiz button
    },
    notFound: {
      notFound: "Not Found" // Text displayed when a page is not found
    },
    about: {
      title:"Open Assessments" // About page title
    },
    loading: {
      loading: "Loading..."
    },
    audioUpload: {
      record: "Record",
      stop: "Stop"
    },
    fileUpload: {
      chooseFile: "Choose a File to Upload"
    },
    middleware: {
      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies to questions that presents discrete number
      // of choices for the user to choose from).
      mustSelectAnswer: "Please select a valid answer",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user input in a
      // text box).
      mustEnterAnswer: "Please enter a valid answer",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user to upload
      // a file).
      mustUploadFile: "Please upload a file",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user use the audio
      // recorder to record an audio sample).
      mustRecordFile: "Please record an audio sample"
    }
  }
};
