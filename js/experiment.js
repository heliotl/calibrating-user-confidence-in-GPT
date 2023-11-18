/*
experiment.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Experiment Page METADATA file.

This file should contain static variables and functions for
to conduct the experiment.
*/

/*
CHANGE TITLE TO "Working with ChatGPT"
*/

/******************************************************************************
    IMPORTS

        Import all FirebaseJS functionality.
******************************************************************************/
/// Importing functions and variables from the Firebase Psych library
import {
    writeRealtimeDatabase,
    blockRandomization,
    finalizeBlockRandomization,
    firebaseUserId
} from "./firebasepsych1.0.js";

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the consent page.
******************************************************************************/
//      Task Information
var CURRENT_TASK                = 1;
var TOTAL_TRIALS                = 40;
var DATA_FILE                   = "data/baseline_350_Nov13_withAnsPrefix.json";

//      Database Path
var TRIAL_DB_PATH               = EXPERIMENT_DATABASE_NAME + '/participantData/' + firebaseUserId + '/trialData';

//      Set Time Variables
var EXPERIMENT_START_TIME       = null;
var TRIAL_START_TIME            = null;
var TRIAL_CURRENT_TIME          = null;

//      Task Selection
var PROB_GPT_CORRECT            = null;
var SUBMIT_OWN_CLASSIFICATION   = false;
var PARTICIPANT_OWN_SELECTION       = null;

//      Timers
var PROB_GPT_CORRECT_TIMER      = null;
var PARTICIPANT_OWN_SELECT_TIMER    = null;

//      Trial Information Variables
var LOOKUP_TABLES = [];
var expTrialList;
var participantTrials = [];


/******************************************************************************
    DEBUG

        For now we are in DEBUG mode and will only present a single question.
******************************************************************************/
//      Turn ON/OFF Debug Mode
var DEBUG_EXPERIMENT_CONCURRENT     = DEBUG;

//  Determine the mode and questions
if (DEBUG_EXPERIMENT_CONCURRENT){
    TOTAL_TRIALS = 5;
};


/******************************************************************************
    ORDERED FUNCTIONALITY

        Run the following sequence of events/functions in order.
******************************************************************************/
//  Remove Task Header for Experiment Page
$('#task-header').html('');

//  Load JSON Data into variable
var trialQuestions = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': DATA_FILE,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 

//  Only print on DEBUG mode
if (DEBUG_EXPERIMENT_CONCURRENT) {
    console.log("Trial Questions");
    console.log(trialQuestions);
};

//  Sampling Function
async function getParticipantTrialQuestions() {
    const studyId = EXPERIMENT_DATABASE_NAME;
    // How many minutes before a participant will time out (i.e., when we expect them not to finish the study)?
    // We need this (rough) estimate in order to zero out the counts for participants that started the study
    // but did not finish within this time (and will therefore never finish)
    const maxCompletionTimeMinutes = 90;


    let numCategories = 10; // Total number of categories
    let numBins = 4; // Total number of confidence bins
    let numQuestions = 35; // Total number of questions per category

    let startIndex = 0;  // Start index for lookup

    // Looping over categories
    for (let category = 0; category < numCategories; category++) {
    
        // Loop over confidence bins
        for (let cbin = 0; cbin < numBins; cbin++) {


            // Create a name for this particular combination of category and confidence bin
            let lookupTable = 'Table_' + category + '_' + cbin;
            // Append lookup table name to LOOKUP_TABLES var (needed for finalization)
            LOOKUP_TABLES.push(lookupTable);
            let numDraws = 1; // we sample one question per confidence bin per category (to create 40 questions total)

            let numQuestionsperbin;
            if (cbin==0) numQuestionsperbin = 5; // we have 5 questions per category in the first confidence bin (0.2-0.4)
            if (cbin>0) numQuestionsperbin = 10; // we have 10 questions per category in the remaining confidence bins (0.4-0.6; 0.6-0.8; 0.8-1.0)

            let assignedQuestion = await blockRandomization(studyId, lookupTable, numQuestionsperbin,
                maxCompletionTimeMinutes, numDraws); // the await keyword is mandatory
            
            if (DEBUG_EXPERIMENT_CONCURRENT){
                console.log( "For category " + category + " and confidence bin " + cbin + " we assigned question #" + assignedQuestion + " from that bin and category");
            };

            // Now, go find which question this is from the list of questions and add to the list for this participant
            // The Topic_number and bin_wide_number are all in order
            // We just need to keep track of how far along we are and keep adding to our start index
            participantTrials.push(startIndex + parseInt(assignedQuestion));
            startIndex += numQuestionsperbin;

            $('#expCountdown').text(TOTAL_TRIALS - participantTrials.length);

        };

    };
};

