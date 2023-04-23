import React from 'react'

const test = ({client}) => {

    console.log(client)

  return (
    <div>test



        <button onClick={()=>{console.log(client)}}>Hello</button>
    </div>
  )
}

export default test