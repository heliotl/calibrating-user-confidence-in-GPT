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
    DEBUG

        For now we are in DEBUG mode and will only present a single question.
******************************************************************************/
/*
var debugQuestion = {
    'Question': `
        For which of these two scenarios does the main character (who uses I/me/my) do something clearly morally wrong, according to ordinary moral standards in the US as of 2020?
        <br />
        <text style="padding-left: 20px">Scenario 1 | I kissed my best friend's wife</text>
        <br />
        <text style="padding-left: 20px">Scenario 2 | I keep boxes of candy in my van to draw in kids.</text>
    `,
    'A': "Wrong, Wrong",
    'B': "Wrong, Not wrong",
    'C': "Not wrong, Wrong",
    'D': "Not wrong, Not wrong",
    'True': "A",
    'Topic': "moral_scenarios",
    'Set': "test",
    'TrueProb': 0.349076,
    'AnswerProb': 0.349076,
    'IsCorrect': 1,
    'probs_1': 0.349076,
    'probs_2': 0.289394,
    'probs_3': 0.317837,
    'probs_4': 0.043692

};
*/
/*
var debugQuestion = {
    'Question': `
        For which of these two scenarios does the main character (who uses I/me/my) do something clearly morally wrong, according to ordinary moral standards in the US as of 2020?
        <br />
        <text style="padding-left: 20px">Scenario 1 | I kissed my niece at the magic show.</text>
        <br />
        <text style="padding-left: 20px">Scenario 2 | I put the matches up high where my son couldn't reach them.</text>
    `,
    'A': "Wrong, Wrong",
    'B': "Wrong, Not wrong",
    'C': "Not wrong, Wrong",
    'D': "Not wrong, Not wrong",
    'True': "D",
    'Topic': "moral_scenarios",
    'Set': "test",
    'TrueProb': 0.238912,
    'AnswerProb': 0.270723,
    'IsCorrect': 0,
    'prob_A': 0.342739,
    'prob_B': 0.152849,
    'prob_C': 0.477042,
    'prob_D': 0.026929,
    'question_id': 13019,
    'bin': 0.25,
    'MaxProba': 0.477042,
    'GPTResponse': 'C',
    'Explanation': `
        In Scenario 1, the main character kisses their niece at a magic show. This could be seen as morally wrong because it could be interpreted as inappropriate or crossing boundaries, especially if the niece is a minor. In the US, there are strict social norms and laws against any form of sexual contact with minors, making this action morally wrong.

        In Scenario 2, the main character puts matches out of reach of their son. This is not morally wrong, as it is a responsible and safe action to prevent potential harm to the child. In fact, it could be seen as morally right to take precautions to protect a child from potential danger.

        Therefore, the correct answer is [C] Not wrong, Wrong.
    `
};*/

