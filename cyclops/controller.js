"use strict";
var controller = (function () {

    var loadTaskFormInput = function (selector)
    {
        taskFormInput.load(selector);
    }

    var loadPanel = function (selector)
    {
        var datas = persistenceDAO.getAllTasks();
        var tasks = [];
        //change this to map
        datas.forEach(function (data) {
            var task = new Task();
            task.setState(data);
            tasks[tasks.length] = task;
        });
        panel.initTabs(tasks);
    }

    return {
        load: function (selector)
        {
            loadTaskFormInput(selector);
            loadPanel(selector);


        },
        addTask: function (task) {
            panel.addTabs(task);
            panel.reloadTabs();
            task.save();
        }
    };
})();



