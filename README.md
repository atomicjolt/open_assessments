#Open Assessments
Open Assessments is a QTI client that can interpret QTI 1.x and 2.x.

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
This code based has was originally developed in partnership with MIT and Atomic Jolt. It has since been adapted by Lumen Learning and again by MIT. It is currently use in production at institutions through the United States and Internationally.

###QTI
-----------------------
Open Assessments supports both QTI 1.x and 2.x

####edX Support
-----------------------
Development of edX support has been paused. Open Assessments did supports the drag and drop and multiple choice question types from edX
and the code is still in place, but has not been used or tested in recent versions. Support is still possible but will require work.
For more information on the edX xml structure see http://edx-open-learning-xml.readthedocs.org/en/latest/index.html

####Assessment by Url
-----------------------
Assessments can be loaded directly from a remote url - the assessment need not be loaded into http://www.openassessments.com.
Just specify a src_url. CORS must be enabled on the server specified by src_url. Example:

http://www.openassessments.com/assessments/load?confidence_levels=true&eid=atest&src_url=https%253A%252F%252Fdl.dropboxusercontent.com%252Fu%252F7594429%252FedXCourse%252Fsequential%252F97cc2d1812204294b5fcbb91a1157368.xml

####Settings - can be passed via window.DEFAULT_SETTINGS or url params
-----------------------

    ##### General
    title                        - The title of the assessment. This value is typically read from the QTI file and is not required. Only provide this value to override the default title.

    ##### API endpoints
    api_url                      - Url endpoint that will be used when making API calls
    results_end_point            - Endpoint where results will be written. Might be the same as api_url but doesn't have to be

    ##### Assessment settings
    // Specify either a src_url, assessment_data or assessment_id. Only one is required.
    src_url                      - A url where the assessment can be downloaded. ie http://www.openassessments.com/api/assessments/55.xml
    assessment_data              - The assessment data in QTI format.
    assessment_id                - The id of the assessment. This value can be used to load an assessment from an endpoint that supports loading assessments by id. It can also be used to uniquely identify an assessment for reporting purposes.

    // Appearance related settings
    assessment_kind              - FORMATIVE, SUMMATIVE, or SHOW_WHAT_YOU_KNOW
    enable_start                 - Whether to show the assessment start screen before starting the assessment. This helps with calculating accurate timing. ie the timer won't start until the user presses start.
    icon                         -
    theme                        -

    // Functional settings
    max_attempts                 - The maximum number of attempts the assessment can be taken
    user_attempts                - The number of time the user has attempted the assessment

    // Settings for Analytics - these are returned to the calling server
    eid                          - External identifier. A value that can be used to uniquely identifier the user in another system. Might by a system id, student number, etc
    account_id                   -
    user_id                      - A user identifier that will be returned to the server whenever results or analytics are sent.
    external_user_id             -
    external_context_id          -
    confidence_levels            - Whether or not to show confidence controls
    keywords                     -
    csrf_token                   -
    user_assessment_id           -

    // LTI Launch values. These are provided by the server if the assessment is loaded via an LTI launch
    is_lti                       - Indicates if the Open Assessments was launched via LTI
    lti_role                     -
    lti_launch_id                -
    lis_user_id                  -
    lis_result_sourced_id        -
    lis_outcome_service_url      -

    //
    questions_per_section        - Number of questions to select and display from each section
    images                       - Path to images provided by the server. Used with the Rails asset pipeline where the names of images include a SHA in production that can't be known by the client ahead of time. (This should probably be refactored so the images live with the client code rather than the server code)
    show_post_message_navigation - Show study plan and controls for LMS
    section_count                -

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
