// import React, { useState, useRef, useEffect, } from 'react'
// import logo from '../Images/logo.png';
// import invite from '../Images/invite-icon.png';
// import Client from './Client';


// export default function EditorNavbar() {
//   const [clients, SetClients] = useState(connnectedClients)
//   console.log(clients)
//   return (
//     <>
//       <nav>
//         <div className="logo">
//           <img src={logo} alt="logo" />
//           <div className="logo-header">
//             <h1>Collaborative Code Editor</h1>
//             <p>Realtime collaboration</p>
//           </div>
//         </div>
//         <div className="nav-mid">
//           <div className="room-owner">


//           </div>
//           {/* <div className="run">
//             <input type="button" value="Run" />
//         </div> */}
//           <div className="connected-users">
//             {
//               clients.map((client) => {
//                 // console.log(client.username)
//                 return <Client key={client.socketId} username={client.username} />
//               })
//             }
//           </div>
//         </div>
//         <div className="invite">
//           <img src={invite} alt="invite" />
//           <p>Invite</p>
//         </div>
//       </nav>
//     </>
//   )
// }
