"use strict";

(function ($) {

    $.fn.taskManager = function () {
        bootstrap.initDueDatePicker();
        bootstrap.initTaskValueSelectionBox();
        bootstrap.initAddTaskButton();
        bootstrap.initWeekAndTaskTab();
    }
}
)(jQuery);



