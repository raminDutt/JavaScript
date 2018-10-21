"use strict";
var controller = (function () {

    var calculateDueWeek = function (task)
    {
        //TODO: set option in plugin to modify first day
        //var firstDay = $( "#due_date" ).datepicker( "option", "firstDay" );
        var dueDate = new Date(task.dueDate);
        var dueWeek = new Date(dueDate);

        dueWeek.setDate(dueWeek.getDate() + (7 - dueWeek.getDay()) % 7);
        return dueWeek;
    };

    var loadTaskFormEditDialogueBox = function (selector)
    {
        taskFormEditDialogue.load(selector);
    };

    var loadTaskFormInput = function (selector)
    {
        taskFormInput.load(selector);
    };

    var addTask = function (task) {
        var dueWeekDay = calculateDueWeek(task);
        var answer = panel.isWeekTabAlreadyCreated(dueWeekDay);
        var id = answer.id;
        if (!answer.isPresent)
        {
            id = panel.nextId();
            panel.createWeekTab(dueWeekDay, id);
            panel.createTaskTab(id);
            panel.createStatsTab(id);
            panel.createTaskButtons(id);
        }

        panel.addTask(task, id);
        return id;

    };
    var loadPanel = function (selector)
    {
        var tasks = persistenceDAO.getAllTasks();
        tasks = tasks.map(function (data) {
            var task = new Task();
            task.setState(data);
            return task;
        });

        tasks.sort(function (task1, task2) {
            if (task1.dueDate < task2.dueDate)
                return -1;

            if (task1.dueDate > task2.dueDate)
                return 1;
            return 0;
        });

        panel.createPanel(selector);
        var weeklyTasks = [];
        tasks.forEach(function (task)
        {
            addTask(task);
        });

        panel.initJqueryTabs();
        //on load, the first row table should be selected
        var id = $("#tabs ul li a").attr("href").slice(6);
        panel.setSelectedRow($("#weekTaskTable-" + id + " tr").eq(1));

    };

    return {
        load: function (selector)
        {
            loadTaskFormInput(selector);
            loadPanel(selector);
            loadTaskFormEditDialogueBox(selector);
            return this;
        },
        addTask: function (task) {
            var id = addTask(task);
            panel.reloadTabs();
            panel.activateWeekTab(id);
            task.save();
            return this;
        },
        editTask: function ()
        {

        },
        openEditTaskDialogueBox: function ()
        {
            var selectedRow = panel.getSelectedRow();
            taskFormEditDialogue.open(selectedRow);
        }
    };
})();



