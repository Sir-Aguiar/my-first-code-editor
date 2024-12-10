import React from "react";

interface IProps {
  logs: string[];
}

const Terminal: React.FC<IProps> = ({ logs }) => {
  return (
    <div className="w-full h-full max-h-64 min-h-64 bg-zinc-800 text-white">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="p-4 space-y-2">
        {logs.map((log, index) => (
          <div key={index} className="text-sm">
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Terminal;
