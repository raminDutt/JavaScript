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
    var toString = this.name + "~" + this.dueDate + "~" + this.velocity + "~"
            + this.hours + "~" + this.numberOfPages + "~" + this.rate;
    return toString;
}
