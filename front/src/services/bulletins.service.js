import api from '@/config/api';
import objectToQueryString from '@/utils/objectToQuery.js';

export const getBulletins = async (data, callback) => {
  const query = objectToQueryString(data);
  const response = await api.get(`/bulletins?${query}`).then((response) => {
    callback(response.data)
  }).catch((e) => {
    throw new Error('Boletins não encontrados');
  });
}

export const getBulletinsByEmployeeId = async (data, callback) => {
  const response = await api.get(`/bulletins/employees/${data.id}`).then((response) => {
    callback(response.data);
  }).catch((e) => {
    throw new Error('Boletins desse funcionário não encontrados');
  })
}