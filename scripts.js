let medicationSchedule = [];

// Load medication schedule from local storage on page load
window.onload = function() {
    let savedSchedule = localStorage.getItem('medicationSchedule');
    if (savedSchedule) {
        medicationSchedule = JSON.parse(savedSchedule);
        displaySchedule();
        setMedicationReminders();
    }
};

function addMedicationSchedule() {
    let medicationName = document.getElementById("medicationName").value;
    let dosage = document.getElementById("dosage").value;
    let schedule = document.getElementById("schedule").value;
    let foodPreference = document.getElementById("foodPreference").value;

    medicationSchedule.push({ medicationName, dosage, schedule, foodPreference });
    displaySchedule();
    clearInputFields();
    setMedicationReminders();
    saveToLocalStorage();
}

function displaySchedule() {
    let scheduleList = document.getElementById("scheduleList");
    scheduleList.innerHTML = "";

    medicationSchedule.forEach((item, index) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.medicationName}: ${item.dosage} - ${item.schedule} - ${item.foodPreference}`;
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            deleteSchedule(index);
        };

        listItem.appendChild(deleteButton);
        scheduleList.appendChild(listItem);
    });
}

function clearInputFields() {
    document.getElementById("medicationName").value = "";
    document.getElementById("dosage").value = "";
    document.getElementById("schedule").value = "";
    document.getElementById("foodPreference").value = "";
}

function deleteSchedule(index) {
    medicationSchedule.splice(index, 1);
    displaySchedule();
    saveToLocalStorage();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function getCurrentIndianTime() {
    let options = { timeZone: 'Asia/Kolkata' };
    let indianTime = new Date().toLocaleString('en-US', options);
    document.getElementById("indianTime").textContent = `Indian Time: ${indianTime}`;
}

getCurrentIndianTime();
setInterval(getCurrentIndianTime, 1000);

function setMedicationReminders() {
    medicationSchedule.forEach(item => {
        let scheduleTime = item.schedule.toUpperCase();
        let timeParts = scheduleTime.split(" ");
        let time = timeParts[0].split(":");
        let hours = parseInt(time[0]);
        let minutes = parseInt(time[1]);
        let isPM = timeParts[1] === "PM";

        if (isPM && hours !== 12) {
            hours += 12;
        } else if (!isPM && hours === 12) {
            hours = 0;
        }

        let now = new Date();
        let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

        if (reminderTime > now) {
            let timeDifference = reminderTime - now;
            setTimeout(() => {
                alert(`Reminder: Take ${item.dosage} of ${item.medicationName} ${item.foodPreference} at ${item.schedule}`);
            }, timeDifference);
        }
    });
}

function saveToLocalStorage() {
    localStorage.setItem('medicationSchedule', JSON.stringify(medicationSchedule));
}
