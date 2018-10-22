var taskDAO = (function () {

    var encodeData = function (data)
    {
        var encodedString = "taskId=" + data["taskId"] + "~" + data["name"]
                + "~"
                + data["dueDate"] + "~"
                + data["hours"] + "~" + data["numberOfPages"] + "~"
                + data["rate"] + "~" + data["status"];
        return encodedString;
    }

    var decodeData = function (encodedTask)
    {
        var data = [];
        var encodedTaskFields = encodedTask.split("~");
        data["taskId"] = encodedTaskFields[0].slice(7);
        data["name"] = encodedTaskFields[1];
        data["dueDate"] = encodedTaskFields[2];
        data["hours"] = encodedTaskFields[3];
        data["numberOfPages"] = encodedTaskFields[4];
        data["rate"] = encodedTaskFields[5];
        data["status"] = encodedTaskFields[6];
        return data;
    };
    return {
        create: function (data)
        {
            var encodedString = encodeData(data);

            var temp = localStorage.taskManagerTasks || "";
            if (temp === "")
            {
                localStorage.taskManagerTasks = encodedString;
            } else
            {
                localStorage.taskManagerTasks = localStorage.taskManagerTasks
                        + "|"
                        + encodedString;
            }
        },
        getTask: function (taskId) {
            var encodedTasks = localStorage.taskManagerTasks.split("|").filter(
                    function (encodedTask) {
                        var id = "taskId=" + taskId + "~";
                        return encodedTask.includes(id);
                    });

            var data = decodeData(encodedTasks[0]);
            return data;
        },
        getAllTasks: function ()
        {
            var localStorageCylops = localStorage.taskManagerTasks || "";
            var datas = [];
            if (localStorageCylops.length !== 0) {
                datas = localStorage.taskManagerTasks.split("|").map(function (
                        encodedTask) {
              
                    var data = decodeData(encodedTask);
                    return data;
                });
            }
            return datas;

        },
        getNewSeed: function ()
        {
            var seed = localStorage.taskManagerSeed || "-1";
            seed = parseInt(seed) + 1;
            localStorage.taskManagerSeed = seed;
            return seed;

        },
        update: function (data)
        {
            var encodedData = encodeData(data);
            console.log("data taskId=" + data["taskId"]);
            console.log("data= " + data.toString());
            console.log("encodedData= "+encodedData);
            var encodedTasks = localStorage.taskManagerTasks;
            var updatedEncodedTask = encodedTasks.split("|").map(function (
                    encodedTask) {
                var id = "taskId=" + data["taskId"] + "~";
                return encodedTask.includes(id) ? encodedData : encodedTask;
            }).join("|");

            localStorage.taskManagerTasks = updatedEncodedTask;
            console.log("encodedTasks=" + encodedTasks);
            console.log("updatedEncodedTask=" + updatedEncodedTask);

        }
    }
})();

