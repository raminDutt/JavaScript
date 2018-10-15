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

        var error = true;
        if (!predicate(id))
        {
            error = false;
            $(id).prev().html(errorMessage + "<br>");
        } else
        {
            $(id).prev().html("");
        }
        return error;
    }

    var initTabs = function () {

        $("#tabs").tabs().addClass(
                "ui-tabs-vertical ui-helper-clearfix");
        $("#tabs li").removeClass("ui-corner-top").addClass(
                "ui-corner-left");

    }

    var validateInput = function () {
        var error = true;
        error = validate("task") && error;
        error = validate("due_date") && error;
        var velocity =
                $("#velocity :selected")[0].value;
        error = validate("velocity", function () {
            return (velocity !== "task_hours"
                    && velocity
                    !== "task_rate") ? false : true;
        }) && error;

        var isNumber = function (id)
        {
            return !isNaN($(id).val());
        }

        if (velocity === "task_hours")
        {
            error = validate("taskHours") ? validate("taskHours", isNumber,
                    "Must be a number") && error : false;
        }

        if (velocity === "task_rate")
        {
            error = validate("numberOfPages") ? validate("numberOfPages",
                    isNumber,
                    "Must be a number") && error : false;

            error = validate("taskRate") ? validate("taskRate", isNumber,
                    "Must be a number") && error : false;
        }
        return error;

    }
    var initDueDatePicker = function ()
    {
        $("#due_date").datepicker({
            minDate: new Date(),
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
            if (!validateInput())
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
            initDueDatePicker();
            initTaskValueSelectionBox();
            initAddTaskButton();
            initTabs();
            initWeekAndTaskTab();
        }
    }

})();


