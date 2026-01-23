DROP TABLE IF EXISTS habits_table;

CREATE TABLE habits_table (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    user_id INTEGER NOT NULL,
    postcode VARCHAR(10) NOT NULL,
    commute VARCHAR(50),
    recycling_bags INTEGER DEFAULT 0,
    litter_pick_bags INTEGER DEFAULT 0,
    meat_free_day BOOLEAN DEFAULT FALSE,
    refill_cup BOOLEAN DEFAULT FALSE,
    second_hand_buys INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
