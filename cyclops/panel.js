"use strict"
var panel = (function () {

    var selectedRow;
    var createEditButton = function (id)
    {
        var editButton = "editButton-" + id;
        var editButtonHtml = "<button id=" + editButton + ">Edit</button>";
        $("#taskButtons-" + id).html(editButtonHtml);
        $("#" + editButton).button({
            icon: "ui-icon-pencil",
            showLabel: false
        });
    };

    var createDeleteButton = function (id)
    {
        var deleteButton = "deleteButton-" + id;
        var deleteButtonHtml = "<button id=" + deleteButton
                + ">Delete</button>";
        $("#taskButtons-" + id).children().last().after(deleteButtonHtml);
        $("#" + deleteButton).button({
            icon: "ui-icon-trash",
            showLabel: false
        });
    };

    return {
        nextId: function () {
            var nextId = $("#tabs > div").map(function () {
                var id = $(this).attr("id");
                var seq = parseInt(id.slice(5, id.length))
                return seq;
            }).get().reduce(function (max, currentValue) {
                return max > currentValue ? max : currentValue;
            },0) + 1;
            return nextId;
        },
        createPanel: function (selector) {
            var panelHtml = "<div id=\"tabs\"></div>";
            panelHtml += "<div class=\"clear\"></div>";
            selector.children().last().after(panelHtml);
        },
        createWeekTab: function (dueWeekDay, id)
        {

            var htmlLink = "<li><a href=\"#week-" + id + "\">"
                    + dueWeekDay.toDateString()
                    + "</a></li>";

            var html = "<div id=\"week-" + id + "\"></div>";



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
        createTaskTab: function (id)
        {
            var taskTabHtmlLink =
                    "<div id=\"taskAndStatLinks-" + id
                    + "\"><ul><li><a id= \"weekTaskLink-" + id
                    + "\" href=\"#weekTaskLink-"
                    + id
                    + "\">Tasks</a></li></ul></div>";
            var taskTabHtmlTable = "<div id=\"weekTaskTable-" + id + "\">";
            taskTabHtmlTable +=
                    "<table id=\"t01\"><tr><th>TaskName</th><th>Due Date</th>"
                    + "<th>Number of Pages</th><th>Rate (pages/hr)</th><th>Hours</th><th>Status</th></tr></table></div>";

            $("#week-" + id).html(taskTabHtmlLink);
            $("#week-" + id).children().last().after(taskTabHtmlTable);
            //$("[id|=weekTaskTable-" + id + "]").removeClass("hide");
            //$("[id|=weekTaskLink-" + id + "]").addClass("active");

        },
        createStatsTab: function (id) {

            var statTabHtmlLink =
                    "<li><a id= \"weekStatsLink-" + id
                    + "\" href=\"#weekStatsLink-"
                    + id + "\">Week Stats</a></li>";

            var statTabHtmlTable = "<div id=\"weekStatsTable-" + id + "\">";
            statTabHtmlTable +=
                    "<table><tr><th>Week</th><th>Capacity</th><th>Total Work Done</th>"
                    + "<th>Productivity</th></tr></table></div>";
            $("#week-" + id + " ul").children().after(statTabHtmlLink);
            $("#week-" + id).children().last().after(statTabHtmlTable);

        },
        createTaskButtons: function (id)
        {
            var taskButtons = "taskButtons-" + id;
            var taskButtonsDivHtml = "<div id=" + taskButtons
                    + "></div>";
            $("#week-" + id).children().first().after(taskButtonsDivHtml);
            createEditButton(id);
            createDeleteButton(id);
        },
        initJqueryTabs: function () {

            $("#tabs").tabs().addClass(
                    "ui-tabs-vertical ui-helper-clearfix");
            $("#tabs li").removeClass("ui-corner-top").addClass(
                    "ui-corner-left");
        },
        reloadTabs: function () {
            $("#tabs").tabs("refresh");
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
        
        addTask(task, id)
        {
            var selector = "#weekTaskTable-" + id + " tr";
            var rowHTML = "<tr>"
            rowHTML += "<td>" + task.name + "</td>";
            rowHTML += "<td>" + task.dueDate + "</td>";
            rowHTML += "<td>" + task.numberOfPages + "</td>";
            rowHTML += "<td>" + task.rate + "</td>";
            rowHTML += "<td>" + task.hours + "</td>";
            rowHTML += "<td>" + task.status + "</td>";
            rowHTML += "</tr>"
            $(selector).last().after(rowHTML);
        },
        activateWeekTab(id)
        {
            var weekTabSelector = "#week";
            weekTabSelector = "[href=" + $.escapeSelector(weekTabSelector)
                    + "-" + id + "]";
            $(weekTabSelector).click();

        },
        setSelectedRow(row)
        {
            selectedRow = row;
        },
        getSelectedRow()
        {
            return selectedRow;
        }
    }
})();


