"use-strict"
var taskFormInputHandlers = (function () {
    var initDueDatePicker = function ()
    {
        var minDate = new Date();
        minDate.setDate(minDate.getDate() - 30);
        $("#due_date").datepicker({
            minDate: minDate,
            firstDay: 1,
        });
         $("#due_date").datepicker( "setDate", new Date() );
    }
    var initTaskValueSelectionBoxHandler = function ()
    {
        $("#velocity").change(function () {
            $("#velocity").prev().html("");
            var taskValue = $("#velocity :selected")[0].value;
            var html = "";
            switch (taskValue)
            {
                case "task_hours":
                    html =
                            "<label for=\"taskHours\">Hours:</label><br>";
                    html +=
                            "<span class=\"errorMessage\"></span>";
                    html +=
                            "<input type=\"text\" name=\"taskHours\" id=\"taskHours\">";
                    break;
                case "task_rate":
                    html =
                            "<label for=\"numberOfPages\">Pages:</label><br>";
                    html +=
                            "<span class=\"errorMessage\"></span>";
                    html +=
                            "<input type=\"text\" name=\"numberOfPages\" id=\"numberOfPages\"><br>";
                    html +=
                            "<label for=\"taskRate\">Rate (pages/hr):</label><br>";
                    html +=
                            "<span class=\"errorMessage\"></span>";
                    html +=
                            "<input type=\"text\" name=\"taskRate\" id=\"taskRate\">";
                    break;
            }
            $("#valueSelection").html(html);
        });
    }
    var initAddTaskButtonHandler = function ()
    {
        $("#add_task").click(function () {
            if (!taskFormInput.validateInput())
                return;
            var taskData = [];
            taskData["name"] = $("#task").val();
            taskData["dueDate"] = $("#due_date").val();
            //Getting the calue of teh option
            //taskData["velocity"] = $("#velocity :selected")[0].value;
            //getting the text in the option
            /*
             console.log($("#velocity :selected")[0].value);
             console.log($("#velocity :selected")[0].firstChild.nodeValue);
             console.log($($("#velocity :selected")[0]).text());
             */

            taskData["numberOfPages"] = $("#numberOfPages").val() || "0";
            taskData["rate"] = $("#taskRate").val() || "0";
            taskData["hours"] = $("#taskHours").val() || "0";
            var hrs = parseInt(taskData["hours"]);
            if (hrs === 0)
            {
                hrs = taskData["numberOfPages"]
                        / taskData["rate"];
                if (isNaN(hrs) || hrs === Infinity)
                {
                    hrs = 0;
                }
            }
            taskData["hours"] = hrs;
            taskData["status"] = "Not Started";
            controller.addTask(taskData);
        });
    }

    return {

        initializeHandlers: function ()
        {
            initDueDatePicker();
            initTaskValueSelectionBoxHandler();
            initAddTaskButtonHandler();
        }
    };
})();


