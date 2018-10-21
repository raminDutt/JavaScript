"use-strict"
var taskFormInputHandlers = (function () {
    var initDueDatePicker = function ()
    {
        var minDate = new Date();
        minDate.setDate(minDate.getDate() - 30);
        $("#due_date").datepicker({
            minDate: minDate,
            firstDay: 1
        });
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
            taskData["velocity"] = $("#velocity :selected")[0].value;
            //getting the text in the option
            /*
            console.log($("#velocity :selected")[0].value);
            console.log($("#velocity :selected")[0].firstChild.nodeValue);
            console.log($($("#velocity :selected")[0]).text());
            */
            taskData["hours"] = $("#taskHours").val() || "0";
            taskData["numberOfPages"] = $("#numberOfPages").val() || "0";
            taskData["rate"] = $("#taskRate").val() || "0";
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


