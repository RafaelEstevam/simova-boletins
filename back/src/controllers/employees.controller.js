const db = require('../db');

const employeesController = {
  getEmployees: (req, res) => {
    const { name, active } = req.query;
    const nameEmployee = name === '' ? false : name;
    const activeEmployee = active === 'true' ? true : active === 'false' ? false : null;

    if (!nameEmployee && activeEmployee === null) {
      return res.send(db.employees)
    }

    if (nameEmployee && activeEmployee === null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name)
      });
      return res.send(employees)
    }

    if (!nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.active === activeEmployee
      });
      return res.send(employees)
    }

    if (nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name) && item.active === activeEmployee
      });
      return res.send(employees)
    }
  },

  getEmployeeById: (req, res) => {
    const {id} = req.params
    const employee = db.employees.find((item) => item.id == id);
    if(employee){
      return res.send(employee)
    };
    return res.status(400).send('Usuário não encontrado');
  }
}

module.exports = employeesController;