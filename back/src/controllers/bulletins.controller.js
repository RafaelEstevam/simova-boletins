const {bulletinsService} = require("../services/bulletins.service");

const bulletinsController = {
  getBulletins: (req, res) => {
    return res.send(bulletinsService.getBulletins(req, res))
  },

  getBulletinsByEmployeeId: (req, res) => {
    return res.send(bulletinsService.getBulletinsByEmployeeId(req, res))
  }
}

module.exports = bulletinsController;