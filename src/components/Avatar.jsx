import React, { useState } from 'react';

export default function Avatar({ src, alt, size = 80, shape = 'rounded', className = '', style = {} }) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  const styles = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? '50%' : 'var(--radius-md)',
    objectFit: 'cover',
    display: 'block',
    backgroundColor: 'var(--bg-secondary)',
  };

  return (
    <div 
      className={`avatar-container ${className}`}
      style={{ 
        width: size, 
        height: size, 
        borderRadius: styles.borderRadius, 
        overflow: 'hidden',
        flexShrink: 0,
        border: '1px solid var(--border-color)',
        ...style
      }}
    >
      <img
        src={hasError ? 'https://via.placeholder.com/150' : src}
        alt={alt || 'Avatar'}
        onError={handleError}
        style={styles}
      />
    </div>
  );
}
