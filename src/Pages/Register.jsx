import React, { useState } from "react";
import { FaPlusCircle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
  const navigate = useNavigate();

  setTimeout(() => {
    setLoading(false);
  }, 1000);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = selectedFile; // Use the selected file from state

    try {
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
            toast('Account Created Successfully');

          } catch (err) {
            console.log(err);
            setErr(err.message);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chatify</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Type Your Name" />
          <input required type="email" placeholder="Type Your Email" />
          <input required type="password" placeholder="Type a password" />
          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange} // Call handleFileChange when file selection changes
          />
          <label htmlFor="file">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Selected Avatar"
                className="w-8 h-8"
              />
            ) : (
              <>
                <FaPlusCircle style={{fontSize: "18px"}}></FaPlusCircle>
                <span style={{fontSize: "18px", fontWeight: '600'}}>Add an Profile Picture</span>
              </>
            )}
          </label>
          <button style={{backgroundColor: 'green', borderRadius: "8px", cursor: "pointer"}} disabled={loading}>Sign up</button>
          {err && <span style={{color: 'red'}}>{err}</span>}

          {loading && 
        <div style={{ width: "30px", height: "30px", borderRadius: "50%", border: "4px solid #ccc", borderTopColor: "#333", animation: "spin 1s ease-in-out infinite" }}>
          
        </div>
      
      }
        </form>
        <p style={{fontSize: "18px", fontWeight: '600'}}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
