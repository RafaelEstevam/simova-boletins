const db = require('../db');

const employeesService = {
  getEmployees: (req) => {
    const { name, active } = req.query;
    const nameEmployee = name === '' ? false : name;
    const activeEmployee = active === 'true' ? true : active === 'false' ? false : null;

    if (!nameEmployee && activeEmployee === null) {
      return db.employees
    }

    if (nameEmployee && activeEmployee === null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name)
      });
      return employees
    }

    if (!nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.active === activeEmployee
      });
      return employees
    }

    if (nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name) && item.active === activeEmployee
      });
      return employees
    }
  },

  getEmployeeById: (req) => {
    const {id} = req.params
    const employee = db.employees.find((item) => item.id == id);
    if(employee){
      return employee
    };
    return 'Usuário não encontrado'
  }
}

module.exports = employeesService;