"use strict"
var panel = (function () {
    var calculateDueWeek = function (dueDate)
    {
        //TODO: set option in plugin to modify first day
        //var firstDay = $( "#due_date" ).datepicker( "option", "firstDay" );
        var dueDate = new Date(dueDate);
        var dueWeek = new Date(dueDate);

        dueWeek.setDate(dueWeek.getDate() + (7 - dueWeek.getDay()) % 7);
        return dueWeek;
    }

    return {

        initTabs: function (tasks) {

            var that = this;
            tasks.forEach(function (task) {
                that.addTabs(task);
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

        addTabs: function (task)
        {
            var dueWeekDay = calculateDueWeek(task.dueDate);
            var weekTab = $("#tabs > ul li a").filter(function () {
                var date = new Date($(this).text());
                return date.getTime() === dueWeekDay.getTime() ? true
                        : false;
            }).get();

            if (weekTab.length !== 0)
                return;

            //only create a new week tab if that week has not been generated
            var divId = $("#tabs > div").map(function () {
                var id = $(this).attr("id");
                var seq = parseInt(id.slice(5, id.length))
                return seq;
            }).get().reduce(function (max, currentValue) {
                return max > currentValue ? max : currentValue;
            }) + 1;

            var htmlLink = "<li><a href=\"#week-" + divId + "\">"
                    + dueWeekDay.toDateString()
                    + "</a></li>"


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
                var lowerBoundaryDate = new Date($(sortedArrayOfLinks[index]).
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

            // $("#tabs > ul li:last").after(htmlLink);
            
            var html = "<div id=\"week-" + divId + "\">";
            html += "<h2>Stats Tab + Task Tab</h2>";
            html += "<p>coming soon</p>"
            html += "</div>"
            $("#tabs > div:last").after(html);
            //this.reloadTabs();
        },
        initWeekAndTaskTab: function ()
        {
            $("[id|='weekStatsLink']").click(function () {
                $("[id|='weekStatsTable']").removeClass("hide");
                $("[id|='weekTaskTable']").addClass("hide");
            });

            $("[id|='weekTasksLink']").click(function () {
                $("[id|='weekTaskTable']").removeClass("hide");
                $("[id|='weekStatsTable']").addClass("hide");
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
            $("[id|='weekStatsTable']").removeClass("hide");
            $("[id|='weekTaskTable']").addClass("hide");
        }

    }
})();


