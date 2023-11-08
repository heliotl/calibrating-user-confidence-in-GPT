var checkboxes = {

};

/******************************************************************************
    RUN ON PAGE LOAD

        Run the following functions as soon as the page is loaded. This will
        render the consent.html page appropriately.
******************************************************************************/
$(document).ready(function (){
    $('input:radio[name="legend"]').mouseover(function() {
        console.log("Testing");
        if(!(this.id in checkboxes))
          checkboxes[this.id] = this.checked;
    });
    $('input:radio[name="legend"]').click(function() {
        if(!(this.id in checkboxes))
          checkboxes[this.id] = this.checked;
        this.checked = checkboxes[this.id];
    });
});