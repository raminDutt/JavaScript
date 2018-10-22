"use strict"

var taskFormEditDialogueHandlers = (function () {

    var editTask = function ()
    {
        var result = taskFormEditDialogue.validate();
        if (result.status)
        {
            controller.editTask(result.data);
            taskFormEditDialogue.close();
        }
        

    }
    var initDialogueButtons = function ()
    {

        $("#dialog-form form").on("submit", function (event) {
            event.preventDefault();
            editTask();
        });

        $("#dialog-form").dialog({
            buttons: {
                OK: editTask,
                Cancel: function () {
                    taskFormEditDialogue.close();
                }
            },
            close: function () {
                taskFormEditDialogue.resetForm();
                taskFormEditDialogue.close();
            }
        });
    };
    var initHoursInputField = function ()
    {
        var fields = taskFormEditDialogue.getAllFieldIds();
        fields["hours"].change(function ()
        {
            fields["numberOfPages"].val(0);
            fields["rate"].val(0);
        });
    }

    var initRateInputFields = function ()
    {
        var fields = taskFormEditDialogue.getAllFieldIds();
        fields["numberOfPages"].change(function ()
        {
            var pages = fields["numberOfPages"].val();
            var rate = fields["rate"].val();
            var hours = pages / rate;
            if (isNaN(hours) || hours == Infinity)
            {
                hours = 0;
            }
            fields["hours"].val(hours);
        });

        fields["rate"].change(function ()
        {
            var pages = fields["numberOfPages"].val();
            var rate = fields["rate"].val();
            var hours = pages / rate;
            var hours = pages / rate;
            if (isNaN(hours) || hours == Infinity)
            {
                hours = 0;
            }
            fields["hours"].val(hours);
        });
    }
    return {
        initializeHandlers: function ()
        {
            initDialogueButtons();
            initHoursInputField();
            initRateInputFields();
        }
    }
})();
