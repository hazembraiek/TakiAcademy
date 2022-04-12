const ChildSelectId = {
  id: localStorage.getItem("Token")?.split("-")[2] || "",
};
export default ChildSelectId;
