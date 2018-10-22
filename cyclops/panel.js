"use strict"
var panel = (function () {

    var selectedRow;
    var createEditButton = function (tabId)
    {
        var editButton = "editButton-" + tabId;
        var editButtonHtml = "<button id=" + editButton + ">Edit</button>";
        $("#taskButtons-" + tabId).html(editButtonHtml);
        $("#" + editButton).button({
            icon: "ui-icon-pencil",
            showLabel: false
        });
    };

    var createDeleteButton = function (tabId)
    {
        var deleteButton = "deleteButton-" + tabId;
        var deleteButtonHtml = "<button id=" + deleteButton
                + ">Delete</button>";
        $("#taskButtons-" + tabId).children().last().after(deleteButtonHtml);
        $("#" + deleteButton).button({
            icon: "ui-icon-trash",
            showLabel: false
        });
    };
    
    var getRowTaskTableHtml = function(task)
    {
        var rowHTML = "<tr id=taskId-" + task.taskId + ">";
            rowHTML += "<td>" + task.name + "</td>";
            rowHTML += "<td>" + task.dueDate + "</td>";
            rowHTML += "<td>" + task.numberOfPages + "</td>";
            rowHTML += "<td>" + task.rate + "</td>";
            rowHTML += "<td>" + task.hours + "</td>";
            rowHTML += "<td>" + task.status + "</td>";
            rowHTML += "</tr>"
        return rowHTML;
    }
    return {
        addTask(task, tabId)
        {
            var selector = "#weekTaskTable-" + tabId + " tr";
            var rowHTML = getRowTaskTableHtml(task);
            $(selector).last().after(rowHTML);
        },
        activateWeekTab(tabId)
        {
            var weekTabSelector = "#week";
            weekTabSelector = "[href=" + $.escapeSelector(weekTabSelector)
                    + "-" + tabId + "]";
            panel.setSelectedRow($("#weekTaskTable-" + tabId + " tr").eq(1));
            $(weekTabSelector).click();
        },
        createPanel: function (selector) {
            var panelHtml = "<div id=\"tabs\"></div>";
            panelHtml += "<div class=\"clear\"></div>";
            selector.children().last().after(panelHtml);
        },
        createStatsTab: function (tabId) {

            var statTabHtmlLink =
                    "<li><a id= \"weekStatsLink-" + tabId
                    + "\" href=\"#weekStatsLink-"
                    + tabId + "\">Week Stats</a></li>";

            var statTabHtmlTable = "<div id=\"weekStatsTable-" + tabId + "\">";
            statTabHtmlTable +=
                    "<table><tr><th>Week</th><th>Capacity</th><th>Total Work Done</th>"
                    + "<th>Productivity</th></tr></table></div>";
            $("#week-" + tabId + " ul").children().after(statTabHtmlLink);
            $("#week-" + tabId).children().last().after(statTabHtmlTable);

        },
        createTaskButtons: function (tabId)
        {
            var taskButtons = "taskButtons-" + tabId;
            var taskButtonsDivHtml = "<div id=" + taskButtons
                    + "></div>";
            $("#week-" + tabId).children().first().after(taskButtonsDivHtml);
            createEditButton(tabId);
            createDeleteButton(tabId);
        },
        createTaskTab: function (tabId)
        {
            var taskTabHtmlLink =
                    "<div id=\"taskAndStatLinks-" + tabId
                    + "\"><ul><li><a id= \"weekTaskLink-" + tabId
                    + "\" href=\"#weekTaskLink-"
                    + tabId
                    + "\">Tasks</a></li></ul></div>";
            var taskTabHtmlTable = "<div id=\"weekTaskTable-" + tabId + "\">";
            taskTabHtmlTable +=
                    "<table id=\"t01\"><tr><th>TaskName</th><th>Due Date</th>"
                    + "<th>Number of Pages</th><th>Rate (pages/hr)</th><th>Hours</th><th>Status</th></tr></table></div>";

            $("#week-" + tabId).html(taskTabHtmlLink);
            $("#week-" + tabId).children().last().after(taskTabHtmlTable);
            //$("[id|=weekTaskTable-" + id + "]").removeClass("hide");
            //$("[id|=weekTaskLink-" + id + "]").addClass("active");

        },
        createWeekTab: function (dueWeekDay, tabId)
        {

            var htmlLink = "<li><a href=\"#week-" + tabId + "\">"
                    + dueWeekDay.toDateString()
                    + "</a></li>";

            var html = "<div id=\"week-" + tabId + "\"></div>";



            if ($("#tabs > ul li").length === 0)
            {
                htmlLink = "<ul>" + htmlLink + "</ul>";
                $("#tabs").html(htmlLink);
                $("#tabs > ul").after(html);
                return;
            }


            /*var insertionNode = $("#tabs > ul li").get().reduce(function (
             lowerBoundary, upperBoundary) {
             var lbDate = new Date($(lowerBoundary).text());
             var ubDate = new Date($(upperBoundary).text());
             if (lbDate < dueWeekDay && dueWeekDay < ubDate)
             {
             lowerBoundary = lowerBoundary;
             } else
             {
             lowerBoundary = upperBoundary;
             }
             return lowerBoundary;
             });*/

            var sortedArrayOfLinks = $("#tabs > ul li").get();

            var insertionNode;
            var index = 0;
            while (index < sortedArrayOfLinks.length)
            {
                if (index === sortedArrayOfLinks.length - 1)
                {
                    insertionNode = sortedArrayOfLinks[index];
                    $(insertionNode).after(htmlLink);
                    break;
                }
                var lowerBoundaryDate = new Date($(
                        sortedArrayOfLinks[index]).
                        text());
                var nextIndex = index + 1;
                var upperBoundaryDate = new Date($(
                        sortedArrayOfLinks[nextIndex]).text());
                if (lowerBoundaryDate > dueWeekDay)
                {
                    insertionNode = sortedArrayOfLinks[index];
                    $(insertionNode).before(htmlLink);
                    break;
                }
                if (lowerBoundaryDate < dueWeekDay && dueWeekDay
                        < upperBoundaryDate)
                {
                    insertionNode = sortedArrayOfLinks[index];
                    $(insertionNode).after(htmlLink);
                    break;
                }
                index++;
            }


            $("#tabs > div:last").after(html);

        },
        getSelectedRow()
        {
            return selectedRow;
        },
        initJqueryTabs: function () {

            $("#tabs").tabs().addClass(
                    "ui-tabs-vertical ui-helper-clearfix");
            $("#tabs li").removeClass("ui-corner-top").addClass(
                    "ui-corner-left");
        },
        isWeekTabAlreadyCreated: function (dueWeekDay)
        {
            var weekTab = $("#tabs > ul li a").filter(function () {
                var date = new Date($(this).text());
                return date.getTime() === dueWeekDay.getTime() ? true
                        : false;
            }).get();

            if (weekTab.length !== 0)
            {
                return {
                    isPresent: true,
                    id: $(weekTab[0]).attr("href").slice(6)
                };
            } else
            {
                return {
                    isPresent: false,
                    id: -1
                };
            }
        },
        nextId: function () {
            var nextId = $("#tabs > div").map(function () {
                var id = $(this).attr("id");
                var seq = parseInt(id.slice(5, id.length))
                return seq;
            }).get().reduce(function (max, currentValue) {
                return max > currentValue ? max : currentValue;
            }, 0) + 1;
            return nextId;
        },
        reloadTabs: function () {
            $("#tabs").tabs("refresh");
        },
        setSelectedRow: function(row)
        {
            selectedRow = row;
        },
        updateTaskTable: function(task)
        {
            var rowHtml = getRowTaskTableHtml(task);
            var taskId = "taskId-"+task.taskId;
            var previousSibling = $("#"+taskId).prev();
            $("#"+taskId).remove();
            previousSibling.after(rowHtml);
        },
        removeTaskFromTaskTable: function(task)
        {

            var taskId = "taskId-"+task.taskId;
            $("#"+taskId).remove();
        }
    }
})();


