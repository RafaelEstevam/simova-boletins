const db = require('./db');
const employeesController = require('./controllers/employees.controller');
const bulletinsController = require('./controllers/bulletins.controller');
const activitiesController = require('./controllers/activities.controller');

const {Router} = require('express');
const routes = Router();

routes.get('/', (req, res) => {
  return res.send('Hello World')
})

routes.get('/employees', employeesController.getEmployees);
routes.get('/employees/:id', employeesController.getEmployeeById);

routes.get('/bulletins', bulletinsController.getBulletins);
routes.get('/bulletins/employees/:id', bulletinsController.getBulletinsByEmployeeId);

routes.get('/appointments', activitiesController.getActivities);

module.exports = routes;