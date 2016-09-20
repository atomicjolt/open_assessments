export default {
  hi: {
    name: "Hindi",
    dir: "ltr",
    assessment: {
      unansweredQuestionWarning: "चेतावनी! कुछ सवालों के जवाब नहीं हैं", // Warning displayed on last question if there are unanswered questions
      leavingQuizPopup: "ठहरिए!", // Text displayed on javascript window alert when a student navigates away from summative quiz
      counterQuestion: "{1} की प्रश्न संख्या {0}", // Counter for when only a single question is displayed at a time
      counterPage: "{1} की पृष्ठ संख्या {0}" // Counter for when many questions are displayed at a time
    },
    remaining: {
      one_left: "1 और प्रश्न का उत्तर दें",
      many_left: "{0} और प्रश्नों का उत्तर दें",
      done: "शाबाश!"
    },
    assessmentComplete: {
      complete: "धन्यवाद" // Text displayed when quiz is completed (Quiz completed => प्रश्नोतरी समाप्त) (Thank you => धन्यवाद)
    },
    twoButtonNav:{
      previousButton: "पिछला", // Text displayed on previous questions button
      nextButton: "अगला", // Text displayed on next questions button
      checkAnswerButton: "जवाब की जांच करो", // Text displayed on next questions button,
      saveFileButton: "फाइल सुरक्षित करें", // Text displayed on save file button
      saveAnswerButton: "उत्तर सेव करें", // Text displayed on save answer button
      submitButton: "समाप्त" // Text displayed on submit button (Quiz completed => प्रश्नोतरी समाप्त कर) (Finish => समाप्त)
    },
    item:{
      questionDirectionMany:"लागू होने वाले प्रत्येक को चुनें", // Question direction for multi answer question
      questionDirectionAll:"श्रेष्ठ उत्तर चुनें" // Question direction for single answer question
    },
    retriesExceeded: {
      triesExceeded: "सीमा से अधिक प्रयत्न" // Text displayed when a student has run out of quiz attempts
    },
    start: {
      summativeInstruction: "निर्णायक प्रश्नोतरी", // Instructions for summative quiz
      formativeInstruction: "सृजनात्मक प्रश्नोतरी", // Instructions for formative quiz
      showWhatYouKnowInstruction: "दिखाइए आप क्या जानते हैं", // Instructions for 'show what you know' style quiz
      startButton: "प्रश्नोत्तरी शुरू करें" // Text displayed on start quiz button
    },
    notFound: {
      notFound: "मिला नहीं" // Text displayed when a page is not found
    },
    about: {
      title:"खुला आकलन" // About page title
    },
    loading: {
      loading: "लोड हो रहा है"
    },
    audioUpload: {
      record: "दर्ज करें",
      stop: "रुकिए"
    },
    fileUpload: {
      chooseFile: "अपलोड करने के लिए एक फाइल चुनें"
    },
    middleware: {
      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies to questions that presents discrete number
      // of choices for the user to choose from).
      mustSelectAnswer: "कृप्या एक मान्य उत्तर चुनें",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user input in a
      // text box).
      mustEnterAnswer: "कृप्या एक मान्य उत्तर दर्ज करें",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user to upload
      // a file).
      mustUploadFile: "कृप्या एक फाइल अपलोड कीजिए",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user use the audio
      // recorder to record an audio sample).
      mustRecordFile: "कृप्या एक ऑडियो नमूना रिकॉर्ड कीजिए"
    }
  }
};
