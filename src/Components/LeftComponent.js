import React,{useEffect, useState} from 'react'
import Client from './Client'

const LeftComponent = ({clients}) => {




  useEffect(()=>{

  },[])
  return (
  <>
  <div className="LeftComponent">
    <div className="file-structure">
        <p>Files</p>
        <div className="file">
        <div className="fileitem"><p>index.js</p></div>
        </div>
    </div>
    <div className="connected">
    <p>Connected Users</p>
    <div className="clients">
    {
      clients.map((client) => {
        return <Client key={client.socketId} username={client.username} />
      })
    }
    </div>
  
    </div>
  </div>
  </>
  )
}

export default LeftComponent
