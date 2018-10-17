var persistenceDAO = (function () {

    return {
        save: function (data)
        {
            var encodedString = data["name"] + "~" + data["dueDate"] + "~"
                    + data["velocity"] + "~"
                    + data["hours"] + "~" + data["numberOfPages"] + "~"
                    + data["rate"];

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

            var datas = localStorage.cyclops.split("|").map(function (
                    currentValue) {
                var encodedTaskAttribute = currentValue.split("~");
                var data = [];

                data["name"] = encodedTaskAttribute[0];
                data["dueDate"] = encodedTaskAttribute[1];
                data["velocity"] = encodedTaskAttribute[2];
                data["hours"] = encodedTaskAttribute[3];
                data["numberOfPages"] = encodedTaskAttribute[4];
                data["rate"] = encodedTaskAttribute[5];
                return data;
            });

            return datas;

        }
    }
})();

