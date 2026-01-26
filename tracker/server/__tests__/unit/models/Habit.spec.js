const { Habit } = require ('../../../models/Habit')

const db = require('../../../db/connect')

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('create', () => {
        it('resolves with habit on successful creation', async () => {
            // Arrange
            const habitData = { date: "2026-01-23", user_id: 1, postcode: "B29 9PS", commute: "2 - Cycle", recycling_bags: 1, litter_pick_bags: 1,meat_free_day: false, refill_cup: false, second_hand_buys: 0 }
            jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...habitData, id: 1 }] });
            
            // Act
            const result = await Habit.create(habitData);

            // Assert
            expect(result).toBeInstanceOf(Habit);
            // expect(result).toHaveProperty('id', 1);
            expect(result).toHaveProperty('date', '2026-01-23');
            expect(result).toHaveProperty('postcode', 'B29 9PS');
            expect(result).toHaveProperty('commute', '2 - Cycle');
            expect(result).toHaveProperty('recycling_bags', 1);
            expect(result).toHaveProperty('litter_pick_bags', 1);
            expect(result).toHaveProperty('meat_free_day', false);
            expect(result).toHaveProperty('refill_cup', false);
            expect(result).toHaveProperty('second_hand_buys', 0);
            expect(db.query).toHaveBeenCalledWith(
                "INSERT INTO habits_table (date, user_id, postcode, commute, recycling_bags, litter_pick_bags, meat_free_day, refill_cup, second_hand_buys) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
                [
                    habitData.date,
                    habitData.user_id,
                    habitData.postcode,
                    habitData.commute,
                    habitData.recycling_bags,
                    habitData.litter_pick_bags,
                    habitData.meat_free_day,
                    habitData.refill_cup,
                    habitData.second_hand_buys
                ],
            );
        })
    })
})