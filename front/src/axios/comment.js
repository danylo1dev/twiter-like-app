import { instance } from "./config";

export async function getAll(postId) {
  try {
    if (!postId) {
      throw new Error("postId dosent provide");
    }
    return await instance.get("comment?postId=" + postId);
  } catch (err) {
    console.error(err);
  }
}
export async function create(body) {
  try {
    return await instance.post("comment", body);
  } catch (err) {
    console.error(err);
  }
}
