const db = require('../db');
const subscractHoursBetweenDates = require('../utils/substractHoursBetweenDates');

const consolidatedBulletins = () => {
  const employees = db.employees;
  const activities = db.activities;
  const bulletins = db.bulletins;

  const consolidatedBulletins = bulletins.map((bulletin) => {
    const employee = employees.find((employee) => bulletin.employeeId === employee.id);
    const appointmentsList = bulletin.appointments.map((appointment) => {
      const activity = activities.find((activity) => appointment.activityId === activity.id);
      appointment.appointmentId = appointment.id;
      return {...appointment, ...activity};
    })

    bulletin.employee = employee;
    bulletin.appointmentsList = appointmentsList;
    bulletin.totalHours = subscractHoursBetweenDates(bulletin.startDate.replace(' ', 'T'), bulletin.endDate.replace(' ', 'T'));

    return bulletin;
  });
  return consolidatedBulletins.sort((a, b) => b.id - a.id);
}

const bulletinsService = {
  getBulletins: (req) => {
    const { name, totalHours } = req.query;
    const employeeName = name === '' ? false : name;
    const employeeTotalHours = totalHours === '' ? false : totalHours;
    const bulletins = consolidatedBulletins();

    if(!employeeName && !employeeTotalHours){
      return bulletins
    }

    if(employeeName && !employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employee.name.includes(employeeName)
      });
      return newBulletins
    }

    if(!employeeName && employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.totalHours == employeeTotalHours;
      });
      return newBulletins
    }

    if(employeeName && employeeTotalHours){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employee.name.includes(employeeName) && bulletin.totalHours == employeeTotalHours;
      });
      return newBulletins
    }
  },
  getBulletinsByEmployeeId: (req) => {
    const { id } = req.params;
    const employeeId = id === '' ? false : id;
    const bulletins = consolidatedBulletins();
    if(employeeId){
      const newBulletins = bulletins.filter((bulletin) => {
        return bulletin.employeeId == employeeId;
      });
      return newBulletins;
    }
    return [];
  },
}

module.exports = {bulletinsService, consolidatedBulletins};