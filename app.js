const teacherList = document.getElementById('teacherList');
const roomList = document.getElementById('roomList');
const groupList = document.getElementById('groupList');
const searchBar = document.getElementById('searchBar');

let teachers;
let groups;
let rooms;
let weeks;

(async () => {
    let response = await fetch('https://be.ta19heinsoo.itmajakas.ee/api/teachers');
    teachers = await response.json();
    let response2 = await fetch('https://be.ta19heinsoo.itmajakas.ee/api/rooms');
    rooms = await response2.json();
    let response3 = await fetch('https://be.ta19heinsoo.itmajakas.ee/api/groups');
    groups = await response3.json();
    let response4 = await fetch('https://be.ta19heinsoo.itmajakas.ee/api/weeks');
    weeks = await response4.json();
})()

function timeTableQuery(object, index, day) {
    console.log("works");
    fetch('https://be.ta19heinsoo.itmajakas.ee/api/'+ object + index)
        .then(response => response.json())
        .then(data =>
            data.timetableEvents.forEach(function(item){
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

setTimeout(() => {

    function findWeek(){
        let today = Date.parse(new Date());
        let result;
        weeks.forEach(function(item) {
            if (Date.parse(item.start) < today && Date.parse(item.end) > today) {
                result = item.weekNr;
            }
        })

        return result;
    }

    

    function findResults(object, week, day) {
        teacherList.innerHTML = "";
        roomList.innerHTML = "";
        groupList.innerHTML = "";

        teachers.forEach(function(item){    
            if (item.firstname.includes(object) || item.lastname.includes(object)){
                teacherList.innerHTML += `
                    <li>
                        <button onclick='timeTableQuery("lessons/teachers=${item.teacherId}&weeks=",${week}, ${day})'>
                            ${item.firstname} ${item.lastname}
                        </button>
                    </li>`;
            }
        }
        );
        
        rooms.forEach(function(item){
            rooms.push(item);
            if (item.code.includes(object)){
                roomList.innerHTML += `
                    <li>
                        <button onclick='timeTableQuery("lessons/rooms=${item.roomId}&weeks=",${week}, ${day})'>
                            ${item.code}
                        </button>
                    </li>`;
            }
        }
        );
        
        groups.forEach(function(item){
            groups.push(item);
            if (item.groupCode.includes(object)){
                groupList.innerHTML += `
                    <li>
                        <button onclick='timeTableQuery("lessons/groups=${item.groupId}&weeks=",${week}, ${day})'>
                            ${item.groupCode}
                        </button>
                    </li>`;
            }
        }
        );
    }

    let currentWeek = findWeek();
    let today = new Date();
    let weekDay = today.getDay();

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value;
        findResults(searchString, currentWeek, weekDay);
    });
    

}, 1500);
