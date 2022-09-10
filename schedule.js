var buttonNewMeeting = document.getElementById('buttonNewMeeting');
var buttonCancel = document.getElementById('buttonCancel');
var newMeeting = document.getElementById('newMeeting');
var formNewMeeting = document.getElementById('formNewMeeting');
var inputNameParticipant1 = document.getElementById('nameParticipant1');
var inputNameParticipant2 = document.getElementById('nameParticipant2');
var inputMeetingDate = document.getElementById('meetingDate');
var divMessageError = document.getElementById('messageError');
var meetingTable = document.getElementById('meetingTable');


var listMeetings = [];

function deleteMeeting(event) {
    var position = event.target.getAttribute('data-meeting');
    listMeetings.splice(position, 1);
    updateMeetingTable();
}

function updateMeetingTable() {
    if (listMeetings.length === 0) {
        meetingTable.innerHTML = '<tr><td colspan="3">None Meeting</td></tr>';
        return;
    }
    meetingTable.innerHTML = '';
    for (var i = 0; i < listMeetings.length; i++) {
        var meeting = listMeetings[i];
        var line = document.createElement('tr');
        var cellDate = document.createElement('td');
        var cellName1 = document.createElement('td');
        var cellName2 = document.createElement('td');
        var cellActions = document.createElement('td');
        var buttonDelete = document.createElement('button');

        buttonDelete.setAttribute('data-meeting', i);
        buttonDelete.classList.add('btn');
        buttonDelete.classList.add('btn-danger');
        buttonDelete.classList.add('btn-sm');
        buttonDelete.addEventListener('click', deleteMeeting);

        cellDate.innerText = meeting.date;
        cellName1.innerText = meeting.name1;
        cellName2.innerText = meeting.name2;
        buttonDelete.innerText = "Remover";
        cellActions.appendChild(buttonDelete);
        
        line.appendChild(cellDate);
        line.appendChild(cellName1);
        line.appendChild(cellName2);
        line.appendChild(cellActions);
        meetingTable.appendChild(line);
    }
}

function cleanNewMeeting() {
    inputNameParticipant1.value = '';
    inputNameParticipant2.value = '';
    inputMeetingDate.value = '';
    inputNameParticipant1.classList.remove('is-invalid');
    inputNameParticipant2.classList.remove('is-invalid');
    inputMeetingDate.classList.remove('is-invalid');
    divMessageError.classList.add('d-none');
    divMessageError.innerHTML = '';

}

//This function show the meetings list by click the button New Meeting
function showNewMeeting() {
    newMeeting.classList.remove('d-none');
}

//This function hidden the meetings list by click the button Cancel
function hideNewMeeting() {
    newMeeting.classList.add('d-none');
    cleanNewMeeting();
}

function newMeetingValid(nameParticipant1, nameParticipant2, meetingDate) {
        var validateOk = true;
        var erro = '';
        if(nameParticipant1.trim().length === 0){
            erro = 'O nome do primeiro participante é obrigatório!';
            inputNameParticipant1.classList.add('is-invalid');
            validateOk = false;
        } else {
            inputNameParticipant1.classList.remove('is-invalid');
        }
        if(nameParticipant2.trim().length === 0) {
            if(erro.length > 0) {
                erro += '<br>'
            }
            erro += 'O nome do segundo participante é obrigatório!';
            inputNameParticipant2.classList.add('is-invalid');
            validateOk = false;
        } else {
            inputNameParticipant2.classList.remove('is-invalid');
        }
        var timestampMeeting = Date.parse(meetingDate);
        var timestampCurrent = (new Date()).getTime();
        if (isNaN(timestampMeeting) || timestampMeeting < timestampCurrent) {
            if(erro.length > 0) {
                erro += '<br>'
            }
            erro += 'A data do evento é obrigatória e deve estar no futuro!';
            inputMeetingDate.classList.add('is-invalid');
            validateOk = false;
        } else {
            inputMeetingDate.classList.remove('is-invalid');
        }
        if(!validateOk) {
            divMessageError.innerHTML = erro;
            divMessageError.classList.remove('d-none');
        } else {
            divMessageError.classList.add('d-none');
        }

        return validateOk;
}

function createNewMeeting(event) {
    event.preventDefault();
    var nameParticipant1 = inputNameParticipant1.value;
    var nameParticipant2 = inputNameParticipant2.value;
    var meetingDate = inputMeetingDate.value;
    if(newMeetingValid(nameParticipant1, nameParticipant2, meetingDate)) {
        console.log('Meeting is valid!')
        listMeetings.push({
            name1: nameParticipant1,
            name2: nameParticipant2,
            date: new Date(meetingDate),
        });
        updateMeetingTable();
        hideNewMeeting();
    } else {
        console.log('Meeting is invalid!')
    }
}


buttonNewMeeting.addEventListener('click', showNewMeeting);
buttonCancel.addEventListener('click', hideNewMeeting);
formNewMeeting.addEventListener('submit', createNewMeeting);
window.addEventListener('load', updateMeetingTable);