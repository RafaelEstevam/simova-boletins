const employeesService = require('../services/employees.service');

const employeesController = {
  getEmployees: (req, res) => {
    return res.send(employeesService.getEmployees(req, res))
  },

  getEmployeeById: (req, res) => {
    return res.send(employeesService.getEmployeeById(req, res))
  }
}

module.exports = employeesController;