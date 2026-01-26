const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const popupForm = document.querySelector("form");
const form = document.querySelector("form");
const successPopup = document.getElementById('submit-popup');
const closeSuccessBtn = document.getElementById('close-success');

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
        datesHTML += `<div class="date ${activeClass}" id="clickable-date" data-date="${currentYear}-${currentMonth + 1}-${i}">${i}</div>`;
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

form.addEventListener('submit', async (e) => {
function openSuccessPopup() {
    successPopup.classList.add('show-submit-popup');
}

function closeSuccessPopup() {
    successPopup.classList.remove('show-submit-popup');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const dataObject = Object.fromEntries(formData);
    dataObject.date = selectedDate;

    const jsonFormData = JSON.stringify(dataObject);
    localStorage.setItem('form', jsonFormData);

    const form = new FormData(e.target);
    try {
        const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: dataObject.date,
            user_id: 1, 
            postcode: 'B29 6EZ', 
            commute: dataObject.commute, 
            recycling_bags: dataObject.no_of_boxes, 
            litter_pick_bags: dataObject.no_of_bags, 
            meat_free_day: dataObject.meat_free, 
            refill_cup: dataObject.refill_cup, 
            second_hand_buys: dataObject.no_of_purchases
            }),
        };
        const response = await fetch("http://localhost:3000/tracker", options);
        const responseData = await response.json();

        if (responseData.success) {
            popupForm.reset();
        }
        } catch (err) {
            console.log(err);
        }

    console.log(dataObject);

    closePopup();
})

    openSuccessPopup();
})

closeSuccessBtn.addEventListener('click', (e) => {
    closeSuccessPopup();
})
