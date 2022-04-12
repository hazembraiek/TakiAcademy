function GetData(id: string, Array: any[], type = "id") {
  const result = Array.filter((data) => data[type] === id);
  return result;
}

export default GetData;
