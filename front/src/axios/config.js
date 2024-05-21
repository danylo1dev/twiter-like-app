import axios from "axios";
// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };
const token = sessionStorage.getItem("jwt_token");

export const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
