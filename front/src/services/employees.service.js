import api from '@/config/api';
import objectToQueryString from '@/utils/objectToQuery.js';

export const getEmployees = async (data, callback) => {
  const query = objectToQueryString(data);
  const response = await api.get(`/employees?${query}`).then((response) => {
    callback(response.data)
  }).catch((e) => {
    console.log(e);
  });
}

export const getEmployeeById = async (data, callback) => {
  const response = await api.get(`/employees/${data.id}`).then((response) => {
    callback(response.data);
  }).catch((e) => {
    console.log(e)
  })
}