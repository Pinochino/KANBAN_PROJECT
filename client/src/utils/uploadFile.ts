import { storage } from "@/firebase/firebaseConfig";
import { replaceName } from "./replaceName";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const uploadFile = async (file: any) => {
  try {
    const fileName = replaceName(file.name); 
    const storageRef = ref(storage, `uploads/${fileName}`); // Reference to the Firebase Storage location

    // Upload the file
    const res = await uploadBytes(storageRef, file);
    console.log("File uploaded successfully:", res);

    // After upload, get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Download URL:", downloadURL);

    return downloadURL; // Return the URL so it can be used in the rest of your logic
  } catch (error) {
    console.error("Error uploading file:", error);
    return 'Error uploading file'; // Return an error message in case something goes wrong
  }
};

export default uploadFile;
