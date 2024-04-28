let appointments = [];

window.onload = function() {
    let savedAppointments = localStorage.getItem('appointments');
    if (savedAppointments) {
        appointments = JSON.parse(savedAppointments);
        displayAppointments();
    }

    let now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let currentTime = `${hours}:${minutes}`;
    document.getElementById("appointmentTime").value = currentTime;
};

function displayIndianTime() {
    let options = { timeZone: 'Asia/Kolkata' };
    let indianTime = new Date().toLocaleString('en-US', options);
    document.getElementById("currentIndianTime").textContent = `Indian Time: ${indianTime}`;
}

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

    // Popup reminder 1 hour before the event
    if (oneHourBeforeTimeInMilliseconds > currentTime) {
        setTimeout(() => {
            showNotification("Upcoming appointment in 1 hour!");
        }, oneHourBeforeTimeInMilliseconds - currentTime);
    }

    // Popup reminder at the time of the event
    if (appointmentTimeInMilliseconds > currentTime) {
        setTimeout(() => {
            showNotification("Appointment time!");
        }, appointmentTimeInMilliseconds - currentTime);
    }
}

function showNotification(message) {
    if (!("Notification" in window)) {
        alert("Browser does not support notifications");
    } else if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                new Notification(message);
            }
        });
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
