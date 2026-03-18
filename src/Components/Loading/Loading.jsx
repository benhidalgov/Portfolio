import React, { useState, useEffect } from 'react';
import './Loading.css';

const magiLogs = [
  "[OK] KERNEL INITIATED",
  "[OK] NEURAL SYNC ESTABLISHED",
  "[OK] MAGI CASPER CONDITION GREEN",
  "[OK] MAGI BALTHASAR CONDITION GREEN",
  "[OK] MAGI MELCHIOR CONDITION GREEN",
  "[!] OVERRIDING SECURITY PROTOCOLS...",
  "[OK] DECRYPTION COMPLETE",
  "ESTABLISHING CONNECTION..."
];

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [currentLogs, setCurrentLogs] = useState([]);

  useEffect(() => {
    // Simular progreso de carga del 0 al 100
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Incremento aleatorio para que se vea más real
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    // Simular logs de consola apareciendo progresivamente
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < magiLogs.length) {
        setCurrentLogs((prev) => [...prev, magiLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <div className="magi-loading-container">
      
      <div className="magi-terminal">
        {currentLogs.map((log, index) => (
          <p key={index} className="magi-log-line">
            <span className="log-timestamp">{`[0.00${index + 1}]`}</span> {log}
          </p>
        ))}
      </div>

      <div className="magi-status-bar-container">
        <div className="magi-status-header">
          <span>SYSTEM_BOOT</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="magi-bar-outer">
          <div 
            className="magi-bar-inner" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <h2 className="magi-title glitch-text" data-text="MAGI SYSTEM">MAGI SYSTEM</h2>
    </div>
  );
};

export default Loading;
