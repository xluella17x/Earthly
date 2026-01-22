const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const popupForm = document.querySelector("form");
const form = document.querySelector("form");

let currentDate = new Date();

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth()

    const firstDay = new Date(currentYear, currentMonth, 0);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}" data-date="${currentYear}-${currentMonth + 1}-${i}">${i}</div>`;
    }

    for (let i = 1; i <= 7 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive" data-date="${currentYear}-${currentMonth + 1}-${i}">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;
}

let selectedDate = null;

datesElement.addEventListener("click", (e) => {
    const dateClicked = e.target.closest(".date");
    selectedDate = dateClicked.dataset.date;
    console.log(selectedDate);
    openPopup();
})

prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
})

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
})

updateCalendar();

function openPopup() {
    popupForm.classList.add("show");
}

function closePopup() {
    popupForm.classList.remove("show");
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const dataObject = Object.fromEntries(formData);
    dataObject.date = selectedDate;

    const jsonFormData = JSON.stringify(dataObject);
    localStorage.setItem('form', jsonFormData);

    console.log(dataObject);

    closePopup();
})