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
    }


    var loadTaskFormInput = function (selector)
    {
        taskFormInput.load(selector);
    }

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

        panel.addPanel(selector);
        var weeklyTasks = [];
        tasks.forEach(function (task) {
            var dueWeekDay = calculateDueWeek(task);
            var answer = panel.isWeekTabAlreadyCreated(dueWeekDay);
            if (answer === false)
            {
                var id = panel.nextId();
                panel.createWeekTab(dueWeekDay, id);
                panel.createTaskTab(id);
                panel.createStatsTab(id);

            } else
            {
  
            }
        });

        //create divs and table for stats
        //create divs and table for task
        //add task + and update productivity
        panel.initJqueryTabs();
        panel.reloadTabs();
    }

    return {
        load: function (selector)
        {
            loadTaskFormInput(selector);
            loadPanel(selector);

        },
        addTask: function (task) {

            panel.addWeekTab(task);
            panel.reloadTabs();
            task.save();
        }
    };
})();



