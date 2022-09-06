var buttonNewMeeting = document.getElementById('buttonNewMeeting');
var buttonCancel = document.getElementById('buttonCancel');
var newMeeting = document.getElementById('newMeeting');
var formNewMeeting = document.getElementById('formNewMeeting');
var inputNameParticipant1 = document.getElementById('nameParticipant1');
var inputNameParticipant2 = document.getElementById('nameParticipant2');
var inputMeetingDate = document.getElementById('meetingDate');

//This function show the meetings list by click the button New Meeting
function showNewMeeting() {
    newMeeting.classList.remove('d-none');
}

//This function hidden the meetings list by click the button Cancel
function hideNewMeeting() {
    newMeeting.classList.add('d-none');
}

function newMeetingValid(nameParticipant1, nameParticipant2, meetingDate) {
        if(nameParticipant1.trim().length === 0){
            inputNameParticipant1.classList.add('is-invalid');
            return false;
        };
        if(nameParticipant2.trim().length === 0) {
            inputNameParticipant2.classList.add('is-invalid');
            return false;
        };
        var timestampMeeting = Date.parse(meetingDate);
        var timestampCurrent = (new Date()).getTime();
        if (isNaN(timestampMeeting) || timestampMeeting < timestampCurrent) {
            inputMeetingDate.classList.add('is-invalid');
            return false;
        }
        return true;
}

function createNewMeeting(event) {
    event.preventDefault();
    var nameParticipant1 = inputNameParticipant1.value;
    var nameParticipant2 = inputNameParticipant2.value;
    var meetingDate = inputMeetingDate.value;
    if(newMeetingValid(nameParticipant1, nameParticipant2, meetingDate)) {
        console.log('Meeting is valid!')
    } else {
        console.log('Meeting is invalid!')
    }
}


buttonNewMeeting.addEventListener('click', showNewMeeting);
buttonCancel.addEventListener('click', hideNewMeeting);
formNewMeeting.addEventListener('submit', createNewMeeting);