/*
instructions.js

    Author      :   Helio Tejeda
    University  :   University of California, Irvine
    Lab         :   Modeling and Decision-Making Lab (MADLAB)

Instruction Page METADATA file.

This file should contain static experimental metadata such as:
    - Debug (whether or not to activate debug mode)
    - Current instruction page
    - Total instruction pages
    -
    -
*/

/******************************************************************************
    METADATA

        All metadata variables that are relevant to the instructions page.
******************************************************************************/

// BE SURE TO TURN THIS TO FALSE WHENEVER YOU GO LIVE WITH YOUR EXPERIMENT!!!
var DEBUG_INSTRUCTIONS          = true;

// Instruction Metadata
var CURRENT_INSTRUCTION_PAGE    = 1;
var TOTAL_INSTRUCTION_PAGES     = 10;
var PREVIOUS_BUTTON_DISABLED    = true;
var NEXT_BUTTON_PROCEED         = false;


/******************************************************************************
    FUNCTIONALITY

        All functions that will be used for the instructions page.
******************************************************************************/
function skipInstructions() {
    /*
        This function is for DEBUG mode only!

        This gives you, the programmer, the option to skip instructions
        while you are debugging your experiment. It will just simply
        hide the instructions sections of the experiment and move onto
        the comprehension quiz.
    */
    // Hide Instructions
    $("#instructions-header").attr("hidden", true);
    $("#instructions-main-content").attr("hidden", true);
    // Show Comprehension Quiz
    $("#comprehension-quiz-header").attr("hidden", false);
    $("#comprehension-quiz-main-content").attr("hidden", false);
};

// Instruction Page Navigation Buttons
function previousInstructionButton() {
    /*
        Instructions previous button functionality.

        This function will control what is exectued when the "Previous"
        button is selected. Once selected, the previous instruction page
        will be rendered for the participant to see. This will be
        reflected in the variable CURRENT_INSTRUCTION_PAGE.

        NOTE:
            The "Previous" button is disabled whenever a participant is
            on the 1st page of instructions (there is no previous page
            to go to).
    */

    // Decrement current instruction page
    CURRENT_INSTRUCTION_PAGE--;

    // If the current instruction page is 1, then we need to disable
    //  the "Previous" button.
    if (CURRENT_INSTRUCTION_PAGE == 1) {
        $("#previous-button").prop('disabled', PREVIOUS_BUTTON_DISABLED);
        PREVIOUS_BUTTON_DISABLED = true;
        $("#previous-button").prop('disabled', PREVIOUS_BUTTON_DISABLED);
    }

    // Make a note of what the previous instruction page was
    let previous_instruction_number = CURRENT_INSTRUCTION_PAGE + 1;

    // Update the coloring on the pagination section
    $("#instruction-" + previous_instruction_number).css(
        {"color": "#5a6268", "background-color": "#ffffff"}
    );
    $("#instruction-" + CURRENT_INSTRUCTION_PAGE).css(
        {"background-color": "#6c757d", "color": "#ffffff"}
    );

    // Change the instruction page that is being shown to participant
    $("#instruction-page-" + previous_instruction_number.toString().padStart(2, '0')).attr("hidden", true);
    $("#instruction-page-" + CURRENT_INSTRUCTION_PAGE.toString().padStart(2, '0')).attr("hidden", false);
    
    // If we move away from the final instruction page, we need to
    //  change the button color and wording back to "Next" instead
    //  of "Proceed"
    if (NEXT_BUTTON_PROCEED){
        $("#next-button").text("Next");
        $("#next-button").attr("class", "btn btn-secondary");
    }
    
    // For DEBUG purposes
    console.log( 'Instruction Number' + CURRENT_INSTRUCTION_PAGE );
};

