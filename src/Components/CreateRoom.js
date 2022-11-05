import React, { useState } from 'react'
import logo from '../Images/logo.gif'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CreateRoom() {
  const navigate = useNavigate();
  const [id, setId] = useState('')
  const [username, setUsername] = useState('')
  const handleRoomIdChange = (e) => {
    setId(e.target.value);
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handleEnterEvent = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onJoinClick();
    }
  }
  const CreateRoomID = (e) => {
    e.preventDefault();
    const roomID = uuidv4();
    // console.log(roomID);
    setId(roomID)
    toast.success('created a new room');
  }
  const onJoinClick = () => {
    if (!id || !username) {
      console.log("Room Id and username required")
      toast.error('ROOM ID and Username is required');
      return
    }
    // Redirect to Editor Page
    navigate(`/editor/${id}`, {
      state: {
        username
      }
    })
    
  }

  return (
    <>
      <div className="main">
        <div className="cr-box">
          <div className="logo-section">
            <img src={logo} alt="logo" />
            <div className="line"></div>
            <div className="logo-head">
              <h1>Collaborative Code Editor</h1>
              <p>Realtime Collaboration</p>
            </div>
          </div>
          <div className="form-section">
            <p>Paste invitation room id here</p>
            <input type="text" placeholder='Room ID' onChange={handleRoomIdChange} onKeyUp={handleEnterEvent} value={id} />
            <input type="text" placeholder='Username' onChange={handleUsernameChange} onKeyUp={handleEnterEvent} value={username} />
            <input type="button" value="Join" onClick={onJoinClick} />
            <p>If you don't have an invite then <a href='new room' onClick={CreateRoomID}>New Room</a></p>
          </div>
        </div>
      </div>
    </>
  )
}
