"use strict"
var panel = (function () {

    return {
        nextId: function () {
            var nextId = $("#tabs > div").map(function () {
                var id = $(this).attr("id") || "#week-0";
                var seq = parseInt(id.slice(5, id.length))
                return seq;
            }).get().reduce(function (max, currentValue) {
                return max > currentValue ? max : currentValue;
            }) + 1;
            return nextId;
        },
        addPanel: function (selector) {
            var panelHtml = "<div id=\"tabs\"><\div>";
            selector.last().after(panelHtml);
        },
        //to be removed
        loadTabs: function (selector, tasks) {

            var me = this;
            tasks.forEach(function (task) {
                me.addWeekTab(task);
            });
            this.initJqueryTabs();
            this.initWeekAndTaskTab();

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
                return false;
            }
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
                    "<ul><li><a id= \"weekTasksLink-1\" href=\"#weekTasksLink-"
                    + id
                    + "\">Tasks</a></li></ul>";
            var taskTabHtmlTable = "<div id=\"weekTaskTable-" + id + "\">";
            taskTabHtmlTable += "<table id=\"t01\"><tr><th>TaskName</th><th>Due Date</th>"
                    + "<th>Pages</th><th>Rate</th><th>Hours</th><th>Status</th></tr></table></div>";

            $("#week-" + id).html(taskTabHtmlLink);
            $("#week-" + id).children().last().after(taskTabHtmlTable);

        },
        createStatsTab: function (id) {

            var statTabHtmlLink =
                    "<li><a id= \"weekStatsLink-1\" href=\"#weekStatsLink-"
                    + id + "\">Week Stats</a></li>";

            var statTabHtmlTable = "<div id=\"weekStatsTable-" + id + "\">";
            statTabHtmlTable +=
                    "<table><tr><th>Week</th><th>Capacity</th><th>Total Work Done</th>"
                    + "<th>Productivity</th></tr></table></div>";
            $("#week-" + id + " ul").children().after(statTabHtmlLink);
            $("#week-" + id).children().last().after(statTabHtmlTable);
        }


    }
})();


