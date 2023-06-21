import React, { useContext, useState } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase/firebase.config'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const [showUserOptions, setShowUserOptions] = useState(false);

  const handleUserOptions = () => {
    setShowUserOptions(!showUserOptions);
  };
  return (
    <div className='navbar'>
      <span className="logo">Chatify</span>
      <div className="user">
        <img style={{cursor: "pointer"}} onClick={handleUserOptions} src={currentUser.photoURL} alt="" />
        {showUserOptions && <><span>{currentUser.displayName}</span>
        <button style={{borderRadius: '6px', backgroundColor: "green"}} onClick={()=>signOut(auth)}>logout</button></> }
      </div>
    </div>
  )
}

export default Navbar;

