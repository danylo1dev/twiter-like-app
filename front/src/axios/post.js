import { instance } from "./config";

export async function getAll() {
  try {
    return await instance.get("/post");
  } catch (err) {
    console.error(err);
  }
}
export async function getOneById(id) {
  try {
    return await instance.get(`/post/${id}`);
  } catch (err) {
    console.error(err);
  }
}
export async function create(post) {
  try {
    return await instance.post(`/post`, post);
  } catch (err) {
    console.error(err);
  }
}
export async function update(id, post) {
  try {
    return await instance.patch(`/post${id}`, post);
  } catch (err) {
    console.error(err);
  }
}
export async function remove(id) {
  try {
    return await instance.delete(`/post${id}`);
  } catch (err) {
    console.error(err);
  }
}
