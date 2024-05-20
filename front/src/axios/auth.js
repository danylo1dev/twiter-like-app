import { instance } from "./config";

export async function login(email, password) {
  try {
    return await instance.post("auth/login", {
      email,
      password,
    });
  } catch (err) {
    console.error(err);
  }
}
export async function register(body) {
  try {
    return await instance.post(`auth/register`, body);
  } catch (err) {
    console.error(err);
  }
}
export async function getProfile() {
  try {
    return await instance.get(`auth/me`);
  } catch (err) {
    console.error(err);
  }
}
