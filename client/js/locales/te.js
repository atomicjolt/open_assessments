export default {
  te: {
    name: "Telugu",
    dir: "ltr",
    assessment: {
      unansweredQuestionWarning: "హెచ్చరిక! కొన్ని ప్రశ్నలకు జవాబులు ఇవ్వలేదుి", // Warning displayed on last question if there are unanswered questions
      leavingQuizPopup: "వదలొద్దు!", // Text displayed on javascript window alert when a student navigates away from summative quiz
      counterQuestion: "ప్రశ్న {0} యొక్క {1}", // Counter for when only a single question is displayed at a time
      counterPage: "పేజీ {0} యొక్క {1}" // Counter for when many questions are displayed at a time
    },
    remaining: {
      one_left: "మరొక ప్రశ్నకు జవాబు ఇవ్వండి",
      many_left: "{0} ప్రశ్నలకు జవాబు ఇవ్వండి",
      done: "శభాష్"
    },
    assessmentComplete: {
      complete: "ధన్యవాదాలు" // Text displayed when quiz is completed (Quiz Completed-క్విజ్ ముగిసింది) / ధన్యవాదాలు => Thank you
    },
    twoButtonNav:{
      previousButton: "మునుపటి", // Text displayed on previous questions button మునుపటి/పూర్వపు
      nextButton: "తరువాత", // Text displayed on next questions button తరువాత/ తర్వాత
      checkAnswerButton: "సమాధానం సరిచూసుకోండిీ", // Text displayed on next questions button,
      saveFileButton: "ఫైల్ సెవ్ చేసుకోండి", // Text displayed on save file button ఫైల్ సెవ్ (ఫైల్ కాపాడుట)
      saveAnswerButton: "జవాబు సేవ్ చేసుకోండి", // Text displayed on save answer button జవాబు సేవ్(జవాబు కాపాడుట)
      submitButton: "ముగింపుు" // Text displayed on submit button క్విజ్ ముగింపు(క్విజ్ సమాప్తం)  క్విజ్ ముగింపు => finish quiz; ముగింపు => finish
    },
    item:{
      questionDirectionMany:"వర్తించే అన్ని ఎంచుకోండి", // Question direction for multi answer question
      questionDirectionAll:"ఉత్తమ జవాబుని ఎంచుకోండి" // Question direction for single answer question
    },
    retriesExceeded: {
      triesExceeded: "చాలా ప్రయత్నాలు" // Text displayed when a student has run out of quiz attempts
    },
    start: {
      summativeInstruction: "సంక్షిప్తమైన క్విజ్", // Instructions for summative quiz
      formativeInstruction: "నిర్మాణాత్మక క్విజ్", // Instructions for formative quiz
      showWhatYouKnowInstruction: "నీకు (మీకు) ఏం తెలుసొ చూపించు", // Instructions for 'show what you know' style quiz
      startButton: "ప్రశ్నావళి మొదలు పెట్టండి" // Text displayed on start quiz button
    },
    notFound: {
      notFound: "దొరకలేదు" // Text displayed when a page is not found
    },
    about: {
      title:"ఓపెన్ అసెస్మెంట్/ తెరిచిన లెక్కింపులు" // About page title
    },
    loading: {
      loading: "లొడ్ అవుతుందిి"
    },
    audioUpload: {
      record: "రికార్డు చేయండి",
      stop: "ఆపండిు"
    },
    fileUpload: {
      chooseFile: "అప్లోడ్ కై ఫైల్ ని ఎంచండి"
    },
    middleware: {
      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies to questions that presents discrete number
      // of choices for the user to choose from).
      mustSelectAnswer: "యచేసి చెల్లుబాటైన ఒక సమాధానాన్ని ఎంచుకోండి",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user input in a
      // text box).
      mustEnterAnswer: "దయచేసి చెల్లుబాటైన ఒక సమాధానాన్నినమోదు చేయండి",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user to upload
      // a file).
      mustUploadFile: "దయచెసి ఒక ఫైల్ అప్లొడ్ చెయ్యండి",

      // Text displayed when a user tries to check an answer without
      // selecting one first (Applies when the question expects user use the audio
      // recorder to record an audio sample).
      mustRecordFile: "దయచెసి ఒక ఆడియో మాదిరిని రికార్డు చెయ్యండి"
    }
  }
};
