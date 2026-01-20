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
        const calendarContainer = document.querySelector('#calendarContainer');

        // Existence
        expect(calendarContainer).toBeTruthy();

        // Contains habits
        expect(calendarContainer.innerHTML).toContain('Commute')

        // Contains calendar
        expect(calendarContainer.innerHTML).toContain('Calendar')
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

