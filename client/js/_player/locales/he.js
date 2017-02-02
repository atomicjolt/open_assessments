export default {
  he: {
    name: "Hebrew",
    dir: "rtl",
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
      complete: "Quiz Complete" // Text displayed when quiz is completed
    },
    twoButtonNav:{
      previousButton: "Previous", // Text displayed on previous questions button
      nextButton: "א", // Text displayed on next questions button
      checkAnswerButton: "אב", // Text displayed on next questions button,
      saveFileButton: "Save File", // Text displayed on save file button
      saveAnswerButton: "Save Answer", // Text displayed on save answer button
      submitButton: "Finish Quiz" // Text displayed on submit button
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
    }
  }
};
