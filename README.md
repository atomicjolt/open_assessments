#Open Assessments [![Build Status](https://travis-ci.org/atomicjolt/open_assessments.svg?branch=master)](https://travis-ci.org/atomicjolt/open_assessments) 
Open Assessments is a QTI client that can interpret QTI 1.x and 2.x as well as an authoring tool for generating
QTI files. It currently works with MIT's QBank system.

#Getting Started:
-----------------------

Make sure to install git, npm and yarn before you start then:

1. git clone https://github.com/atomicjolt/open_assessments my_project_name
2. Rename .env.example to .env. This file contains the port the server will use.
   The default 8080 should be fine, but you can also use a local domain or ngrok if you wish.
3. Install packages with

    `yarn`

4. Start server with:

  `yarn hot`

then visit http://localhost:8080


#Background
-----------------------
This code based has was originally developed in partnership with MIT and Atomic Jolt.
It has since been adapted by Lumen Learning and again by MIT. It is currently use in
production at institutions through the United States and Internationally.

###QTI
-----------------------
Open Assessments supports both QTI 1.x and 2.x

###Question Types
-----------------------
The Open Assessments Client supports the following question types:

1. multiple choice
2. true false
3. survey
4. matching
5. text input
6. text only
7. short answer
8. numerical input
9. multiple answers
10. file upload
11. audio upload
12. drag and drop
13. movable object chain
14. movable words sentence
15. movable words sandbox
16. fill the blank

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


## Assets
-----------
Any files added to the assets directory can be used by in code and assigned to a variable. This
allows for referring to assets using dynamically generated strings. The assets will be built according to
the rules specified in your webpack configuration. Typically, this means that in production the names will
be changed to include a SHA.

First importing the assets:
  `import assets from '../libs/assets';`

Then assign the assest to a variable:
  `const img = assets("./images/atomicjolt.jpg");`

The value can then be used when rendering:
  `render(){
    const img = assets("./images/atomicjolt.jpg");
    return<div>
    <img src={img} />
    </div>;
  }`


## Static
-----------
Files added to the static directory will be copied directly into the build. These files will not be renamed.


#Tests
-----------
Karma and Jasmine are used for testing. To run tests run:

  `yarn test`


#Check for updates
-----------
Inside the client directory run:

  `yarn upgrade-interactive`


