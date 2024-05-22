import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { app } from "./config";
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogleAndReturnCredential = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  return result;
};
export { signInWithGoogleAndReturnCredential };
