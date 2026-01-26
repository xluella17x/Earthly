// Import renderDOM function
const { renderDOM } = require('./helpers');

// Initialise DOM and document
let dom;
let document;

// Test suite for element existence
describe('tracker page element structure', () => {
    // Render a new DOM each time
    beforeEach(async () => {
        dom = await renderDOM('./tracker.jsx');
        document = await dom.window.document;
    });

    // Test navbar
    it('has a navbar', () => {
        const navbar = document.querySelector('navbar');

        // Existence
        expect(navbar).toBeTruthy;
        // Contains Options
        expect(navbar.innerHTML).toContain('Your Community');
    });

    // Test welcome message
    it('has a welcome message', () => {
        const welcomeMessage = document.querySelector('#welcomeMessage');

        // Existence
        expect(welcomeMessage).toBeTruthy;
    });

    // Test green streak
    it('displays a streak', () => {
        const streakCounter = document.querySelector('#streakCounter');

        let myStreak = document.getElementById('my-streak');
        myStreak.value = 10;
        
        // Existence
        expect(streakCounter).toBeTruthy;
        // Contains text and correct streak
        expect(streakCounter.innerHTML).toContain('Your Green Streak');
        expect(myStreak.value).toBe(10);
    });

    // Test calendar container
    it('displays a calendar', () => {
        const calendarContainer = document.querySelector('#calendar-container');

        // Existence
        expect(calendarContainer).toBeTruthy();

        // Contains calendar
        expect(calendarContainer.innerHTML).toContain('monthYear')
        expect(calendarContainer.innerHTML).toContain('dates')
    });

    // Test brand container
    it('displays the branding', () => {
        const brandContainer = document.querySelector('#brandContainer')

        // Existence
        expect(brandContainer).toBeTruthy();

        // Contains name
        expect(brandContainer.innerHTML).toContain('Name');

        // Contains logo
        expect(brandContainer.innerHTML).toContain('Logo');

        // Contains slogan
        expect(brandContainer.innerHTML).toContain('Slogan');
    });

    // Test postcode impact stats
    it('displays postcode impact stats', () => {
        const postcodeStats = document.querySelector('#postcodeStats');

        let co2Saved = document.getElementById('co2-saved');
        co2Saved.value = 25;
        
        // Existence
        expect(postcodeStats).toBeTruthy();
        // Contains text and correct value for co2 saved
        expect(postcodeStats.innerHTML).toContain('Postcode Impact Stats');
        expect(co2Saved.value).toBe(25); 
    });

    // Test fun fact
    it('displays a fun fact', () => {
        const funFact = document.querySelector('#funFact');

        funFact.textContent = 'Tests are great, we should all test!'

        // Existence
        expect(funFact).toBeTruthy();
        // Contains the newly generated quote
        expect(funFact.textContent).toBe('Tests are great, we should all test!');
    })
});

// Test onClick functionality for calendar and form submission
describe('tracker page element structure', () => {
    // Render a new DOM each time
    beforeEach(async () => {
        dom = await renderDOM('./tracker.jsx');
        document = await dom.window.document;
    });

    it('presents habit tracking form when a date is clicked', () => {
        const dates = document.getElementById('clickable-date');
        const popupForm = document.querySelector("form");

        // Check that when you click a date the form shows
        dates.click();
        expect(popupForm.classList).toContain('show');
    })

    it('closes the popup form when you click submit', () => {
        const submitButton = document.getElementById('habits-submit-button')
        const popupForm = document.querySelector("form");

        popupForm.classList.add('show');
        // Check that when you click submit the form disappears
        submitButton.click();
        expect(popupForm.classList).not.toContain('show');
    })

    it('displays a success message when you submit the form', () => {
        const submitButton = document.getElementById('habits-submit-button')
        const successPopup = document.getElementById('submit-popup');

        // Check that when you submit the form, the success popup displays
        submitButton.click();
        expect(successPopup.classList).toContain('show-submit-popup')
    })

    it('closes the success popup when you click done', () => {
        const closeButton = document.getElementById('close-success')
        const successPopup = document.getElementById('submit-popup');

        successPopup.classList.add('show-submit-popup');
        // Check that when you submit the form, the success popup displays
        closeButton.click();
        expect(successPopup.classList).not.toContain('show-submit-popup')
    })
});