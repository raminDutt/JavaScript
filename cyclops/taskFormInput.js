"use-strict"

var taskFormInput = (function () {
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


    return {
        load: function (selector)
        {
            var taskFormHtml = "<h1>Task Manager</h1>";
            selector.html(taskFormHtml);
            taskFormHtml = "<div id=\"taskForm\">";
            taskFormHtml += "<label for=\task\">Task:</label><br>";
            taskFormHtml += "<span class=\"errorMessage\"></span>";
            taskFormHtml +=
                    "<input type=\"text\" name=\"task\" id=\"task\"><br>";
            taskFormHtml += "<label for=\"due_date\">Due Date:</label><br>";
            taskFormHtml += "<span class=\"errorMessage\"></span>";
            taskFormHtml +=
                    "<input type=\"text\" name=\"due_date\" id=\"due_date\"><br>";
            taskFormHtml += " <label for=\"velocity\">Velocity:</label><br>";
            taskFormHtml += "<span class=\"errorMessage\"></span>";
            taskFormHtml += "<select name=\"velocity\" id=\"velocity\">";
            taskFormHtml +=
                    "<option disabled selected>Please select the velocity</option>";
            taskFormHtml += "<option value=\"task_hours\">Hours</option>";
            taskFormHtml += "<option value=\"task_rate\">Rate</option>";
            taskFormHtml += "</select><br>";
            taskFormHtml += "<div id=\"valueSelection\"></div><br>";
            taskFormHtml +=
                    "<input type=\"button\" name=\"add_task\" id=\"add_task\" value=\"Add Task\"><br>";
            taskFormHtml +=
                    "<input type=\"button\" name=\"clear_tasks\" id=\"clear_tasks\" value=\"Clear Tasks\">";
            taskFormHtml += "</div>"
            selector.children().last().after(taskFormHtml);

        },
        validateInput: function () {
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

            var isPositiveNumber = function (id)
            {
                var value = $(id).val();
                if (isNaN(value))
                    return false;
                
                if (value < 0)
                    return false;
                return true;
            }

            if (velocity === "task_hours")
            {
                error = validate("taskHours") ? validate("taskHours",
                        isPositiveNumber,
                        "Must be a positive number") && error : false;
            }

            if (velocity === "task_rate")
            {
                error = validate("numberOfPages") ? validate("numberOfPages",
                        isPositiveNumber,
                        "Must be a positive number") && error : false;

                error = validate("taskRate") ? validate("taskRate",
                        isPositiveNumber,
                        "Must be a positive number") && error : false;
            }
            return error;
        }
    };

})();
