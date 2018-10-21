"use strict";
var bootstrap = (function(){

    var initializeHandlers = function ()
    {
        taskFormInputHandlers.initializeHandlers();
        panelHandlers.initializeHandlers();
        taskFormEditDialogueHandlers.initializeHandlers();
    }
    var load = function ($)
    {
        controller.load($);
    }
    
    return {
        start: function($)
        {
            load($);
            initializeHandlers();            
        }
    }
})();