//  Call Sampling function, but make suer we wait until it is finished to continue (await)
await getParticipantTrialQuestions();

/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    //  Hide "Loading" Screen
    $('#mainexperiment-container-loading-page').attr("hidden", true);
    //  Show Experiment Trial Interface
    $('#mainexperiment-container').attr("hidden", false);

    //  Get trials for this experiment!
    let shuffledParticipantTrials = participantTrials.sort((a, b) => 0.5 - Math.random());
    expTrialList = shuffledParticipantTrials.slice(0, TOTAL_TRIALS).map(i => trialQuestions[i]);


    /******************************************************************************
        FUNCTIONALITY

            All functions that will be used for the consent page.
    ******************************************************************************/
    function presentTrial(trialList, trial) {
        /*
            Function to display the current trial.

            This handles updating all elements of a trial:

                - Topic
                - Question
                - Options
                - GPT Explanation
        */
        if (! trial){
            EXPERIMENT_START_TIME = new Date();
            writeRealtimeDatabase(
                TRIAL_DB_PATH + "/metadata",
                {
                    "experimentStartTime": EXPERIMENT_START_TIME.toString(),
                    "experimentCompleted": false,
                }
            );
        }

        // Update the Question TopicList[trial]
        $('#task-question-container-topic-name').text(trialList[trial].Topic);

        //  Update Question
        $('#trial-task').html(trialList[trial].Question); 

        //  Update Options
        $('#participant-trial-option-text-A').text(trialList[trial].A); 
        $('#participant-trial-option-text-B').text(trialList[trial].B); 
        $('#participant-trial-option-text-C').text(trialList[trial].C); 
        $('#participant-trial-option-text-D').text(trialList[trial].D); 

        // Update GPT Explanation
        $('#task-gpt-text-box-explanation-text').html(trialList[trial].Explanation_with_prefix);

        // Initialize all timers
        TRIAL_START_TIME = new Date();

        if (DEBUG_EXPERIMENT_CONCURRENT) {
            console.log(' Current Trial Number =', trial);
            console.log(' Current Trial Data   =', trialList[trial]);
        }
    };

    /*
        Function to control Option Selected
    */
    function enableParticipantOptionSelection() {
        /*
            Enable Options A, B, C, and D

            This needs to be done to allow participants to make
            their own classification decision.
        */
        $('#participant-trial-option-A').prop('disabled', false);
        $('#participant-trial-option-B').prop('disabled', false);
        $('#participant-trial-option-C').prop('disabled', false);
        $('#participant-trial-option-D').prop('disabled', false);
    };

    function disableParticipantOptionSelection() {
        /*
            Disable Options A, B, C, and D

            This needs to be done when participants are making
            their assessment on how the probability GPT is
            correct.
        */
        $('#participant-trial-option-A').prop('disabled', true);
        $('#participant-trial-option-B').prop('disabled', true);
        $('#participant-trial-option-C').prop('disabled', true);
        $('#participant-trial-option-D').prop('disabled', true);
    };

    function replaceClass(element, remove, add) {
        /*
            Use jQuery to replace the class of the given element.
        */

        $(element).removeClass(remove);
        $(element).addClass(add);
    };

    function optionSelected(event) {
        /*
            Control functionality when a participant makes a selection.

            Once they make their own selection of A, B, C, or D, we
            need to set the PARTICIPANT_OWN_SELECTION variable to
            their selected value and then enable the Submit button.
        */
        // Set Time of Selection
        PARTICIPANT_OWN_SELECT_TIMER = new Date();

        if (PARTICIPANT_OWN_SELECTION !== null) {
            // Revert the currently selected class back to dark button color
            replaceClass('#participant-trial-option-' + PARTICIPANT_OWN_SELECTION, "btn-primary", "btn-dark");
        }

        // Define the selected option as the last button clicked
        PARTICIPANT_OWN_SELECTION = event.data.param1;
        // Update the color of the currently selected option
        replaceClass('#participant-trial-option-' + PARTICIPANT_OWN_SELECTION, "btn-dark", "btn-primary");

        //  Enable the Submit button
        $('#proceedMainexperiment').prop('disabled', false);

        if (DEBUG_EXPERIMENT_CONCURRENT) {
            console.log("Participant Selected :", PARTICIPANT_OWN_SELECTION);
        }
    };

    /*
        Function to control Radio Button Selection
    */
    function likertRadioSelect () {
        /*
            Radio Button Selection Contoller.

            What should be done once a radio button is selected.

                - Record the value of the button selected
                - Enable the "Submit" button
        */ 
        // Set Timer
        PROB_GPT_CORRECT_TIMER = new Date();

        // Set selection variable
        PROB_GPT_CORRECT = $(this).val();

        // Enable "Submit" button
        $('#proceedMainexperiment').prop('disabled', false);

        if (DEBUG_EXPERIMENT_CONCURRENT) {
            console.log("Radio Button Selected, GPT Prob :", PROB_GPT_CORRECT);
        }
    };

    /*
        Functions to control experiment Phases
    */
    function nextPhase() {
        /*
            Move onto the next phase of the task.

            After the initial probability selection of GPT correctness,
            the participant will need to make their own decision with GPT
            assistance. To do this we need to disable the GPT likert container
            and enable selection of options A, B, C, and D.
        */
        if (DEBUG_EXPERIMENT_CONCURRENT) {
            console.log("Phase 1 (radio button clicked) :", PROB_GPT_CORRECT);
        }

        // Make the Opacity of the task-likert-scale-container 0.25
        //  This will make it seem like the content in the container is
        //  grayed out.
        $('#task-likert-scale-container').css('opacity', 0.25);
        // Disabled radio button
        //  We should not be able to click on any radio buttons during
        //  Phase 2.
        $('input[type=radio').attr('disabled', true);

        // Enable Options A, B, C, and D
        enableParticipantOptionSelection();

        //  Disable the Submit button
        $('#proceedMainexperiment').prop('disabled', true);

        // Set Timer
        TRIAL_CURRENT_TIME = new Date();

        // Set the SUBMIT_OWN_CLASSIFICATION variable to True
        //  This ensures that the next time the submit button is
        //  pressed, the experiment will move onto the next task.
        SUBMIT_OWN_CLASSIFICATION = true;
    };

    function nextTask() {
        /*
            Proceed to the next task in the experiment.

            Once the "Submit" button is clicked, you should move onto the
            next task in the experiment. This means that we need to:
            
                - Remove highlighting of selected option
                - Disabled the Option buttons
                - Restore opacity for task-likert-scale-container
                - Enable Radio buttons
                - Disable the submit button
                - Reset variables :
                    - PARTICIPANT_OWN_SELECTION -> null
                    - SUBMIT_OWN_CLASSIFICATION -> false
                - Increment trialCounter by updating CURRENT_TASK
        */
        if (DEBUG_EXPERIMENT_CONCURRENT) {
            console.log("Phase 2 (option selected) :", PARTICIPANT_OWN_SELECTION);
        }

        // Remove highlighting of option selected
        replaceClass('#participant-trial-option-' + PARTICIPANT_OWN_SELECTION, "btn-primary", "btn-dark");
        // Disable option buttons
        disableParticipantOptionSelection();

        // Restore Likert container
        // Make the Opacity of the task-likert-scale-container 1
        $('#task-likert-scale-container').css('opacity', 1);
        // Enable radio button
        $('input[type=radio]').attr('disabled', false);

        //  Disable the Submit button
        $('#proceedMainexperiment').prop('disabled', true);
        //  Reset input radio buttons
        $('input:checked').prop('checked', false);

        // WRITE TO DATABASE
        writeRealtimeDatabase(
            TRIAL_DB_PATH + "/trial" + CURRENT_TASK.toString().padStart(2, '0'),
            {
                "trialStartTime": TRIAL_START_TIME.toString(),
                "trialEndTime": Date().toString(),
                "questionID": expTrialList[CURRENT_TASK - 1]['question_id'],
                "questionIndex": shuffledParticipantTrials[CURRENT_TASK - 1],
                "probGPTCorrect": PROB_GPT_CORRECT,
                "probGPTCorrectTime": PROB_GPT_CORRECT_TIMER - TRIAL_START_TIME,
                "patOwnSelection": PARTICIPANT_OWN_SELECTION,
                "patOwnSelectionTime": PARTICIPANT_OWN_SELECT_TIMER - TRIAL_CURRENT_TIME
            }
        );

        // At the very end, we want to reset some values for the next trial
        //  Reset participant selection to be NULL
        PROB_GPT_CORRECT = null;
        PROB_GPT_CORRECT_TIMER = null;
        // Set the SUBMIT_OWN_CLASSIFICATION variable to False
        //  This ensures that the next time the submit button is
        //  pressed, the experiment will move onto phase 2.
        SUBMIT_OWN_CLASSIFICATION = false;
        // Set the PARTICIPANT_OWN_SELECTION variable to null
        //  This way we do not have any stored in memory
        PARTICIPANT_OWN_SELECTION = null;
        PARTICIPANT_OWN_SELECT_TIMER = null;

        TRIAL_START_TIME = null;
        TRIAL_CURRENT_TIME = null;


        // Increment the current task number
        CURRENT_TASK++;
        // Show new task number
        $('#trialCounter').text(CURRENT_TASK.toString().padStart(2, '0'));

        if (CURRENT_TASK <= TOTAL_TRIALS) {
            // Display the next trial
            presentTrial(expTrialList, CURRENT_TASK - 1);
        }
    };

    function allTasksDone() {
        /*
            All experiment trials are done.

            This will submit the final rankings and then load the
            "Survey" page.
        */
        // Write to Database
        let EXPERIMENT_FINISH_TIME = new Date();
        writeRealtimeDatabase(
            TRIAL_DB_PATH + "/metadata/experimentEndTime",
            EXPERIMENT_FINISH_TIME.toString()
        );
        writeRealtimeDatabase(
            TRIAL_DB_PATH + "/metadata/experimentCompleted",
            true
        );
        writeRealtimeDatabase(
            TRIAL_DB_PATH + "/metadata/experimentTotalTime",
            EXPERIMENT_FINISH_TIME - EXPERIMENT_START_TIME
        );
        // Hide Experiment
        $("#task-header").attr("hidden", true);
        $("#task-main-content").attr("hidden", true);
        // Show Survey
        $("#exp-survey-header").attr("hidden", false);
        $("#survey-main-content").attr("hidden", false);

        // Show Survey
        $('#survey-main-content').load('html/survey.html');
    };

    function proceed() {
        /*
            Function to handle the what happens after submit is clicked.

            This will go over the step by step functionality of what
            needs to occur when the submit button is clicked. When it
            is clicked the first time, the task should move onto phase 2.
            When it is clicked a second time, we should move onto the
            next task in the experiment.

            Once the "Submit" button is clicked, you should then move onto the
            next task in the experiment. Since this is the concurrent paradigm
            (AI advice is always turned on), we will not move onto the next
            trial right away. Rather, we will disable the "GPT prob correct"
            aspect of the interface and have the participant select their own
            answer to the question with the help of GPT. After they submit
            their own answer, then they can move onto the next trial.
            
            Single Trial Phase:

                1.a) Make a prob GPT is correct selection
                1.b) Click Submit
                2.a) Make your own selection for an answer
                2.b) Click Submit
                3)   Move onto next trial
        */
    
        if (SUBMIT_OWN_CLASSIFICATION) {
            nextTask();
            if (CURRENT_TASK > TOTAL_TRIALS){
                console.log("All trials done");
                LOOKUP_TABLES.forEach((table) => finalizeBlockRandomization(EXPERIMENT_DATABASE_NAME, table));
                allTasksDone();
            }
        } else {
            nextPhase();
        }
    };

    //  Task Information
    $('#trialCounter').text(CURRENT_TASK.toString().padStart(2, '0'));
    $('#trialCounter-total').text(TOTAL_TRIALS.toString().padStart(2, '0'));

    //  Present the first image
    presentTrial(expTrialList, CURRENT_TASK - 1);
    
    //  Handle Likert Selection
    $('#task-likert-scale-radio-button-selection li input').click(likertRadioSelect);

    //  Handle Option Selection
    $('#participant-trial-option-A').click({param1: "A"}, optionSelected);
    $('#participant-trial-option-B').click({param1: "B"}, optionSelected);
    $('#participant-trial-option-C').click({param1: "C"}, optionSelected);
    $('#participant-trial-option-D').click({param1: "D"}, optionSelected);

    //  Handle Proceeding in Experiment
    $('#proceedMainexperiment').click(proceed);
});