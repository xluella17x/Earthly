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
    
    if (!data.commute) { 
      throw new Error("Commute is missing") 
    }

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
      let walkers = Number((await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '1 - Walk';")).rows[0].count);
      let cyclists = Number((await db.query( "SELECT COUNT(commute) FROM habits_table WHERE commute = '2 - Cycle';")).rows[0].count);
      let busUsers = Number((await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '4 - Bus';")).rows[0].count);
      let trainUsers = Number((await db.query("SELECT COUNT(commute) FROM habits_table WHERE commute = '5 - Train';")).rows[0].count);

      // Collect recycling statistics
      let recyclingCount = Number((await db.query("SELECT SUM(recycling_bags) FROM habits_table;")).rows[0].sum);

      // Collect meat-free day stats
      let meatFreeDays = Number((await db.query("SELECT COUNT(meat_free_day) FROM habits_table WHERE meat_free_day = TRUE;")).rows[0].count);

      // Collect refill cups data
      let refillCups = Number((await db.query("SELECT COUNT(refill_cup) FROM habits_table WHERE refill_cup = TRUE;")).rows[0].count);

      // Collect second hand buy data
      let secondHandBuys = Number((await db.query("SELECT SUM(second_hand_buys) FROM habits_table;")).rows[0].sum);

      // Calculate co2 saved
      const co2Saved = Math.round(2.28*(walkers+cyclists) + 0.96*busUsers + 1.66*trainUsers + 0.51*recyclingCount + 0.27*meatFreeDays + 0.02*refillCups + 1.8*secondHandBuys);

      // Calculate water saved
      const waterSaved = Math.round(20.9*recyclingCount + 1561*meatFreeDays + refillCups + 5000*secondHandBuys);

      // Calculate electricity saved
      const electricitySaved = Math.round(84.1*recyclingCount + 3.3*meatFreeDays + 4.2*secondHandBuys);

      // Calculate landfill saved
      const landfillSaved = Math.round(12.5*recyclingCount + 0.02*refillCups + 0.3*secondHandBuys);

      // Return an object full of the statistics to be displayed on tracker page
      return {
        'co2 Saved': co2Saved,
        'Water Saved': waterSaved,
        'Electricity Saved': electricitySaved,
        'Landfill Saved': landfillSaved,
      }   
    }
}

module.exports = { Habit };
