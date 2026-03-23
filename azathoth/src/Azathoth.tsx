import React from 'react';

export const Azathoth: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-900 text-purple-400 p-4 font-mono overflow-y-auto">
      <div className="text-lg font-bold border-b border-purple-800 pb-2 mb-4 flex items-center gap-2">
        <span>🌌 AZATHOTH</span>
        <span className="text-xs text-purple-600 font-normal">ATOM REGISTRY</span>
      </div>
      
      <div className="text-sm space-y-4">
        <p className="text-gray-400">
          The registry is currently dormant. Waiting to connect to external `/atoms` repository...
        </p>
        
        <div className="border border-purple-900/50 rounded bg-purple-900/10 p-3">
          <div className="text-xs text-purple-500 mb-2">Detected External Atoms:</div>
          <ul className="list-disc list-inside text-gray-300">
            <li className="opacity-50">No atoms loaded.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
