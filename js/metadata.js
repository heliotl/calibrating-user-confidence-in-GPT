/*
metadata.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Experimental METADATA file.

This file should contain static experimental metadata such as:
    - Experiment Name
    -
    -
    -
*/

/*
    METADATA
*/
// DEBUG MODE
var DEBUG = true;

//      Experiment Name
//var EXPERIMENT_NAME             = "Calibrating User Confidence in GPT";
var EXPERIMENT_NAME             = "Estimating Confidence : Question Answer Systems";

//      Section Headers
var SECTION_TITLE_CONSENT_PAGE  = "Consent Page";
var SECTION_TITLE_INSTRUCTIONS  = "Instructions";
var SECTION_TITLE_QUIZ          = "Integrity Pledge";
//var SECTION_TITLE_EXPERIMENT    = "Experiment";
var SECTION_TITLE_COMPLETION    = "Task Completed";


$(document).ready(function (){
    /*
        Insert METADATA into page appropriately :)
    */
    //      Experiment Name
    $('#experiment-title').html(EXPERIMENT_NAME);

    //      Section Headers
    $('#consent-header').html(SECTION_TITLE_CONSENT_PAGE);
    $('#instructions-header').html(SECTION_TITLE_INSTRUCTIONS);
    $('#comprehension-quiz-header').html(SECTION_TITLE_QUIZ);
    //$('#task-header').html(SECTION_TITLE_EXPERIMENT);
    $('#experiment-complete-header').html(SECTION_TITLE_COMPLETION);
});