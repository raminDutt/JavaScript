"use strict";

var Task = (function () {
    var TaskObject = function (id)
    {
        this.taskId = id;
    };

    TaskObject.prototype.getState = function ()
    {
        var data = [];
        data["taskId"] = this.taskId;
        data["name"] = this.name;
        data["dueDate"] = this.dueDate;
        data["velocity"] = this.velocity;
        data["hours"] = this.hours;
        data["numberOfPages"] = this.numberOfPages;
        data["rate"] = this.rate;
        data["status"] = this.status;
        return data;
    };

    TaskObject.prototype.load = function (data)
    {
        this.name = data["name"];
        this.dueDate = data["dueDate"];
        this.velocity = data["velocity"];
        this.hours = data["hours"];
        this.numberOfPages = data["numberOfPages"];
        this.rate = data["rate"];
        this.status = data["status"]
    };

    TaskObject.prototype.toString = function ()
    {
        var toString = "taskId = " + this.taskId + "\n";
        toString += "name = " + this.name + "\n";
        toString += "dueDate = " + this.dueDate + "\n";
        toString += "velocity = " + this.velocity + "\n";
        toString += "hours = " + this.hours + "\n";
        toString += "numberOfPages = " + this.numberOfPages + "\n";
        toString += "rate = " + this.rate + "\n";
        toString += "status = " + this.status + "\n";

        return toString;
    };

    TaskObject.prototype.save = function ()
    {
        //persistenceDAO.save(this.getState())
    };

    var sequencer = (function () {
        var MAX = 10;
        var seed = -1;
        var sequence = 0;
                return {
                    nextId: function ()
                    {
                        sequence++;
                        if(seed === -1 || (sequence+1) > MAX)
                        {
                            seed = taskDAO.getNewSeed();                            
                        }
                        
                        var id = (MAX*seed)+sequence;
                        return id;
                    }
                };
    })();
    var create = function (data)
    { 
        //getID
        var id = sequencer.nextId();
        var task = new TaskObject(id);        
        task.load(data);
        taskDAO.create(task.getState());
        data["taskId"]=task.taskId;
        return task;
    }
    var getTasks = function()
    {
        var datas = taskDAO.getAllTasks();
        datas.map(function(data){
            var task = new TaskObject(data["taskId"]);
            task.load(data);
            return task;
        });
        return datas;
    }
    return {
        create: create,
        getTasks: getTasks
    };
})();


