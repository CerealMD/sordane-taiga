// src/ProgressBar.tsx
import React from 'react';
import '../css/progressBar.css'
interface ProgressBarProps {
  progress: { name: string; value: number; progress: number; }; // A number between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    console.log(progress)
    if(!progress){
        return (
          <div className="animated-progress-bar">
          <div className="progress-fill" style={{ width: `0`, float:'left' }}>
            
          </div>
          <span style={{position: 'absolute', marginLeft:  `0`, width: '100%', textAlign: 'center', fontSize:'14px'}} >Total Completed: 100%</span>
        </div>
        )
    }
    return (
      <div className="animated-progress-bar">
        <div className="progress-fill" style={{ width: `${progress.progress}%`, float:'left' }}>
          
        </div>
        <span style={{position: 'absolute', marginLeft:  `-${progress.progress}%`, width: '100%', textAlign: 'center', fontSize:'14px'}} >Total Completed: {progress.progress}%</span>
      </div>
    );
  };

export default ProgressBar;
