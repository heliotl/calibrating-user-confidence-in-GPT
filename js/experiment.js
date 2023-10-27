/*
experiment.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Experiment Page METADATA file.

This file should contain static variables and functions for
to conduct the experiment.
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
};

var trialList = [
    debugQuestion,
    debugQuestion,
    debugQuestion,
    debugQuestion,
    debugQuestion
];

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the consent page.
******************************************************************************/

//      Task Information
var CURRENT_TASK                = 1;
var TOTAL_TRIALS                = 100;

//      Task Selection
var CONFIDENCE_SELECTED         = null;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the consent page.
******************************************************************************/
function presentTrial( trial ) {
    // Get the filename of the current image
    imageNow = "images/" + trialList[trial].Im;

    // And replace the source of the image -- browser will load new image
    $('#trial-task').html(trialList[trial].Question); 

    $('#participant-trial-option-1').text(trialList[trial].A); 
    $('#ai-trial-option-A').text(trialList[trial].A);
    
    $('#participant-trial-option-2').text(trialList[trial].B); 
    $('#ai-trial-option-B').text(trialList[trial].B);

    $('#participant-trial-option-3').text(trialList[trial].C); 
    $('#ai-trial-option-C').text(trialList[trial].C);

    $('#participant-trial-option-4').text(trialList[trial].D); 
    $('#ai-trial-option-D').text(trialList[trial].D);

    $('#ai-trial-answers-explanation').html(trialList[trial].Explanation);

    /*
    if (aiHelpStatus){
        $('#ai-help-information').attr("hidden", false);
        $('#ai-help-status').text('ON');
    } else{
        $('#ai-help-information').attr("hidden", true);
        $('#ai-help-status').text('OFF');
    }*/

    // Update the trial counter
    $('#task-img-counter-display').text( (trial+1) + ' ' );

    console.log(' trial=' + trial + ' imageNow=' + imageNow );
};

function nextTask() {
    /*
        Proceed to the next task in the experiment.

        Once the "Submit" button is clicked, you should then move onto the
        next task in the experiment. This means that you will need to
        overwrite the current task information with the new task information.
        This includes changing the CURRENT_TASK number.
    */
    // Increment the current task number
    CURRENT_TASK++;
    // Show new task number
    $('#trialCounter').text(CURRENT_TASK);

    // Fill the rest of this function out with the functionality you need!
    //   TODO

    // At the very end, we want to reset some values for the next trial
    //  Reset participant selection to be NULL
    CONFIDENCE_SELECTED = null;
    //  Disable the Submit button
    $('#proceedMainexperiment').prop('disabled', true);
    //  Reset input radio buttons
    $('input:checked').prop('checked', false);
};


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    //      Task Information
    $('#trialCounter').text(CURRENT_TASK);
    $('#trialCounter-total').text(TOTAL_TRIALS);

    // Present the first image
    presentTrial( CURRENT_TASK );

    // Handles likert selection
    $('#participant-likert-options-selection li input').click(function(){
        // A selection has been made

        // Set selection variable
        CONFIDENCE_SELECTED = $(this).val();
        console.log("RADIO CLICKED", CONFIDENCE_SELECTED);

        $('#proceedMainexperiment').prop('disabled', false);
        /*
        $("#low-button").prop('disabled', false);
            $("#medium-button").prop('disabled', false);
            $("#high-button").prop('disabled', false);
            if (!class_selected){
                //console.log('class not selected');
                if ($(this).hasClass("active")){
                    $(this).removeClass("active");
                } else {
                    $("label").removeClass("active");
                    $(this).addClass("active");
                    classificationTime = new Date().getTime();
                };
            } else{
                //console.log('class selected');
                $("#participant-task-options-container-main label").addClass('disabled').css({"opacity": "1"});
            }
            */
    });
});