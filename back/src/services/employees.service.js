const db = new Object(require('../db'));

const getLastBulletinsByEmployee = (employees) => {

  const bulletins = db.bulletins;
  const activities = db.activities;
  
  employees.map((employee) => {
    const bulletinsList = bulletins.filter((bulletin) =>  bulletin.employeeId == employee.id);
    const lastBulleting = bulletinsList[bulletinsList.length - 1];
    const lastAppointment = lastBulleting ? lastBulleting.appointments[lastBulleting.appointments.length - 1] : {};
    const lastActivity = activities.find((activity) => activity.id === lastAppointment.activityId);

    const updates = {
      lastBulleting,
      lastAppointment,
      lastActivity
    }

    employee.updates = JSON.stringify(updates);
    return employee;
  })


  return employees
}

const employeesService = {
  getEmployees: (req) => {
    const { name, active } = req.query;
    const nameEmployee = name === '' ? false : name;
    const activeEmployee = active === 'true' ? true : active === 'false' ? false : null;

    if (!nameEmployee && activeEmployee === null) {
      const employees = db.employees;
      return getLastBulletinsByEmployee(employees)
    }

    if (nameEmployee && activeEmployee === null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name)
      });
      return getLastBulletinsByEmployee(employees)
    }

    if (!nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.active === activeEmployee
      });
      return getLastBulletinsByEmployee(employees)
    }

    if (nameEmployee && activeEmployee !== null) {
      const employees = db.employees.filter((item) => {
        return item.name.includes(name) && item.active === activeEmployee
      });
      return getLastBulletinsByEmployee(employees)
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