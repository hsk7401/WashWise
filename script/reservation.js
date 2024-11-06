let selectedDate = null;
let selectedTime = null;
const reservationModal = document.getElementById("reservationModal");
const calendarDates = document.getElementById("calendarDates");
const monthYear = document.getElementById("monthYear");
const confirmationMessage = document.getElementById("confirmationMessage");

const currentDate = new Date();
let displayMonth = currentDate.getMonth();
let displayYear = currentDate.getFullYear();

function toggleTimeSelection() {
    reservationModal.style.display = reservationModal.style.display === "none" ? "block" : "none";
    confirmationMessage.style.display = "none";
    renderCalendar();
}

function renderCalendar() {
    calendarDates.innerHTML = "";
    monthYear.textContent = `${displayYear}.${displayMonth + 1}`;
    
    const firstDay = new Date(displayYear, displayMonth, 1).getDay();
    const lastDate = new Date(displayYear, displayMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDates.appendChild(emptyCell);
    }

    for (let i = 1; i <= lastDate; i++) {
        const dateButton = document.createElement("div");
        dateButton.textContent = i;
        dateButton.classList.add("date");
        dateButton.onclick = () => selectDate(i);
        if (selectedDate && selectedDate.getDate() === i && selectedDate.getMonth() === displayMonth) {
            dateButton.classList.add("selected");
        }
        calendarDates.appendChild(dateButton);
    }
}

function selectDate(day) {
    selectedDate = new Date(displayYear, displayMonth, day);
    renderCalendar();
}

function prevMonth() {
    displayMonth--;
    if (displayMonth < 0) {
        displayMonth = 11;
        displayYear--;
    }
    renderCalendar();
}

function nextMonth() {
    displayMonth++;
    if (displayMonth > 11) {
        displayMonth = 0;
        displayYear++;
    }
    renderCalendar();
}

document.querySelectorAll(".time-slots button").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".time-slots button").forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
        selectedTime = button.textContent;
    });
});

function confirmReservation() {
    if (selectedDate && selectedTime) {
        const dateStr = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
        confirmationMessage.textContent = `예약이 완료되었습니다: ${dateStr} ${selectedTime}`;
        confirmationMessage.style.display = "block";
        reservationModal.style.display = "none";
    } else {
        alert("날짜와 시간을 선택해 주세요.");
    }
}

renderCalendar();


function toggleTimeSelection() {
    reservationModal.style.display = reservationModal.style.display === "none" ? "block" : "none";
    renderCalendar();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && reservationModal.style.display === "block") {
        reservationModal.style.display = "none";
    }
});