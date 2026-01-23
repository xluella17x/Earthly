const Habit = require('../../../models/Habit');
const db = require('../../../db/connect');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('getStats', () => {
        it('resolves with stats on successful db query', async () => {
            // Arrange
            const testStats = {co2Saved: 1, 'Water Saved': 1, 'Electricity Saved': 1, 'Landfill Saved': 1};
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [testStats] });

            // Act
            const result = await Habit.stats();

            // Assert
            expect(result).not.toBeInstanceOf(Habit);
            expect(result.c02Saved).toBe(1);
            expect(db.query).toHaveBeenDCalledWith("SELECT COUNT(commute) FROM habits_table WHERE commute = '1 - Walk';", [1]);
        })
    })
})