"use strict";
var bootstrap = (function ()
{
    //Private api
    var validate = function (id, predicate, errorMessage)
    {
        id = "#" + id;
        predicate = predicate || function () {
            return $(id).val() !== "";
        };
        errorMessage = errorMessage || "Required";

        var error = false;
        if (!predicate(id))
        {
            error = true;
            $(id).prev().html(errorMessage + "<br>");
        } else
        {
            $(id).prev().html("");
        }
        return error;
    }



    var validateInput = function () {
        validate("task");
        validate("due_date");
        validate("velocity", function () {
            var taskValueSelection =
                    $("#velocity :selected")[0].value;
            return (taskValueSelection !== "task_hours"
                    && taskValueSelection
                    !== "task_rate") ? false : true;
        });

        var isNumber = function (id)
        {
            return !isNaN($(id).val());
        }
        if (!validate("taskHours"))
        {
            validate("taskHours", isNumber, "Must be a number");
        }
        if (!validate("numberOfPages"))
        {
            validate("numberOfPages", isNumber, "Must be a number");
        }
        if (!validate("taskRate"))
        {
            validate("taskRate", isNumber, "Must be a number");
        }
    }
    var initDueDatePicker = function ()
    {
        $("#due_date").datepicker({
            minDate: new Date(),
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
            console.log(this);
            console.log(me);
            validateInput();
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
        });
    }

    var initWeekAndTaskTab = function ()
    {
        $("#weekStats").click(function () {
            $("#week-stats").removeClass("hide");
            $("#week-tasks").addClass("hide");
        });

        $("#weekTasks").click(function () {
            $("#week-tasks").removeClass("hide");
            $("#week-stats").addClass("hide");
        });

        $("tr").click(function ()
        {
            var isRowSelected = $(this).attr("class") || "";
            if (isRowSelected === "")
            {
                $("tr").removeClass("rowSelected");
                $(this).addClass("rowSelected");
            } else
            {
                $(this).toggleClass("rowSelected");
            }

            //save row Info
        });

        //Initial Load should display only week stats of latest week
        $("#week-stats").removeClass("hide");
        $("#week-tasks").addClass("hide");
    }

    return {
        init: function ()
        {
            console.log(this);
            initDueDatePicker();
            initTaskValueSelectionBox();
            initAddTaskButton();
            initWeekAndTaskTab();
        }
    }

})();


