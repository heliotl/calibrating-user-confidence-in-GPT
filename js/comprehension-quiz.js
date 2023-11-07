/*
comprehension-quiz.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Comprehension Quiz Page METADATA file.

This file should contain static variables and functions for
to conduct the comprehension quiz.

There will be no quiz, rather an integrity pledge to sign.
*/

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the quiz page.
******************************************************************************/

//      Quiz Information
var INTEGRITY_PLEDGE = false;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the quiz page.
******************************************************************************/
function pledgeIntegrity() {
    /*
        Functionality once a participant has clicked on the integrity button.

        Once the checkbox is clicked, we must enable the Submit button.
    */
    if (INTEGRITY_PLEDGE) {
        $('#integrity-pledge-submit').attr('disabled', true);
        INTEGRITY_PLEDGE = false;
    } else {
        $('#integrity-pledge-submit').attr('disabled', false);
        INTEGRITY_PLEDGE = true;
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


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the comprehension-quiz.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    // Integrity Pledge Checkbox
    $('#integrity-pledge-button').change(pledgeIntegrity);
    // Integrity Submit
    $('#integrity-pledge-submit').click(moveOntoMainExperiment);
});