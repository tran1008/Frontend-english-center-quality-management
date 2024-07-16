import React from 'react'

function AppCard(props) {
 const className = "bg-white rounded-lg shadow-md p-4 " + props.className;
  return (
    <div className={className} style={{borderRadius:"16px"}}>{props.children}</div>
  )
}

export default AppCard