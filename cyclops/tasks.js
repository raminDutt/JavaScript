"use strict";
var Task = function ()
{
    //taskID would be nice
    this.name = "Poffy";
    this.dueDate = "";
    this.velocity = 0;
    this.hours = 0;
    this.numberOfPages = 0;
    this.rate = 0;
}

Task.prototype.toString = function ()
{
    var toString = "name = " + this.name + "\n";
    toString += "dueDate = " + this.dueDate + "\n";
    toString += "velocity = " + this.velocity + "\n";
    toString += "hours = " + this.hours + "\n";
    toString += "numberOfPages = " + this.numberOfPages + "\n";
    toString += "rate = " + this.rate + "\n";

    return toString;
}

Task.prototype.getState = function ()
{
    var data = [];
    data["name"] = this.name;
    data["dueDate"] = this.dueDate;
    data["velocity"] = this.velocity;
    data["hours"] = this.hours;
    data["numberOfPages"] = this.numberOfPages;
    data["rate"] = this.rate;
    return data;
}

Task.prototype.setState = function (data)
{

    this.name = data["name"];
    this.dueDate = data["dueDate"];
    this.velocity =  data["velocity"];
    this.hours = data["hours"];
    this.numberOfPages = data["numberOfPages"];
    this.rate = data["rate"];
    return task;

}

Task.prototype.save = function()
{
    persistenceDAO.save(this.getState())
}