#Deploy to S3:
-----------------------

  1. Setup credentials. If you've already setup your Amazon credentials in ~/.aws/credentials
  you will be able to do something similar to the following where "myprofile" is one of
  the AWS profiles found in ~/.aws/credentials:

    export AWS_DEFAULT_PROFILE=myprofile
    export AWS_PROFILE=myprofile

  You can also use a .env file. See the [s3-website](https://github.com/klaemo/s3-website) documentation for more options.

  2. Edit configuration.

    Open up .s3-website.json and set the desired bucket name

  3. Configure the bucket as a website

    `yarn create`

  4. Deploy.

    `yarn release`

#Production
-----------------------
If you want to see what your application will look like in production run

  `yarn live`

This will serve files from the build/prod directory.


#Settings - can be passed via window.DEFAULT_SETTINGS or url params
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
    questions_per_section        - Number of questions to utilize from each section.
    questions_per_page           - Number of questions to be displayed on screen at one time.
    shuffle_question_answers     - Shuffle the answers for each question.
    unlock_next                  - When the next set of items should be available to user. ON_CORRECT (Next questions are available when all currently visible questions have been answered correctly), ON_ANSWER_CHECK (When all answers have been checked), or ALWAYS (Next items are always available).
    confidence_levels            - Whether or not to show confidence controls
    locale                       - Sets player language. Languages currently supported: "en"
    audio_recorder_timeout       - Maximum allowed audio recording length, should be a value of seconds.

    // User settings
    role                         - The current user's role. This will control if certain controls show up. The server is still responsible for security.

    // API settings
    csrf_token                   - CSRF token provided by server. Will be added to all subsequent API requests.
    jwt                          - A jwt token that will be added to all subsequent API requests.

    // Settings for Analytics - these are returned to the calling server. All values are optional and are backend dependent.
    eid                          - External identifier. A value that can be used to uniquely identifier the user in another system. Might by a system id, student number, etc
    account_id                   - Account ID from Rails project.
    user_id                      - A user identifier that will be returned to the server whenever results or analytics are sent. Can be provided by the calling server as an authenticated user. Also provided during an LTI launch (see LTI section below)
    keywords                     - Keywords that will be passed to the server.
    user_assessment_id           -

    // LTI Launch values. These are provided by the server if the assessment is loaded via an LTI launch. These values live under the "lti" namespace
    is_lti                             - indicates if OEA was launched via LTI
    lti:
    resource_link_id                    - A resource_link_id provided by LTI launch
    resource_link_title                 - Title from the resource link ie "Steve Job's biography"
    resource_link_description           - Description from the resource link ie "Biography of Steve Jobs"
    user_id                             - A unique user id provided by the LTI launch. ie "292832126"
    roles                               - User roles from the LTI launch. ie "Instructor"
    lis_person_name_full                - The user's full name ie "Steve Jobs"
    lis_person_name_family              - The user's family (last) name ie "Jobs"
    lis_person_name_given               - The user's given (first) name ie "Steve"
    lis_person_contact_email_primary    - The user's email "steve@apple.com"
    lis_person_sourced_id               - ie "school.edu:user"
    context_id                          - ie "456434513"
    context_title                       - ie "Great Innovators"
    context_label                       - ie "SI182"
    lis_outcome_service_url             - A url where a score can be written. ie "http://www.imsglobal.org/developers/BLTI/tool_consumer_outcome.php"
    lis_result_sourcedid                - ie "feb-123-456-2929::28883"
    tool_consumer_instance_guid         - ie "lmsng.school.edu"
    tool_consumer_instance_description  - ie "University of School (LMSng)"
    oauth_callback                      - ie "about:blank"
    ext_submit                          - ie "Press to Launch"

    //
    images                       - Path to images provided by the server. Used with the Rails asset pipeline where the names of images include a SHA in production that can't be known by the client ahead of time. (This should probably be refactored so the images live with the client code rather than the server code)
    show_post_message_navigation - Show study plan and controls for LMS
    section_count                -

    ##### QBank specific settings - These are only use if you are using QBank as your backend
    api_url                      - For QBank assume the api_url looks like http://localhost:8091/api/v1 (the host and port will vary based on deployment)
    eid                          - Used by OEA to uniquely identify a User. In the MIT Clix project this isn't guaranteed to uniquely identify a user but since there are no logins this is as close as we can get.
    bank                         - The id of the QBank bank. Looks something like: "assessment.Bank%3A5751ccf64a40450c4f1c31bb%40ODL.MIT.EDU"
    assessment_offered_id        - An identifier provided by QBank that uniquely identifies the assessment to be taken. Use this id to get an assessment taken id. Looks something like "assessment.AssessmentOffered%3A576d7ee94a40456f9a434e4d%40ODL.MIT.EDU"

#Embed
Open Assessments is embedded into the page via an iframe. Example:
    `<iframe id="openassessments_container" src="//www.openassessments.com/assessments/load?confidence_levels=true&src_url=http://www.openassessments.com/api/assessments/55.xml&results_end_point=http://www.openassessments.com/api&assessment_id=55&eid=ch15" frameborder="0" style="border:none;width:100%;height:100%;min-height:400px;"></iframe><script src="http://www.openassessments.com/assets/openassessments.js" type="text/javascript"></script>`

#Stats
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

# Build issues on Linux
It has been observed on Linux machines (specifically Ubuntu, but may happen on other platforms as well), that
`yarn build` sometimes results in missing `css` classes in the build output. This is because `node-sass` was not
installed properly, so the `.scss` files do not get compiled by `webpack`. To solve this, you need to
re-build `node-sass`  with the following command:

```
npm rebuild node-sass
yarn build
```

You can check for this problem by looking for a component class like `c-header` in `player_styles-*hash*.css`
in `build/prod`.
