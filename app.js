function fetchAllData(object) {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/' + object)
        .then(response => response.json())
        .then(data => console.log(data));
}

function timeTableQuery(object, index, day) {
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/'+ object + index)
        .then(response => response.json())
        .then(data =>
            data.timetableEvents.forEach(function(item, index){
                //finding the day of the item
                let date = new Date(item.date);

                if (date.getDay() == day) {
                    document.write(item.timeStart + ' - ' + item.timeEnd);
                    document.write(' ');
                    if (item.rooms != null && item.teachers != null && item.nameEt != null) {
                        document.write(item.rooms[0].roomCode);
                        document.write(' ');
                        item.teachers.forEach(function(item, index){
                        document.write(item.name + ' ');
                    })
                    document.write(' ');
                    document.write(item.nameEt);
                }
                document.write('<br>');
                }
            })
            )
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

const weekDifference = 36;
let result = getWeekNumber(new Date());
let currentWeek = Math.abs(weekDifference - parseInt(result[1]));

// query, schoolweek number, (0-6) sunday to saturday
timeTableQuery("lessons/rooms=4356&weeks=", currentWeek, 3);

let teachers = fetchAllData("teachers");
let rooms = fetchAllData("rooms");
let groups = fetchAllData("groups");