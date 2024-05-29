const db = require('../db');

const activitiesController = {
  getActivities: (req, res) => {
    return res.send(db.activities)
  }
}

module.exports = activitiesController;