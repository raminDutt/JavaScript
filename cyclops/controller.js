"use strict";
var controller = (function () {

    var calculateDueWeek = function (dueDate)
    {
        //TODO: set option in plugin to modify first day
        //var firstDay = $( "#due_date" ).datepicker( "option", "firstDay" );

        var dueDate = new Date(dueDate);
        var dueWeek = new Date(dueDate);

        dueWeek.setDate(dueWeek.getDate() + 7 - dueWeek.getDay());
        return dueWeek;
    }

    var addTabs = function (task)
    {
        var dueWeekDay = calculateDueWeek(task.dueDate);
        var weekTab = $("#tabs > ul li a").filter(function(){
            console.log($(this).val());
             console.log($(this).text());
             return $(this).text() === dueWeekDay.toDateString() ? true : false;
        }).get();
        
        if(weekTab.length !== 0)
            return;
        
        //only create a new week tab if that week has not been generated
        var divId = $("#tabs > div").map(function () {
            var id = $(this).attr("id");
            var seq = parseInt(id.slice(5, id.length))
            return seq;
        }).get().reduce(function(max, currentValue){
            return max > currentValue ? max : currentValue;
        }) + 1;

        var htmlLink = "<li><a href=\"#week-" + divId + "\">"
                + dueWeekDay.toDateString()
                + "</a></li>"
        $("#tabs > ul li:last").after(htmlLink);

        var html = "<div id=\"week-" + divId + "\">";
        html += "<h2>Stats Tab + Task Tab</h2>";
        html += "<p>coming soon</p>"
        html += "</div>"

        $("#tabs > div:last").after(html);
        $("#tabs").tabs("refresh");
        
        
    }


    return {
        addTask: function (task) {
            addTabs(task);

            //Store Task
            var temp = localStorage.cyclops || "";
            if (temp === "")
            {
                localStorage.cyclops = task.toString();
            } else
            {
                localStorage.cyclops = localStorage.cyclops + "|"
                        + task.toString();
            }

        }
    };
})();



