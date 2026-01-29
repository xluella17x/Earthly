const express = require('express');
const router = express.Router();
const db = require('../../backend/server/db/connect');

const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email_address, password, postcode, community } = req.body;

    if (!first_name || !last_name || !email_address || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check existing user
    const existingUser = await db.query(
      'SELECT id FROM user_table WHERE email_address = $1',
      [email_address]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    const result = await db.query(
      `INSERT INTO user_table 
       (first_name, last_name, email_address, password, postcode, community, streak_count)
       VALUES ($1, $2, $3, $4, $5, $6, 0)
       RETURNING *`,
      [first_name, last_name, email_address, password, postcode, community]
    );

    res.status(201).json({ message: "Signup successful", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email_address, password } = req.body;

    console.log("Login attempt for email:", email_address);

    if (!email_address || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }

    const result = await db.query(
      'SELECT * FROM user_table WHERE email_address = $1',
      [email_address]
    );

    const user = result.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    if (password != user.password) return res.status(401).json({ error: "Invalid password" });

    res.json({
      id: user.id,
      first_name: user.first_name,
      email_address: user.email_address,
      community: user.community
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
