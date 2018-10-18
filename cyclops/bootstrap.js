"use strict";
var bootstrap = {

    initializeHandlers: function ()
    {
        taskFormInputHandlers.initializeHandlers();
        panelHandlers.initializeHandlers();
        

    },
    load: function (selector)
    {
        controller.load(selector);
    }
}







