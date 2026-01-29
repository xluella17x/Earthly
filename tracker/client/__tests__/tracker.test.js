// Import renderDOM function
const { renderDOM } = require('../testUtils/helpers.js');

// Initialise DOM and document
let dom;
let document;

// Test suite for element existence
describe('tracker page element structure', () => {
    // Render a new DOM each time
    beforeEach(async () => {
        dom = await renderDOM('./client/tracker.html');
        document = await dom.window.document;
    });

    // Shut down the DOM after each test to prevent leaking
    afterEach(() => {
        if (dom) {
          dom.window.close();
          dom = null;
        }
    });
      
    // Test navbar
    it('has a navbar', () => {
        const navbar = document.querySelector('.topnav');
        // Existence
        expect(navbar).toBeTruthy();
        // Contains Options
        expect(navbar.innerHTML).toContain('Your Community');
    });

    // Test welcome message
    it('has a welcome message', () => {
        const welcomeMessage = document.querySelector('#welcomeMessage');

        // Existence
        expect(welcomeMessage).toBeTruthy();
    });

    // Test green streak
    it('displays a streak', () => {
        const streakCounter = document.querySelector('.green-streak');

        // Existence
        expect(streakCounter).toBeTruthy();
        // Contains text and correct streak
        expect(streakCounter.textContent).toContain('Days');
    });

    // Test calendar container
    it('displays a calendar container', () => {
        // Fetch calendar container
        const calendarContainer = document.querySelector('#calendar-container');
        const datesContainer = document.querySelector('#dates');
        
        // Expect it to contain space for calendar and dates
        expect(calendarContainer).toBeTruthy();
        expect(datesContainer).toBeTruthy();
    });
    

    // Test postcode impact stats
    it('displays postcode impact stats', () => {
        const postcodeStats = document.querySelector('.info-card h3');
        
        // Existence
        expect(postcodeStats).toBeTruthy();
        // Contains text and correct value for co2 saved
        expect(postcodeStats.innerHTML).toContain('Postcode Impact Stats'); 
    });

    // Test fun fact
    it('displays a fun fact', () => {
        const funFact = document.querySelector('#fun-fact');

        funFact.textContent = 'Tests are great, we should all test!'

        // Existence
        expect(funFact).toBeTruthy();
        // Contains the newly generated quote
        expect(funFact.textContent).toBe('Tests are great, we should all test!');
    })

    // Test that the habit form is hidden
    it('hides the habit form by default', () => {
        const form = document.querySelector('form');
        expect(form.classList.contains('show')).toBe(false);
    });

    // Test that the success popup is hidden
    it('hides success popup by default', () => {
        const popup = document.getElementById('submit-popup');
        expect(popup.classList.contains('show-submit-popup')).toBe(false);
      });      
});