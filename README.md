#Open Assessments
Open Assessmetns is a QTI client.

#Getting Started:
-----------------------

Make sure to install git and npm before you start then:

1. git clone https://github.com/atomicjolt/react_client_starter_app.git my_project_name
2. Rename .env.example to .env. This file contains the port the server will use. The default 8080 should be fine, but you can also use a local domain or ngrok if you wish.
3. npm install
4. Start server with:

  `npm run hot`

then visit http://localhost:8080


#Background
-----------------------

###QTI
-----------------------
Most qti in active use seems to be the qti 1.2 lite variant. Full qti comes packaged in a zip file.

####oEmbed
-----------------------
OEA supports oembed for assessments. The oEmbed endpoint is located at '/oembed.json'. Pass the url of an assessment to get it's oEmbed representation.

####edX Support
-----------------------
Open Assessments supports the drag and drop and multiple choice question types from edX.
For more information on the edX xml structure see http://edx-open-learning-xml.readthedocs.org/en/latest/index.html

####Assessment by Url
-----------------------
Assessments can be loaded directly from a remote url - the assessment need not be loaded into http://www.openassessments.com.
Just specify a src_url. CORS must be enabled on the server specified by src_url. Example:

http://www.openassessments.com/assessments/load?confidence_levels=true&eid=atest&src_url=https%253A%252F%252Fdl.dropboxusercontent.com%252Fu%252F7594429%252FedXCourse%252Fsequential%252F97cc2d1812204294b5fcbb91a1157368.xml

####Settings - can be passed via window.DEFAULT_SETTINGS or url params
-----------------------
    title             // The title of the assessment

    ##### API endpoints
    api_url           // Url endpoint that will be used when making API calls
    results_end_point // Endpoint where results will be written. Might be the same as api_url but doesn't have to be

    ##### Assessment settings
    // Specify either a src_url or assessment_data. Both are not required.
    src_url           // A url where the assessment can be downloaded. ie http://www.openassessments.com/api/assessments/55.xml
    assessment_data   // The assessment data in QTI format.

    assessment_id     // The id of the assessment
    assessmentKind    : state.settings.assessmentKind,
    max_attempts      // The maximum number of attempts the assessment can be taken

    userAttempts      // The number of time the user has attempted the assessment
    eid               // External identifier. A value that can be used to uniquely identifier the user in another system. Might by a system id, student number, etc
    externalContextId : state.settings.externalContextId,
    user_id           // A user identifier

    is_lti            // Indicates if the Open Assessments was launched via LTI
    lti_role           : state.settings.ltiRole,
    

    accountId         : state.settings.accountId,
    icon              : state.settings.images.QuizIcon_svg,
    theme             : state.application.theme

    // Flags
    confidence_levels : true
    
    eid               : ch15


//     srcData            : srcData(),
//     offline            : bestValue('offline', 'offline', false),
//     assessmentId       : bestValue('assessmentId', 'assessment_id'),
//     eId                : bestValue('eId', 'eid'),
//     kind               : bestValue('kind', 'kind', 'formative'),
//     externalUserId     : bestValue('externalUserId', 'external_user_id'),
//     externalContextId  : bestValue('externalContextId', 'external_context_id'),
//     accountId          : bestValue('accountId', 'account_id'),
//     ltiLaunchId        : defaultSettings.lti_launch_id,
//     keywords           : bestValue('keywords', 'keywords'),
//     resultsEndPoint    : bestValue('resultsEndPoint', 'results_end_point', 'http  ://localhost  :4200/api'),
//     confidenceLevels   : bestValue('confidenceLevels', 'confidence_levels', false),
//     enableStart        : enableStart,
//     style              : bestValue('style', 'style', null),
//     perSec             : parseInt(defaultSettings.per_sec),
//     csrfToken          : defaultSettings.csrfToken || null,
//     allowedAttempts    : defaultSettings.allowed_attempts,
//     userAttempts       : bestValue("user_attempts","userAttempts", 0),
//     lisUserId          : defaultSettings.lis_user_id,
//     lisResultSourceDid : defaultSettings.lis_result_sourcedid,
//     lisOutcomeServiceUrl: defaultSettings.lis_outcome_service_url,
//     isLti              : defaultSettings.isLti,
//     assessmentKind     : defaultSettings.assessmentKind,
//     images             : defaultSettings.images,
//     ltiRole            : defaultSettings.lti_role,
//     assessmentTitle    : defaultSettings.assessmentTitle,
//     showPostMessageNav : defaultSettings.show_post_message_navigation,
//     sectionCount       : parseInt(defaultSettings.sectionCount),
//     userAssessmentId   : bestValue('user_assessment_id', 'UserAssessmentId')

####Embed
Open Assessments is embedded into the page via an iframe. Example:
    `<iframe id="openassessments_container" src="//www.openassessments.com/assessments/load?confidence_levels=true&src_url=http://www.openassessments.com/api/assessments/55.xml&results_end_point=http://www.openassessments.com/api&assessment_id=55&eid=ch15" frameborder="0" style="border:none;width:100%;height:100%;min-height:400px;"></iframe><script src="http://www.openassessments.com/assets/openassessments.js" type="text/javascript"></script>`

####Stats
-----------------------
For assessments loaded into http://www.openassessments.com you simply need to browse to the assessment and click on the bar graph.
Stats are available on the site, as json and as csv. Loading stats for an assessment that was loaded via a src_url is a bit trickier.
You'll want to specify an 'eid' (external identifier). In theory you can query later on based on src_url but that makes things hard to control and a
bit unpredictable. Here's an example using our MIT edX course:

http://www.openassessments.com/assessments/load?confidence_levels=true&eid=atest&src_url=https%253A%252F%252Fdl.dropboxusercontent.com%252Fu%252F7594429%252FedXCourse%252Fsequential%252F97cc2d1812204294b5fcbb91a1157368.xml

For that assessment, the eid specified was 'atest'. View the stats by asking for them by eid. Note that the /0? is important in the url as it tells the system
that you want to find the stats by eid rather than by id:

html:
http://www.openassessments.com/assessment_results/0?eid=atest

csv:
http://www.openassessments.com/assessment_results/0.csv?eid=atest

json:
http://www.openassessments.com/assessment_results/0.json?eid=atest

We recommend using a GUID for the eid to prevent conflicts with other assessments.

#Tests
-----------
Karma and Jasmine are used for testing. To run tests run:

  `npm run test`