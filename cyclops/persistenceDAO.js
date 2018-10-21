var persistenceDAO = (function () {

    return {
        save: function (data)
        {
            var encodedString = data["name"] + "~" + data["dueDate"] + "~"
                    + data["velocity"] + "~"
                    + data["hours"] + "~" + data["numberOfPages"] + "~"
                    + data["rate"] + "~" + data["status"];

            var temp = localStorage.cyclops || "";
            if (temp === "")
            {
                localStorage.cyclops = encodedString;
            } else
            {
                localStorage.cyclops = localStorage.cyclops + "|"
                        + encodedString;
            }
        },
        getAllTasks: function ()
        {
            //TODO: Need to handel this case
            var localStorageCylops = localStorage.cyclops || "";
            var datas = [];
            if (localStorageCylops.length !== 0) {
                datas = localStorage.cyclops.split("|").map(function (
                        currentValue) {
                    var encodedTaskAttribute = currentValue.split("~");
                    var data = [];

                    data["name"] = encodedTaskAttribute[0];
                    data["dueDate"] = encodedTaskAttribute[1];
                    data["velocity"] = encodedTaskAttribute[2];
                    data["hours"] = encodedTaskAttribute[3];
                    data["numberOfPages"] = encodedTaskAttribute[4];
                    data["rate"] = encodedTaskAttribute[5];
                    data["status"] = encodedTaskAttribute[6];
                    return data;
                });
            }
            return datas;

        }
    }
})();

