"use-strict"
var panelHandlers = (function () {

    var initActivateTabHandler = function ()
    {
        $("#tabs").tabs({
            activate: function (event, ui) {
                var id = $(ui.newTab).children().first().attr("href").slice(6);
                var taskTabSelector = "[id=weekTaskLink-" + id + "]";
                panel.setSelectedRow($("#weekTaskTable-" + id + " tr").eq(1));
                $(taskTabSelector).click();
            }
        });
    };

    var initEditTaskButtonHandler = function ()
    {
        $(document).on("click", "[id|='editButton']", (function () {
            controller.openEditTaskDialogueBox();
        }));
    };

    var initDeleteTaskButtonHandler = function ()
    {
        $(document).on("click", "[id|='deleteButton']", (function () {
            controller.openEditTaskDialogueBox();
        }));

    };

    var initStatTabHandler = function ()
    {
        $(document).on("click", "[id|='weekStatsLink']", (function () {
            $("[id|='weekStatsTable']").removeClass("hide");
            $("[id|='weekTaskLink']").removeClass("active");
            $("[id|='weekTaskTable']").addClass("hide");
            $("[id|='weekStatsLink']").addClass("active");
        }));
        $("[id|='weekStatsTable']").addClass("hide");
    };
    var initTaskTabHandler = function ()
    {
        $(document).on("click", "[id|='weekTaskLink']", (function () {
            $("[id|='weekTaskTable']").removeClass("hide");
            $("[id|='weekStatsLink']").removeClass("active");
            $("[id|='weekStatsTable']").addClass("hide");
            $("[id|='weekTaskLink']").addClass("active");
        }));
        //Initial Load should display only week stats of latest week
        $("[id|='weekTaskTable']").removeClass("hide");
        $("[id|='weekTaskLink']").addClass("active");
    };
    var initTabTableHandler = function ()
    {
        $(document).on("click", "tr", (function ()
        {
            panel.setSelectedRow(this);
            var isRowSelected = $(this).attr("class") || "";
            if (isRowSelected === "")
            {
                $("tr").removeClass("rowSelected");
                $(this).addClass("rowSelected");
            } else
            {
                $(this).toggleClass("rowSelected");
            }
        }));
    };
    
    return {
        initializeHandlers: function ()
        {
            initTaskTabHandler();
            initStatTabHandler();
            initActivateTabHandler();
            initTabTableHandler();
            initEditTaskButtonHandler();
            initDeleteTaskButtonHandler();

        }
    };
})();

