import React from 'react'

export default function Input({ label, id, value, onChange, type = 'text', required = false, className = '', ...props }) {
  return (
    <div className={`form-row ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required ? '*' : ''}
        </label>
      )}
      <input
        id={id}
        aria-label={label}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        {...props}
      />
    </div>
  )
}
