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
    var initTaskValueSelectionBox = function ()
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
    var initAddTaskButton = function ()
    {
        $("#add_task").click(function () {
            if (!taskFormInput.validateInput())
                return;
            var task = new Task();
            task.name = $("#task").val();
            task.dueDate = $("#due_date").val();
            task.velocity =
                    $("#velocity :selected")[0].value;
            if (task.velocity === "task_hours")
            {
                task.hours = $("#taskHours").val();
            }

            if (task.velocity === "task_rate")
            {
                task.numberOfPages = $("#numberOfPages").val();
                task.rate = $("#taskRate").val();
            }
            controller.addTask(task);
        });
    }

    return {

        initializeHandlers: function ()
        {
            initDueDatePicker();
            initTaskValueSelectionBox();
            initAddTaskButton();
        }
    };
})();


