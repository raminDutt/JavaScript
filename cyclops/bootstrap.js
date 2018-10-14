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
            $(id).prev().html(errorMessage+"<br>");
        } else
        {
            $(id).prev().html("");
        }
        return error;
    }

    //Public api
    return {
        validateInput: function () {
            validate("task");
            validate("due_date");
            validate("value_list", function () {
                var taskValueSelection =
                        $("#value_list :selected")[0].value;
                return (taskValueSelection !== "task_time"
                        && taskValueSelection
                        !== "task_rate") ? false : true;
            });

            var isNumber = function (id)
            {
                return !isNaN($(id).val());
            }
            if (!validate("taskValue"))
            {
                validate("taskValue", isNumber, "Must be a number");
            }
            if (!validate("numberOfPages"))
            {
                validate("numberOfPages", isNumber, "Must be a number");
            }
            if (!validate("velocity"))
            {
                validate("velocity", isNumber, "Must be a number");
            }
        },
        initDueDatePicker: function ()
        {
            $("#due_date").datepicker({
                minDate: new Date(),
            });
        }
        ,
        initTaskValueSelectionBox: function ()
        {
            $("#value_list").change(function () {
                var taskValue = $("#value_list :selected")[0].value;
                var html = "";
                switch (taskValue)
                {
                    case "task_time":
                        html =
                                "<label for=\"taskValue\">Task Value(hrs):</label><br>";
                        html +=
                                "<span class=\"errorMessage\"></span>";
                        html +=
                                "<input type=\"text\" name=\"taskValue\" id=\"taskValue\">";
                        break;
                    case "task_rate":
                        html = "<label for=\"numberOfPages\">Pages:</label><br>";
                        html +=
                                "<span class=\"errorMessage\"></span>";
                        html +=
                                "<input type=\"text\" name=\"numberOfPages\" id=\"numberOfPages\"><br>";
                        html +=
                                "<label for=\"velocity\">Velocity (pages/hr):</label><br>";
                        html +=
                                "<span class=\"errorMessage\"></span>";
                        html +=
                                "<input type=\"text\" name=\"velocity\" id=\"velocity\">";
                        break;
                }
                $("#valueSelection").html(html);
            });
        }
        ,
        initAddTaskButton: function ()
        {
            var me = this;
            $("#add_task").click(function () {
                me.validateInput();
                var taskName = $("#task").val();
                var dueDate = $("#due_date").val();
                var taskName = $("#task").val();
                var taskValue = "";
                var numberOfPages = "";
                var velocity = "";
                var taskValueSelection =
                        $("#value_list :selected")[0].value;
                if (taskValueSelection == "task_time")
                {
                    taskValue = $("#taskValue").val();
                }

                if (taskValueSelection === "task_rate")
                {
                    numberOfPages = $("#numberOfPages").val();
                    velocity = $("#velocity").val();
                }
                console.log("TaskName = " + taskName);
                console.log("Due Date = " + dueDate);
                console.log("taskValueSelection = " + taskValueSelection);
                console.log("taskValue = " + taskValue);
                console.log("numberOfPages = " + numberOfPages);
                console.log("velocity = " + velocity);
            });
        }
        ,
        initWeekAndTaskTab: function ()
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
    }
})();


