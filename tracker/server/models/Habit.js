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

  static async stats() {
      // Collect commute statistics
      let walkers = await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '1 - Walk';")
      let cyclists = await db.query( "SELECT COUNT(commute) FROM habits_table WHERE commute = '2 - Cycle';")
      let drivers = await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '3 - Car';")
      let busUsers = await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '4 - Bus';")
      let trainUsers = await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '5 - Train';")

      // Collect recycling statistics
      let recyclingCount = await db.query("SELECT SUM(recycling_bags) FROM habits_table;")

      // Collect litter pick stats
      let litterSum = await db.query("SELECT SUM(litter_pick_bags) FROM habits_table;")

      // Collect meat-free day stats
      let meatFreeDays = await db.query("SELECT COUNT(meat_free_day) FROM habits_table WHERE meat_free_day = 'TRUE';")

      // Collect refill cups data
      let refillCups = await db.query("SELECT COUNT(refill_cup) FROM habits_table WHERE refill_cup = 'TRUE';")

      // Collect second hand buy data
      let secondHandBuys = await db.query("SELECT SUM(second_hand_buys) FROM habits_table;")

      // Calculate co2 saved
      const co2Saved = 2.28*(walkers+cyclists) + 0.96*busUsers + 1.66*trainUsers + 0.51*recyclingCount + 0.27*meatFreeDays + 0.02*refillCups + 1.8*secondHandBuys;

      // Calculate water saved
      const waterSaved = 20.9*recyclingCount + 1561*meatFreeDays + refillCups + 5000*secondHandBuys;

      // Calculate electricity saved
      electricitySaved = 84.1*recyclingCount + 3.3*meatFreeDays + 4.2*secondHandBuys;

      // Calculate landfill saved
      landfillSaved = 12.5*recyclingCount + 0.02*refillCups + 0.3*secondHandBuys;

      // Return an object full of the statistics to be displayed on tracker page
      return {
        'co2Saved': co2Saved,
        'Water Saved': waterSaved,
        'Electricity Saved': electricitySaved,
        'Landfill Saved': landfillSaved,
      }   
  }
}

module.exports = { Habit };
