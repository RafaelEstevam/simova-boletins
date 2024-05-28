const db = require('../db');
const subscractHoursBetweenDates = require('../utils/substractHoursBetweenDates');

const consolidatedBulletins = () => {
  const employees = db.employees;
  const activities = db.activities;
  const bulletins = db.bulletins;

  const consolidatedBulletins = bulletins.map((bulletin) => {
    const employee = db.employees.find((employee) => bulletin.employeeId === employee.id);
    const appointmentsList = bulletin.appointments.map((appointment) => {
      const activity = activities.find((activity) => appointment.activityId === activity.id);
      appointment.activity = activity;
      return appointment;
    });
    bulletin.employee = employee;
    bulletin.appointmentsList = appointmentsList;
    bulletin.totalHours = subscractHoursBetweenDates(bulletin.startDate.replace(' ', 'T'), bulletin.endDate.replace(' ', 'T'));

    return bulletin;
  });
  return consolidatedBulletins;
}

const bulletinsController = {
  getBulletins: (req, res) => {
    const { name, totalHours } = req.query;
    const employeeName = name === '' ? false : name;
    const employeeTotalHours = totalHours === '' ? false : totalHours;
    const bulletins = consolidatedBulletins();

    if(!employeeName && !employeeTotalHours){
      return res.send(bulletins);
    }

    if(employeeName && !employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employee.name.includes(employeeName)
      });
      return res.send(newBulletins);
    }

    if(!employeeName && employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.totalHours == employeeTotalHours;
      });
      return res.send(newBulletins);
    }

    if(employeeName && employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employee.name.includes(employeeName) && bulletin.totalHours == employeeTotalHours;
      });
      return res.send(newBulletins);
    }
  },

  getBulletinsByEmployeeId: (req, res) => {

    const { id } = req.params;
    const employeeId = id === '' ? false : id;
    const bulletins = consolidatedBulletins();
    
    if(employeeId){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employeeId == employeeId;
      });
      return res.send(newBulletins);
    }

    return res.send([]);
  }
}

module.exports = bulletinsController;