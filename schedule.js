//This function show the meetings list by click the button New Meeting

function newMeeting() {
    var newMeeting = document.getElementById('newMeeting');
    newMeeting.classList.remove('d-none');
}

//This function hidden the meetings list by click the button Cancel
function hideNewMeeting() {
    var newMeeting = document.getElementById('newMeeting');
    newMeeting.classList.add('d-none');
}