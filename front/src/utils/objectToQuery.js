export default function objectToQueryString(obj) {
  const queryParams = [];
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  
  return queryParams.join('&');
}