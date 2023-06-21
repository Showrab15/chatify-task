// import React, { useContext, useState } from "react";
//  import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db, storage } from "../firebase/firebase.config";
// import { v4 as uuid } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { FaLink, FaRegImage } from "react-icons/fa";

// const Input = () => {
//   const [text, setText] = useState("");
//   const [img, setImg] = useState(null);

//   const { currentUser } = useContext(AuthContext);
//   const { data } = useContext(ChatContext);

//   const handleSend = async () => {
//     if (img) {
//       const storageRef = ref(storage, uuid());

//       const uploadTask = uploadBytesResumable(storageRef, img);

//       uploadTask.on(
//         (error) => {
//           //TODO:Handle Error
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateDoc(doc(db, "chats", data.chatId), {
//               messages: arrayUnion({
//                 id: uuid(),
//                 text,
//                 senderId: currentUser.uid,
//                 date: Timestamp.now(),
//                 img: downloadURL,
//               }),
//             });
//           });
//         }
//       );
//     }
    
    
    
    
    
//     else {
//       await updateDoc(doc(db, "chats", data.chatId), {
//         messages: arrayUnion({
//           id: uuid(),
//           text,
//           senderId: currentUser.uid,
//           date: Timestamp.now(),
//         }),
//       });
//     }

//     await updateDoc(doc(db, "userChats", currentUser.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     await updateDoc(doc(db, "userChats", data.user.uid), {
//       [data.chatId + ".lastMessage"]: {
//         text,
//       },
//       [data.chatId + ".date"]: serverTimestamp(),
//     });

//     setText("");
//     setImg(null);
//   };
//   return (
//     <div className="input">
//       <input
//         type="text"
//         placeholder="Type something..."
//         onChange={(e) => setText(e.target.value)}
//         value={text}
//       />

//       <div className="send">
        
//       <FaRegImage className="w-8 h-8"></FaRegImage>
//         <input
//           type="file"
//           style={{ display: "none" }}
//           id="file"
//           onChange={(e) => setImg(e.target.files[0])}
//         />
//         <label htmlFor="file">
// <FaLink className="w-8 h-8"></FaLink>
//         </label>
//         <button style={{borderRadius: '8px'}} onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Input;



































import React, { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase.config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { FaRegFileVideo, FaRegImage } from "react-icons/fa";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    try {
      let imageUrl = null;
      let videoUrl = null;

      if (img) {
        const imageRef = ref(storage, `images/${uuid()}`);
        const uploadTask = uploadBytesResumable(imageRef, img);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  imageUrl = url;
                  resolve();
                })
                .catch((error) => reject(error));
            }
          );
        });
      }

      if (video) {
        const videoRef = ref(storage, `videos/${uuid()}`);
        const uploadTask = uploadBytesResumable(videoRef, video);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((url) => {
                  videoUrl = url;
                  resolve();
                })
                .catch((error) => reject(error));
            }
          );
        });
      }

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: imageUrl,
          video: videoUrl,
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text,
        },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      setText("");
      setImg(null);
      setVideo(null);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="imageFile"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="imageFile">
          <FaRegImage title="Send Image" style={{color: 'blue', cursor: "pointer"}} className="w-8 h-8" />
        </label>

        <input
          type="file"
          style={{ display: "none" }}
          id="videoFile"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <label htmlFor="videoFile">
          <FaRegFileVideo title="Send Video" style={{color: 'blue', cursor: "pointer"}} className="w-8 h-8" />
        </label>

        <button style={{ borderRadius: "8px" }} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
