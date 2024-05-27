export default function objectToConditions(obj){
  const keys =  Object.keys(obj);
  const values = Object.values(obj);
  const entries = Object.entries(obj);
  const result = entries.reduce((acc, [key, value]) => {
    if (value !== null && value !== "" && value !== undefined) {
        acc[key] = value;
    }
    return acc;
}, {});
  return result;
}