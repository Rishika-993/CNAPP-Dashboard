import React from 'react';
import { X } from 'lucide-react';

const Widget = ({ widget, categoryId, onRemove }) => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200 relative min-h-[180px]">
      <button
        onClick={() => onRemove(categoryId, widget.id)}
        className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <X size={14} className="text-gray-400" />
      </button>
      
      <h3 className="font-bold text-sm mb-4 pr-6">{widget.name}</h3>
      
      <div className="text-gray-600 text-xs">
        {widget.type === 'empty' && (
          <div className="flex flex-col items-center justify-center py-6 text-gray-400">
            <svg className="w-16 h-16 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">{widget.text}</p>
          </div>
        )}
        
        {widget.type === 'donut' && (
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" fill="none" stroke="#e5e7eb" strokeWidth="16"/>
                <circle cx="48" cy="48" r="40" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="251" strokeDashoffset="60"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">2</span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-xs">Connected (2)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="text-xs">Not Connected (2)</span>
              </div>
            </div>
          </div>
        )}
        
        {widget.type === 'bar' && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-base">{widget.text.split(' ')[0]}</span>
                <span className="text-xs">{widget.text}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>Critical ({widget.details.critical})</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                <span>High ({widget.details.high})</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;