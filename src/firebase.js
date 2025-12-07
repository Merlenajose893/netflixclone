
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore ,addDoc, collection} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAMcp2pumVRPHm-HyvVqwLDNidpNLrZCyU",
  authDomain: "netflix-clone-a3863.firebaseapp.com",
  projectId: "netflix-clone-a3863",
  storageBucket: "netflix-clone-a3863.firebasestorage.app",
  messagingSenderId: "338136476214",
  appId: "1:338136476214:web:7edbac77e1d01a5db40697",
  measurementId: "G-WL6TWFSCNC"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app);

const signUp=async(name,email,password)=>{
    try {
       const res= await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user
       await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }



}


const login=async(email,password)=>{
    try {
     await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "))

        
        
    }
}

const logout=()=>{
    signOut(auth)
}

export{auth,db,login,logout,signUp}


