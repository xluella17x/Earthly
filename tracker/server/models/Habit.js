const db = require("../db/connect");

class Habit {
  constructor({
    date,
    user_id,
    postcode,
    commute,
    recycling_bags,
    litter_pick_bags,
    meat_free_day,
    refill_cup,
    second_hand_buys,
  }) {
    this.date = date;
    this.user_id = user_id;
    this.postcode = postcode;
    this.commute = commute;
    this.recycling_bags = recycling_bags;
    this.litter_pick_bags = litter_pick_bags;
    this.meat_free_day = meat_free_day;
    this.refill_cup = refill_cup;
    this.second_hand_buys = second_hand_buys;
  }

  static async create(data) {
    const { date,
        user_id,
        postcode,
        commute,
        recycling_bags,
        litter_pick_bags,
        meat_free_day,
        refill_cup,
        second_hand_buys } = data
    let response = await db.query(
      "INSERT INTO habits_table (date, user_id, postcode, commute, recycling_bags, litter_pick_bags, meat_free_day, refill_cup, second_hand_buys) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;",
      [
        date,
        user_id,
        postcode,
        commute,
        recycling_bags,
        litter_pick_bags,
        meat_free_day,
        refill_cup,
        second_hand_buys
      ],
    );

    return new Habit(response.rows[0]);
  }
}

module.exports = { Habit };
