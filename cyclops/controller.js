"use strict";
var controller = (function () {

    var addTaskToPanel = function (task) {
        var dueWeekDay = calculateDueWeek(task.dueDate);
        var answer = panel.isWeekTabAlreadyCreated(dueWeekDay);
        var tabId = answer.id;
        if (!answer.isPresent)
        {
            tabId = panel.nextId();
            panel.createWeekTab(dueWeekDay, tabId);
            panel.createTaskTab(tabId);
            panel.createStatsTab(tabId);
            panel.createTaskButtons(tabId);
        }

        panel.addTask(task, tabId);
        return tabId;

    };
    var calculateDueWeek = function (dueDate)
    {
        //TODO: set option in plugin to modify first day
        //var firstDay = $( "#due_date" ).datepicker( "option", "firstDay" );
        var dD = new Date(dueDate);
        var dueWeek = new Date(dD);

        dueWeek.setDate(dueWeek.getDate() + (7 - dueWeek.getDay()) % 7);
        return dueWeek;
    };

    var getSelectedRowTaskId = function ()
    {
        var selectedRow = panel.getSelectedRow();
        var taskId = $(selectedRow).attr("id").slice(7);
        return taskId;
    }
    var loadPanel = function (selector)
    {
        var tasks = Task.getTasks();
        panel.createPanel(selector);
        if (tasks.length === 0)
        {
            var dueWeekDay = calculateDueWeek(new Date());
            var tabId = panel.nextId();
            panel.createWeekTab(dueWeekDay, tabId);
            panel.createTaskTab(tabId);
            panel.createStatsTab(tabId);
            panel.createTaskButtons(tabId);
        } else
        {
            tasks.sort(function (task1, task2) {
                if (task1.dueDate < task2.dueDate)
                    return -1;

                if (task1.dueDate > task2.dueDate)
                    return 1;
                return 0;
            });
            var weeklyTasks = [];
            tasks.forEach(function (task)
            {
                addTaskToPanel(task);
            });
        }

        panel.initJqueryTabs();
        //on load, the first week tab, task tab and first row table should be selected
        var weekTaskTableId = $("#tabs ul li a").attr("href").slice(6);
        panel.setSelectedRow($("#weekTaskTable-" + weekTaskTableId + " tr").eq(
                1));

    };

    var loadTaskFormEditDialogueBox = function (selector)
    {
        taskFormEditDialogue.load(selector);
    };

    var loadTaskFormInput = function (selector)
    {
        taskFormInput.load(selector);
    };
    return {
        load: function (selector)
        {
            loadTaskFormInput(selector);
            loadPanel(selector);
            loadTaskFormEditDialogueBox(selector);
            return this;
        },
        addTask: function (data) {
            var task = Task.create(data);
            var tabId = addTaskToPanel(task);
            panel.reloadTabs();
            panel.activateWeekTab(tabId);

            return this;
        },
        editTask: function (data)
        {
            var task = Task.getTask(data.taskId);
            var old = calculateDueWeek(task.dueDate);
            task.save(data);
            var newDueDate = calculateDueWeek(task.dueDate);
            if (old.getTime() === newDueDate.getTime())
            {
                panel.updateTaskTable(task);
            } else
            {
                panel.removeTaskFromTaskTable(task.taskId);
                addTaskToPanel(task);
                panel.reloadTabs();
            }
            return this;
        },
        openEditTaskDialogueBox: function ()
        {
            var taskId = getSelectedRowTaskId();
            var task = Task.getTask(taskId);
            taskFormEditDialogue.open(task);
            return taskId;
        },
        deleteTask: function ()
        {
            var taskId = getSelectedRowTaskId();
            Task.delete(taskId);
            panel.removeTaskFromTaskTable(taskId);
            panel.reloadTabs();
            //update UI
        }
    };
})();



