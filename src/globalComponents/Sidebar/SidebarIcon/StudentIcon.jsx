import React from 'react'

export default function StudentIcon(props) {
  return (
    <div id={props.id}>
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M12 6C12 8.21 10.21 10 8 10C5.79 10 4 8.21 4 6L4.11 5.06L1 3.5L8 0L15 3.5V8.5H14V4L11.89 5.06L12 6ZM8 12C12.42 12 16 13.79 16 16V18H0V16C0 13.79 3.58 12 8 12Z" fill={props.color}/>
        </svg>
    </div>
  )
}
