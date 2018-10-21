var taskDAO = (function () {

    return {
        create: function (data)
        {
            var encodedString = data["taskId"] + "~" + data["name"] + "~"
                    + data["dueDate"] + "~"
                    + data["velocity"] + "~"
                    + data["hours"] + "~" + data["numberOfPages"] + "~"
                    + data["rate"] + "~" + data["status"];

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
        getAllTasks: function ()
        {
            var localStorageCylops = localStorage.taskManagerTasks || "";
            var datas = [];
            if (localStorageCylops.length !== 0) {
                datas = localStorage.taskManagerTasks.split("|").map(function (
                        currentValue) {
                    var encodedTaskAttribute = currentValue.split("~");
                    var data = [];
                    data["id"] = encodedTaskAttribute[0];
                    data["name"] = encodedTaskAttribute[1];
                    data["dueDate"] = encodedTaskAttribute[2];
                    data["velocity"] = encodedTaskAttribute[3];
                    data["hours"] = encodedTaskAttribute[4];
                    data["numberOfPages"] = encodedTaskAttribute[5];
                    data["rate"] = encodedTaskAttribute[6];
                    data["status"] = encodedTaskAttribute[7];
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
        save: function (data)
        {

        },
    }
})();

