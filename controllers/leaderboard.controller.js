const pool = require("../db/pool").pool

exports.getGlobalLeaderboard = (req, res) => {

	pool.query(`SELECT rank, points, display_name, country FROM leaderboard ORDER BY rank ASC`, (error, data) => {
		if (error)
			res.status(500).send({
				message: error.message || "Some error occurred while retrieving leaderboard."
			});
		else
			res.status(200).json(data.rows);
	});
}

exports.getLeaderboardByCountry = (req, res) => {
	const country = req.params.country_iso_code

	pool.query('SELECT rank, points, display_name, country FROM leaderboard WHERE country = $1 ORDER BY rank ASC', [country], (error, data) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Not found any leaderboard data with country code ${req.params.country_iso_code}.`
				});
			}
			else {
				res.status(500).send({
					message: "Error retrieving leaderboard data with country code " + req.params.country_iso_code
				});
			}
		}
		else
			res.status(200).json(data.rows);
	});
}

exports.createUser = (req, res) => {
	// Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

	const { display_name, country } = req.body

  pool.query('with rows as (INSERT INTO leaderboard (user_id, display_name, points, rank, country) VALUES (uuid_generate_v4(), $1, 0, (SELECT max(rank)+1 from leaderboard), $2) RETURNING user_id, display_name, points, rank) SELECT user_id, display_name, points, rank from rows', [display_name, country], (error, data) => {
		if (error)
			res.status(500).send({
				message: error.message || "Some error occurred while creating the user."
			});
		else
			res.status(201).json(data.rows[0]);
	});
}

exports.getUserByGUID = (req, res) => {
	const user_id = req.params.user_id

	pool.query('SELECT user_id, display_name, points, rank FROM leaderboard WHERE user_id = $1', [user_id], (error, data) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Not found any user with GUID ${req.params.user_id}.`
				});
			}
			else {
				res.status(500).send({
					message: "Error retrieving user with GUID " + req.params.user_id
				});
			}
		}
		else
			res.status(200).json(data.rows[0]);
	});
}

exports.submitScore = (req, res) => {
	// Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
	}
	
	const { score_worth, user_id } = req.body

  pool.query("with rows as (UPDATE leaderboard SET points = (select points + $1 from leaderboard where user_id=$2), timestamp = to_timestamp($3/ 1000.0) WHERE leaderboard.user_id = $2 RETURNING user_id, timestamp) SELECT $1 as score_worth, user_id, (EXTRACT(EPOCH FROM timestamp)) as timestamp from rows", [score_worth, user_id, Date.now()], (error, data) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Not found user with user_id ${req.body.user_id}.`
				});
			}
			else {
				res.status(500).send({
					message: "Error updating user with user_id " + req.body.user_id
				});
			}
		}
		else {
			updateAllRanks();
			res.status(201).json(data.rows[0]);
		}
	});
}

const updateAllRanks = () => {
	pool.query(`UPDATE leaderboard SET rank = r.new_rank FROM (SELECT user_id, RANK() OVER (ORDER BY points DESC) AS new_rank FROM leaderboard) r WHERE leaderboard.user_id = r.user_id`, [], (error, results) => {
    if (error) {
      throw error
    }
  })
}