/*
comprehension-quiz.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Comprehension Quiz Page METADATA file.

This file should contain static variables and functions for
to conduct the comprehension quiz.
*/

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the quiz page.
******************************************************************************/

//      Quiz Information
var COMPQUIZ_PASSED             = false;
var COMPQUIZ_ATTEMPTS           = 0;
var COMPQUIZ_MAX_ATTEMPTS       = 2;
var COMPQUIZ_CURRENT_TASK       = 1;
var COMPQUIZ_TOTAL_TRIALS       = 5;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the quiz page.
******************************************************************************/
function comprehensionQuiznextTask() {
    /*
        Proceed to the next task in the experiment.

        Once the "Submit" button is clicked, you should then move onto the
        next task in the experiment. This means that you will need to
        overwrite the current task information with the new task information.
        This includes changing the CURRENT_TASK number.
    */
    // Increment the current task number
    COMPQUIZ_CURRENT_TASK++;
    // Show new task number
    $('#comprehension-quiz-trialCounter').text(COMPQUIZ_CURRENT_TASK);

    // Fill the rest of this function out with the functionality you need!
    //   TODO
    /*
        Determine if the participant has passed the comprehension quiz

        COMPQUIZ_PASSED = true;
    */

    /*
        Once a participant has submitted their response for the last
        comprehension quiz question, we need to determine what to do.

        There are a few things that can happen:

            1) Participant successfully passes the comprehension quiz
               (on any attempt)
                RESULT:
                    The participant is now granted access to the
                    full experiment! :)

            2) Participant fails the comprehension quiz on 1st attempt
                RESULTS:
                    The participant will be allowed to retake the
                    quiz again.

            3) Participant fails the comprehension quiz on 2nd attempt
                RESULTS:
                    The participant will not be granted access to the
                    full experiment :(
    */
    if (COMPQUIZ_CURRENT_TASK > COMPQUIZ_TOTAL_TRIALS) {
        // ACCESS GRANTED (passed the quiz)
        if (COMPQUIZ_PASSED){
            comprehensionQuizComplete_ModifyHeader("green", "Completed");
            $("#comprehension-quiz-task-container").attr("hidden", true);
            $("#comprehension-quiz-task-passed").attr("hidden", false);
        } else{
            // Increment the number of Comprehension Quiz attempts
            COMPQUIZ_ATTEMPTS++;

            if (COMPQUIZ_ATTEMPTS >= COMPQUIZ_MAX_ATTEMPTS){
                // ACCESS REJECTED (failed the quiz 2x)
                comprehensionQuizComplete_ModifyHeader("red", "Failed");
                $("#comprehension-quiz-task-container").attr("hidden", true);
                $("#comprehension-quiz-task-failed").attr("hidden", false);
            } else {
                // TRY AGAIN
                comprehensionQuizComplete_ModifyHeader("orange", "Failed");
                $("#comprehension-quiz-task-container").attr("hidden", true);
                $("#comprehension-quiz-task-try-again").attr("hidden", false);
            }
        }
    };
};

function comprehensionQuizComplete_ModifyHeader(color, modification) {
    /*
        Comprehension Quiz has been completed.

        This function will modify the comprehension quiz header at the top
        of the page to reflect that the quiz has been completed.
    */
    if (modification == "None"){
        $("#comprehension-quiz-header").html(
            "Comprehension Quiz"
        );
    } else {
        $("#comprehension-quiz-header").html(
            "Comprehension Quiz <br /> <center style='color: " + color + "'>" + modification + "</center>"
        );
    }
};

function moveOntoMainExperiment() {
    // Hide Comprehension Quiz
    $("#comprehension-quiz-header").attr("hidden", true);
    $("#comprehension-quiz-main-content").attr("hidden", true);
    // Show Comprehension Quiz
    $("#task-header").attr("hidden", false);
    $("#task-main-content").attr("hidden", false);
};

function tryQuizAgain() {
    /*
        If the participant failed the comprehension quiz, they can take it again.

        Maximum number of attempts is denoted by COMPQUIZ_MAX_ATTEMPTS.
    */
    //  Hide and show relevant containers in HTML file
    comprehensionQuizComplete_ModifyHeader("black", "None");
    $("#comprehension-quiz-task-container").attr("hidden", false);
    $("#comprehension-quiz-task-try-again").attr("hidden", true);

    //  Reset variables for quiz
    COMPQUIZ_CURRENT_TASK = 1;
    $('#comprehension-quiz-trialCounter').text(COMPQUIZ_CURRENT_TASK);

    // For DEBUG purposes
    //  Participant will pass quiz after their first attempt
    COMPQUIZ_PASSED = true;
};


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the comprehension-quiz.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    //      Task Information
    $('#comprehension-quiz-trialCounter').text(COMPQUIZ_CURRENT_TASK);
    $('#comprehension-quiz-trialCounter-total').text(COMPQUIZ_TOTAL_TRIALS);
});