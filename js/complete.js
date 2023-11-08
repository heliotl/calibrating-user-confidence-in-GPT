/*
complete.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Complete Page JS file (metadata and functionality).

This file should contain all variables and functions needed for
the end of the experiment.
*/


/******************************************************************************
    VARIABLES

        All metadata variables that are relevant to the survey page.
******************************************************************************/

/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the complete page.
******************************************************************************/
function copyCode() {
    /*
        Copy the Unique Code to the clipboard.
    */
    var temp = $("<input>");
    $("body").append(temp);
    temp.val($('#code').val()).select();
    document.execCommand("copy");
    alert("Copied the code: " + temp.val());
    temp.remove();
};

function submitFeedback() {
    /*
        Submit user feedback.
    */
};

/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    //  Copy Unique Code to Clipboard
    $('#unique-code-copy-button').click(copyCode);

    //  Submit User Feedback
    $('#user-feedback-button').click(submitFeedback);
});