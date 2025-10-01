import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WIDGET_TABS } from '../utils/constants';

const AddWidgetModal = ({ isOpen, onClose, categories, state, onToggleWidget }) => {
  const [activeTab, setActiveTab] = useState('CSPM');

  if (!isOpen) return null;

  const isWidgetChecked = (categoryId, widgetId) => {
    const category = state.categories.find(c => c.id === categoryId);
    return category?.widgets.some(w => w.id === widgetId) || false;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-blue-900 text-white">
          <h2 className="font-semibold">Add Widget</h2>
          <button onClick={onClose} className="p-1 hover:bg-blue-800 rounded transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <p className="text-sm mb-4 text-gray-600">
            Personalise your dashboard by adding the following widget
          </p>
          
          <div className="flex gap-1 mb-4 border-b">
            {WIDGET_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {categories.map(cat => (
              <div key={cat.id}>
                {cat.widgets.map(widget => {
                  const checked = isWidgetChecked(cat.id, widget.id);
                  return (
                    <label 
                      key={widget.id} 
                      className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 cursor-pointer transition-colors mb-2"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleWidget(cat.id, widget)}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm flex-1">{widget.name}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-blue-900 text-white rounded hover:bg-blue-800 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;