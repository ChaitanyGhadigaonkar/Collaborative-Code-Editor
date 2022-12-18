import React from 'react'
import Avatar from 'react-avatar';
const Client = (props) => {
    // const [socketId,username]=props
  return (
    <div>
      <Avatar name={props.username} size="60" textSizeRatio={1.75} round="20px"/>
    </div>
  )
}

export default Client