var debugQuestions = [
    {
        'Question': `
        Two alternatives for interconnecting a set of processors with bidirectional links are (1) the fully interconnected network, in which each processor is directly connected to every other processor, and (2) the ring network, in which each processor is connected to two other processors. The worst-case path length for a network is the maximum, over all pairs of nodes in the network, of the minimum length paths (measured in number of links) between the nodes. For each type of interconnection of n processors, a figure of merit can be formed as the product of the number of links required for the network times the worst-case path length connecting any two processors. The ratio of this figure of merit for the fully interconnected network compared to that of the ring network, for even n > 2, is
        `,
        'A': "1/(n^2)",
        'B': "1/(n(n-1))",
        'C': "1/n",
        'D': "(n-1)/n",
        'True': "D",
        'Topic': "College Computer Science",
        'Set': "test",
        'TrueProb': 0.192557,
        'AnswerProb': 0.382945,
        'IsCorrect': 0,
        'prob_A': 0.267338,
        'prob_B': 0.382945,
        'prob_C': 0.15716,
        'prob_D': 0.192557,
        'question_id': 790,
        'bin_wide': [0.2, 0.4],
        'MaxProba': 0.382945,
        'GPTResponse': 'B',
        'Explanation': `
        The fully interconnected network requires n(n-1)/2 links, as each processor is connected to every other processor. The worst-case path length for this network is 1, as any two processors can be directly connected.
        The ring network requires n links, as each processor is connected to two other processors. The worst-case path length for this network is n/2, as the longest path between any two processors is through the entire ring.
        Therefore, the figure of merit for the fully interconnected network is n(n-1)/2 * 1 = n(n-1)/2, and the figure of merit for the ring network is n * n/2 = n^2/2.
        The ratio of these two figures of merit is (n(n-1)/2) / (n^2/2) = (n-1)/n, which is option [B].
        `
    },
    {
        'Question': `
        Two computers communicate with each other by sending data packets across a local area network. The size of these packets is 1,000 bytes. The network has the capacity to carry 1,000 packets per second. The CPU time required to execute the network protocol to send one packet is 10 milliseconds. The maximum rate at which one computer can send data to another is approximately
        `,
        'A': "10,000 bytes/second",
        'B': "25,000 bytes/ second",
        'C': "100,000 bytes/ second",
        'D': "500,000 bytes/ second",
        'True': "C",
        'Topic': "College Computer Science",
        'Set': "test",
        'TrueProb': 0.485624,
        'AnswerProb': 0.485624,
        'IsCorrect': 1,
        'prob_A': 0.111797,
        'prob_B': 0.299184,
        'prob_C': 0.485624,
        'prob_D': 0.103395,
        'question_id': 3514,
        'bin_wide': [0.4, 0.6],
        'MaxProba': 0.485624,
        'GPTResponse': 'c',
        'Explanation': `
        The maximum rate at which one computer can send data to another is determined by the network capacity, which is 1,000 packets per second. Each packet is 1,000 bytes, so the maximum rate is 1,000 x 1,000 = 1,000,000 bytes per second. However, the CPU time required to execute the network protocol for one packet is 10 milliseconds, which means that in one second, the CPU can only send 1/10,000 of the total number of packets. Therefore, the maximum rate at which one computer can send data to another is 1,000,000/10,000 = 100,000 bytes per second.
        `
    },
];

var trialList = [
    debugQuestions[0],
    debugQuestions[1],
];

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the consent page.
******************************************************************************/
//      Turn ON/OFF Debug Mode
var DEBUG_EXPERIMENT_CONCURRENT     = DEBUG;

//      Task Information
var CURRENT_TASK               = 1;
var TOTAL_TRIALS                = 40;

//      Task Selection
var PROB_GPT_CORRECT            = null;
var SUBMIT_OWN_CLASSIFICATION   = false;
var PARTICIPANT_OWN_SELECTION   = null;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the consent page.
******************************************************************************/
function presentTrial( trial ) {
    /*
        Function to display the current trial.

        This handles updating all elements of a trial:

            - Topic
            - Question
            - Options
            - GPT Explanation
    */
    // Update the trial counter
    $('#task-img-counter-display').text( (trial+1) + ' ' );

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
    $('#task-gpt-text-box-explanation-text').html(trialList[trial].Explanation);

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

    // At the very end, we want to reset some values for the next trial
    //  Reset participant selection to be NULL
    PROB_GPT_CORRECT = null;
    // Set the SUBMIT_OWN_CLASSIFICATION variable to False
    //  This ensures that the next time the submit button is
    //  pressed, the experiment will move onto phase 2.
    SUBMIT_OWN_CLASSIFICATION = false;
    // Set the PARTICIPANT_OWN_SELECTION variable to null
    //  This way we do not have any stored in memory
    PARTICIPANT_OWN_SELECTION = null;

    // Increment the current task number
    CURRENT_TASK++;
    // Show new task number
    $('#trialCounter').text(CURRENT_TASK);

    if (CURRENT_TASK <= TOTAL_TRIALS) {
        // Display the next trial
        presentTrial( CURRENT_TASK - 1);
    }
};

function allTasksDone() {
    /*
        All experiment trials are done.

        This will submit the final rankings and then load the
        "Survey" page.
    */
    // Hide Experiment
    $("#task-header").attr("hidden", true);
    $("#task-main-content").attr("hidden", true);
    // Show Survey
    $("#exp-survey-header").attr("hidden", false);
    $("#survey-main-content").attr("hidden", false);
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
            allTasksDone();
        }
    } else {
        nextPhase();
    }
};


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    //  Remove Task Header for Experiment Page
    $('#task-header').html('');

    if (DEBUG_EXPERIMENT_CONCURRENT){
        TOTAL_TRIALS = 2;
    }

    //  Task Information
    $('#trialCounter').text(CURRENT_TASK.toString().padStart(2, '0'));
    $('#trialCounter-total').text(TOTAL_TRIALS);

    //  Present the first image
    presentTrial( CURRENT_TASK - 1 );
    
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