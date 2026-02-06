import React from 'react'

export default function Button({ children, onClick, type = 'button', className = 'btn', variant = 'primary', ...props }) {
  const classes = `${className} ${variant === 'secondary' ? 'secondary' : ''}`.trim()
  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  )
}
