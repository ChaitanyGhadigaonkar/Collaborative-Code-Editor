import React ,{useState,useRef, useEffect,} from 'react'
import'../App.css'
// import EditorNavbar from './EditorNavbar'
import logo from '../Images/logo.png';
import invite from '../Images/invite-icon.png';
import LeftEditor from './LeftEditor'
import Editor from './Editor'
import {initSocket} from '../socketInit'
import ACTIONS from './Actions'
import toast from 'react-hot-toast'
import { useLocation,useParams,useNavigate,Navigate } from 'react-router-dom';
import Client from './Client'
import { io } from 'socket.io-client';
// import RightEditor from './RightEditor'
import Invite from './Invite'



export default function EditorPage() {
  const socketRef=useRef(null);
  const codeRef=useRef(null)
  const location = useLocation();
  const {roomId}=useParams();
  console.log(location.state.username)
  const reactNavigator=useNavigate();
  console.log(roomId);
  const [clients, SetClients] = useState([])


  useEffect(()=>{
    const init =async()=>{
      socketRef.current= await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));
      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username: location.state?.username
      });


      // listening to JOINED
      socketRef.current.on(
        ACTIONS.JOINED,({clients,username,sockedId})=>{
            if(username!== location.state.username){
              toast.success(`${username} joined the room`);
              console.log(`${username} joined the room`)
            }
            SetClients(clients)
            socketRef.current.emit(ACTIONS.SYNC_CODE,({sockedId,code})=>{
              io.to(sockedId).emit(ACTIONS.CODE_CHANGE,{code}); 
            })
        }
      )
      //listening for disconnecting
       socketRef.current.on(ACTIONS.DISCONNECTED,({socketId,username,clients})=>{
        toast.success(`${username} left the meet`);
        console.log(`${username} left the meet`);
        SetClients((prev)=>{
          return prev.filter((client)=> client.sockedId !== socketId)
        })
        SetClients(clients)
        // console.log(SetClients(clients))
        
       })
    }
    init();
    return()=>{
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
     

    }
  },[]);



  // handle errors
  const handleErrors=(err)=>{
    console.log("socket error",err);
    toast.error(err);
    reactNavigator("/");

  }
  if(!location.state){
    <Navigate to="/"/>
  }
  return ( 
    <>
    <nav id="editor-nav">
        <div className="logo">
          <img src={logo} alt="logo" />
          <div className="logo-header">
            <h1>Collaborative Code Editor</h1>
            <p>Realtime collaboration</p>
          </div>
        </div>
        <div className="nav-mid">
          <div className="room-owner">


          </div>
          {/* <div className="run">
            <input type="button" value="Run" />
        </div> */}
          <div className="connected-users">
            {
              clients.map((client) => {
                // console.log(client.username)
                return <Client key={client.socketId} username={client.username} />
              })
            }
          </div>
        </div>
        <div className="invite">
          
          <Invite/>
        </div>
        
      </nav> 



    <div className='main-eWindow'>
    {/* <LeftEditor/> */}
    <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{
      codeRef.current=code;
    }}/>
    {/* <RightEditor/> */}
    </div>
    </>
    
  )
}
