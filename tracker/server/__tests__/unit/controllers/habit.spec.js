const habitsController = require('../../../controllers/habit')
const { Habit } = require('../../../models/Habit')

// Mocking response methods
const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()

// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(() => ({ 
  send: mockSend, 
  json: mockJson, 
  end: mockEnd 
}));

const mockRes = { status: mockStatus };

describe('habits controller', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        it('should return a new habit with a 200 status code', async () => {
            let testHabit = { date: "2026-01-23", user_id: 1, postcode: "B29 9PS", commute: "2 - Cycle", recycling_bags: 1, litter_pick_bags: 1,meat_free_day: false, refill_cup: false, second_hand_buys: 0 }
            const mockReq = { body: testHabit }

            jest.spyOn(Habit, 'create').mockResolvedValue(new Habit(testHabit))

            await habitsController.create(mockReq, mockRes)
        })
    })
})