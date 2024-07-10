import React from 'react'
import aiGuru from '../../assets/images/ai.png'
const AiGurujiBtn = () => {
  return (
    <div
    style={{
      background: 'teal',
    }}
    onClick={() => (window.location.href = '/aiGuruji')}
  >
    <div
      onMouseEnter={e =>
        (e.currentTarget.style.transform = 'scale(1.1)')
      }
      onMouseLeave={e =>
        (e.currentTarget.style.transform = 'scale(1.0)')
      }
      style={{
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <img style={{ height: '100px' }} src={aiGuru} alt="AI Guruji" />
      <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
        Ask AI Guruji ?
      </span>
    </div>
  </div>
  )
}

export default AiGurujiBtn