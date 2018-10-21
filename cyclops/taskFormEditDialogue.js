"use strict"

var taskFormEditDialogue = (function ()
{

    function checkLength(o, n) {
        if (o.val().length === 0) {
            o.addClass("ui-state-error");
            updateErrorMessage(n + " cannot be empty.");
            return false;
        } else {
            return true;
        }
    }


    function checkRange(o, n, min, max)
    {
        var value = parseInt(o.val());
        if (max === undefined)
        {
            if (value >= min)
            {
                return true;
            } else
            {
                o.addClass("ui-state-error");
                updateErrorMessage(n + " must be greater than " + min);
                return false;
            }
        }

        if (value >= min && value <= max)
        {
            return true;
        } else
        {
            o.addClass("ui-state-error");
            updateErrorMessage(n + " must be beween " + min + " and " + max);
            return false;
        }
    }

    var taskName = "editTaskname";
    var dueDate = "editTaskDueDate";
    var numberOfPages = "editNumberOfPages";
    var rate = "editRate";
    var hours = "editHours";

    function updateErrorMessage(t) {
        var tips = $(".validateTips");
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    var dialog;
    return {
        close: function ()
        {
            var fields = this.getAllFieldIds()
            var allFields = $([]).add(fields["name"]).add(
                    fields["numberOfPages"]).add(fields["rate"]).add(
                    fields["hours"]);
            allFields.removeClass("ui-state-error");
            dialog.dialog("close");
        },
        getAllFieldIds: function ()
        {
            var fields = [];
            fields["name"] = $("#" + taskName);
            fields["dueDate"] = $("#" + dueDate);
            fields["numberOfPages"] = $("#" + numberOfPages);
            fields["rate"] = $("#" + rate);
            fields["hours"] = $("#" + hours);
            return fields;
        },
        load: function (selector)
        {

            var formHtml =
                    "<div id=\"dialog-form\" title=\"Edit Task\">";
            formHtml +=
                    "<p class=\"validateTips\">All form fields are required.</p>";
            formHtml += "<form>";
            formHtml += "<fieldset>";
            formHtml += "<label for=\"" + taskName + "\">Task Name</label>";
            formHtml +=
                    "<input type=\"text\" name=\"" + taskName + "\" id=\""
                    + taskName
                    + "\" value=\"\" class=\"text ui-widget-content ui-corner-all\">";
            formHtml += "<label for=\"" + dueDate + "\">Due Date</label>";
            formHtml +=
                    "<input type=\"date\" name=\"" + dueDate + "\" id=\""
                    + dueDate
                    + "\" value=\"\" class=\"text ui-widget-content ui-corner-all\">";
            formHtml +=
                    "<label for=\"" + numberOfPages
                    + "\">Number of Pages</label>";
            formHtml +=
                    "<input type=\"number\" min=\"0\" name=\"" + numberOfPages
                    + "\" id=\"" + numberOfPages
                    + "\" value=\"\" class=\"text ui-widget-content ui-corner-all\">";
            formHtml +=
                    "<label for=\"" + rate + "\">Rate(pages/hr)</label>";
            formHtml +=
                    "<input type=\"number\" min=\"0\" name=\"" + rate
                    + "\" id=\"" + rate
                    + "\" value=\"\" class=\"text ui-widget-content ui-corner-all\">";
            formHtml +=
                    "<label for=\"" + hours + "\">Hours</label>";
            formHtml +=
                    "<input type=\"number\" name=\"" + hours
                    + "\" min=\"0\" id=\"" + hours
                    + "\" value=\"\" class=\"text ui-widget-content ui-corner-all\">";

            formHtml +=
                    "<label for=\"editStatus\">Status</label>";
            formHtml +=
                    "<select name=\"editStatus\" id=\"editStatus\" class=\"text ui-widget-content ui-corner-all\">";
            formHtml +=
                    "<option value=\"notStarted\" selected>Not Started</option>";
            formHtml += "<option value=\"inProgress\">In Progress</option>";
            formHtml += "<option value=\"done\">Done</option>";
            formHtml += "</select>"
            formHtml += "</fieldset>";
            formHtml += "</form>";
            formHtml += "</div>";
            $(selector).children().last().after(formHtml);
            dialog = $("#dialog-form").dialog({
                autoOpen: false,
                height: "auto",
                width: 350,
                modal: true,
            });
        },
        open: function (selectedRow)
        {
            var taskAttributes = $(selectedRow).children().get();
            $("#editTaskname").attr("value", $(taskAttributes[0]).text());
            $("#editTaskDueDate").attr("value", $(taskAttributes[1]).text());
            $("#editNumberOfPages").attr("value", $(taskAttributes[2]).text());
            $("#editRate").attr("value", $(taskAttributes[3]).text());
            $("#editHours").attr("value", $(taskAttributes[4]).text());
            $("#editStatus").attr("value", $(taskAttributes[5]).text());
            dialog.dialog("open");
        },
        resetForm: function ()
        {
            $("#dialog-form form").get(0).reset();
        },
        validate: function ()
        {
            var fields = this.getAllFieldIds()
            var allFields = $([]).add(fields["name"]).add(
                    fields["numberOfPages"]).add(fields["rate"]).add(
                    fields["hours"]);

            allFields.removeClass("ui-state-error");
            var valid = true;
            valid = checkLength(fields["name"], "Task Name");
            valid = valid && checkLength(fields["numberOfPages"],
                    "Number Of Pages");
            valid = valid && checkRange(fields["numberOfPages"],
                    "Number of Pages", 0);
            valid = valid && checkLength(fields["rate"], "Rate");
            valid = valid && checkRange(fields["rate"], "Rate", 0);
            valid = valid && checkLength(fields["hours"], "Hours");
            valid = valid && checkRange(fields["hours"], "Hours", 0);




            return valid;
        }

    }
})();

