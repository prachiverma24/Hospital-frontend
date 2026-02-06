import React from 'react'

export default function Card({ children, title, className = '' }) {
  return (
    <article className={`page-card ${className}`} aria-labelledby={title ? 'card-title' : undefined}>
      {title && <h3 id="card-title" className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </article>
  )
}
