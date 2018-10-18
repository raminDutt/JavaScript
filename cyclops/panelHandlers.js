"use-strict"
var panelHandlers = (function () {

    var initTaskTab = function ()
    {
        $("[id|='weekTasksLink']").click(function () {
            $("[id|='weekTaskTable']").removeClass("hide");
            $("[id|='weekStatsTable']").addClass("hide");
        });
        //Initial Load should display only week stats of latest week
        $("[id|='weekTaskTable']").removeClass("hide");
    }

    var initStatTab = function ()
    {
        $("[id|='weekStatsLink']").click(function () {
            $("[id|='weekStatsTable']").removeClass("hide");
            $("[id|='weekTaskTable']").addClass("hide");
        });
        $("[id|='weekStatsTable']").addClass("hide");
    }

    var initTabTable = function ()
    {
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
        });
    }
    return {
        initializeHandlers: function ()
        {
            initTaskTab();
            initStatTab();
            initTabTable();
        }
    };
})();

