import React from 'react'
import ReactDOM from 'react-dom/client'
import { TentaclesOverlay } from './TentaclesOverlay'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <TentaclesOverlay 
        targetId={null}
        scale={1} 
        onUpdate={() => {}}
      />
  </React.StrictMode>,
)
