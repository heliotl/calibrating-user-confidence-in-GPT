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
    METADATA

        All metadata variables that are relevant to the consent page.
******************************************************************************/

//      Task Information
var CURRENT_TASK                = 1;
var TOTAL_TRIALS                = 100;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the consent page.
******************************************************************************/
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
});