function nextInstructionButton() {
    /*
        Instructions next button functionality.

        This function will control what is exectued when the "Next"
        button is selected. Once selected, the next instruction page
        will be rendered for the participant to see. This will be
        reflected in the variable CURRENT_INSTRUCTION_PAGE.

        NOTE:
            The "Next" button is converted to a "Proceed" button
            whenever the participant has reached the last instruction
            page.
    */

    // Increment current instruction page
    CURRENT_INSTRUCTION_PAGE++;

    // Make a note of what the previous instruction page was
    let previous_instruction_number = CURRENT_INSTRUCTION_PAGE - 1;

    // Update the coloring on the pagination section
    $("#instruction-" + previous_instruction_number).css(
        {"color": "#5a6268", "background-color": "#ffffff"}
    );
    $("#instruction-" + CURRENT_INSTRUCTION_PAGE).css(
        {"background-color": "#6c757d", "color": "#ffffff"}
    );

    // Change the instruction page that is being shown to participant
    $("#instruction-page-" + previous_instruction_number.toString().padStart(2, '0')).attr("hidden", true);
    $("#instruction-page-" + CURRENT_INSTRUCTION_PAGE.toString().padStart(2, '0')).attr("hidden", false);
    

    // If we move to the final instruction page, we need to
    //  change the button color and wording back to "Next" button
    //  to be "Proceed"
    if (CURRENT_INSTRUCTION_PAGE == TOTAL_INSTRUCTION_PAGES) {
        // Instructions are done!
        console.log("INSTRUCTIONS DONE!");
        NEXT_BUTTON_PROCEED = true;
        $("#next-button").text("Proceed");
        $("#next-button").attr("class", "btn btn-primary");
    }
    // If we increment greater than the total instruction page count
    //  then we know we have clicked the proceed button and are
    //  done with the instructions completely. We can now move onto
    //  the comprehension quiz section.
    else if (CURRENT_INSTRUCTION_PAGE > TOTAL_INSTRUCTION_PAGES) {
        // Hide Instructions
        $("#instructions-header").attr("hidden", true);
        $("#instructions-main-content").attr("hidden", true);
        // Show Comprehension Quiz
        $("#comprehension-quiz-header").attr("hidden", false);
        $("#comprehension-quiz-main-content").attr("hidden", false);
    }

    // Enable the "Previous" button whenever we are past the 1st
    //  instruction page.
    if (CURRENT_INSTRUCTION_PAGE > 1){
        if (PREVIOUS_BUTTON_DISABLED){
            PREVIOUS_BUTTON_DISABLED = false;
            $("#previous-button").prop('disabled', PREVIOUS_BUTTON_DISABLED);
        }
    }

    // For DEBUG purposes
    console.log( 'Instruction Number' + CURRENT_INSTRUCTION_PAGE );
};

function disablePreviousButton() {
    /*
        Disable Previous Button if Instruction Page Number is 1
    */
    if (CURRENT_INSTRUCTION_PAGE == 1){
        $("#previous-button").prop('disabled', PREVIOUS_BUTTON_DISABLED);
    }
};

function createPaginationButtons() {
    /*
        Create pagination buttons.

        This will automatically create all of the numbers "button"s for
        all of the indivisual instruction pages. These buttons are
        disabled, but they will allow the participant to visualize
        where they are in the instructions.

        These numbers will change color to reflect the current instruction
        page the participant is on. The current page will be darker than
        all other options.
    */
    var i;
    for (i = 1; i <= TOTAL_INSTRUCTION_PAGES; i++){
        var disabled;
        var style;
        if (CURRENT_INSTRUCTION_PAGE > i){
            disabled = "";
            style = " style='color: #5a6268'";
        } else if (CURRENT_INSTRUCTION_PAGE == i) {
            disabled = "disabled";
            style = " style='background-color: #6c757d; color: #ffffff'";
        } else {
            disabled = "disabled";
            style = "";
        }
        $("#instruction-pages").append(
        `
        <button id="instruction-` + i + `" name="` + i + `" value="` + i + `" type="submit" class="btn btn-link" ` + disabled + style + `>
            ` + i + `
        </button>
        `
        );
    };
};

function debugInstructions() {
    /*
        Turn on instructions debugging.

        This will render the "Skip Instructions" button so that you
        as the programmer can skip this whenever necessary.
    */
    if (DEBUG_INSTRUCTIONS){
        $("#debug-mode-skip-instructions").attr("hidden", false);
    } else{
        $("#debug-mode-skip-instructions").html('');
    }
};

/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the instructions.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    // Disable the "Previous" button at the start of instructions
    disablePreviousButton();

    // Create the pagination number buttons
    createPaginationButtons();

    // Determine if we are in DEBUG mode
    debugInstructions();
});