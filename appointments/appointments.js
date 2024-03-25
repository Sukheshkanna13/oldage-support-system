let appointments = [];

// Load appointments from local storage on page load
window.onload = function() {
    let savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
        displayAppointments();
    }

    // Set default appointment time to current time
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let currentTime = `${hours}:${minutes}`;
    document.getElementById("appointmentTime").value = currentTime;
};

// Display current Indian time
function displayIndianTime() {
    let options = { timeZone: 'Asia/Kolkata' };
    let indianTime = new Date().toLocaleString('en-US', options);
    document.getElementById("currentIndianTime").textContent = `Indian Time: ${indianTime}`;
}

// Update Indian time every second
setInterval(displayIndianTime, 1000);

function addAppointment() {
    let reasonForVisit = document.getElementById("reasonForVisit").value;
    let doctorsName = document.getElementById("doctorsName").value;
    let hospitalName = document.getElementById("hospitalName").value;
    let appointmentDate = document.getElementById("appointmentDate").value;
    let appointmentTime = document.getElementById("appointmentTime").value;

    appointments.push({ reasonForVisit, doctorsName, hospitalName, appointmentDate, appointmentTime });
    displayAppointments();
    saveToLocalStorage();
    clearInputFields();
    setAppointmentReminders(appointmentDate, appointmentTime);
}

function displayAppointments() {
    let appointmentList = document.getElementById("appointmentListItems");
    appointmentList.innerHTML = "";

    appointments.forEach((appointment, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${appointment.reasonForVisit} - Dr. ${appointment.doctorsName} - ${appointment.hospitalName} - Date: ${appointment.appointmentDate}, Time: ${appointment.appointmentTime}`;
        
        // Create delete button for each appointment
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteAppointment(index);
        };
        listItem.appendChild(deleteButton);

        appointmentList.appendChild(listItem);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

function setAppointmentReminders(appointmentDate, appointmentTime) {
    let dateParts = appointmentDate.split("-");
    let year = parseInt(dateParts[0]);
    let month = parseInt(dateParts[1]) - 1; // Month is 0-indexed
    let day = parseInt(dateParts[2]);

    let timeParts = appointmentTime.split(":");
    let hours = parseInt(timeParts[0]);
    let minutes = parseInt(timeParts[1]);

    let appointmentDateTime = new Date(year, month, day, hours, minutes, 0, 0);

    let currentTime = new Date();
    let appointmentTimeInMilliseconds = appointmentDateTime.getTime();
    let oneHourBeforeTimeInMilliseconds = appointmentTimeInMilliseconds - (1 * 60 * 60 * 1000);

    if (oneHourBeforeTimeInMilliseconds > currentTime) {
        setTimeout(() => {
            alert("Upcoming appointment in 1 hour!");
        }, oneHourBeforeTimeInMilliseconds - currentTime);
    }

    if (appointmentTimeInMilliseconds > currentTime) {
        setTimeout(() => {
            alert("Appointment time!");
        }, appointmentTimeInMilliseconds - currentTime);
    }
}

function deleteAppointment(index) {
    appointments.splice(index, 1);
    displayAppointments();
    saveToLocalStorage();
}

function clearInputFields() {
    document.getElementById("reasonForVisit").value = "";
    document.getElementById("doctorsName").value = "";
    document.getElementById("hospitalName").value = "";
    document.getElementById("appointmentDate").value = "";
    // Keep the default appointment time to current time
}
