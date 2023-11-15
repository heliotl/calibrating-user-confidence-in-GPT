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
    IMPORTS

        Import all FirebaseJS functionality.
******************************************************************************/
/// Importing functions and variables from the Firebase Psych library
import {
    writeRealtimeDatabase,
    firebaseUserId
} from "./firebasepsych1.0.js";


/******************************************************************************
    VARIABLES

        All metadata variables that are relevant to the survey page.
******************************************************************************/
// Database Path
var COMPLETE_DB_PATH        = EXPERIMENT_DATABASE_NAME + '/participantData/' + firebaseUserId + '/userFeedback';


/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
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

    function redirectToProlific() {
        /*
            Redirect participants back to prolific after the study.
        */
    window.location.replace("https://app.prolific.com/submissions/complete?cc=C18XJC6Z");
    }

    function submitFeedback() {
        /*
            Submit user feedback.
        */
        writeRealtimeDatabase(
            COMPLETE_DB_PATH,
            {
                "feedbackTime": Date().toString(),
                "feedbackText": $('#user-feedback-text').val()
            }
        );
    };
    //  Copy Unique Code to Clipboard
    $('#unique-code-copy-button').click(redirectToProlific);

    //  Submit User Feedback
    $('#user-feedback-button').click(submitFeedback);
});