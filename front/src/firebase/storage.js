import { app } from "./config";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
export const projectStorage = getStorage(app, "gs://twiter-like.appspot.com");

export const getImg = async (url) => {
  try {
    const httpsReference = ref(projectStorage, url);
    const res = await getDownloadURL(httpsReference);
    return res;
  } catch (err) {
    console.log(err);
  }

  // .then((url) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.responseType = "blob";
  //   xhr.onload = (event) => {
  //     const blob = xhr.response;
  //   };
  //   xhr.open("GET", url);
  //   xhr.send();

  //   console.log(url);
  //   return url;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};
