import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const AddWidgetModal = ({ isOpen, onClose, categories, state, onToggleWidget, onAddWidget }) => {
  const [activeTab, setActiveTab] = useState('cspm');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWidget, setNewWidget] = useState({
    name: '',
    text: '',
    type: 'empty'
  });
  const [pendingChanges, setPendingChanges] = useState(new Map());

  if (!isOpen) return null;

  const tabs = [
    { id: 'cspm', label: 'CSPM' },
    { id: 'cwpp', label: 'CWPP' },
    { id: 'registry', label: 'Registry' }
  ];

  // Get all widgets with their category info
  const allWidgets = categories.flatMap(cat =>
    cat.widgets.map(w => ({ ...w, categoryId: cat.id, categoryName: cat.name }))
  );

  // Filter widgets based on search term and active tab
  const filteredWidgets = allWidgets.filter(w => {
    const matchesSearch = searchTerm 
      ? w.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesTab = w.categoryId === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleToggleCheckbox = (categoryId, widget) => {
    const key = `${categoryId}|||${widget.id}`; // Use a unique separator
    const currentState = isWidgetChecked(categoryId, widget.id);
    
    // Store the pending change
    setPendingChanges(prev => {
      const newChanges = new Map(prev);
      newChanges.set(key, !currentState);
      return newChanges;
    });
  };

  const handleConfirm = () => {
    // Apply all pending changes
    pendingChanges.forEach((shouldBeChecked, key) => {
      const [categoryId, widgetId] = key.split('|||'); // Match the separator
      const category = state.categories.find(c => c.id === categoryId);
      const widget = allWidgets.find(w => w.id === widgetId && w.categoryId === categoryId);
      
      if (widget) {
        const currentlyChecked = category?.widgets.some(w => w.id === widgetId) || false;
        
        // Only toggle if the state needs to change
        if (currentlyChecked !== shouldBeChecked) {
          onToggleWidget(categoryId, widget);
        }
      }
    });
    
    // Reset and close
    setPendingChanges(new Map());
    onClose();
  };

  const isWidgetChecked = (categoryId, widgetId) => {
    const key = `${categoryId}|||${widgetId}`; // Use the same separator
    
    // Check if there's a pending change for this widget
    if (pendingChanges.has(key)) {
      return pendingChanges.get(key);
    }
    
    // Otherwise check the current state
    const category = state.categories.find(c => c.id === categoryId);
    return category?.widgets.some(w => w.id === widgetId) || false;
  };

  const handleAddNewWidget = () => {
    if (!newWidget.name.trim() || !newWidget.text.trim()) {
      alert('Please fill in both widget name and text');
      return;
    }

    const widget = {
      id: `custom-${Date.now()}`,
      name: newWidget.name.trim(),
      text: newWidget.text.trim(),
      type: newWidget.type
    };

    onAddWidget(activeTab, widget);
    
    // Reset form
    setNewWidget({ name: '', text: '', type: 'empty' });
    setShowAddForm(false);
  };

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-blue-900 text-white">
          <h2 className="font-semibold text-lg">Add Widget</h2>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-blue-800 rounded transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto">
          <p className="text-sm mb-4 text-gray-600">
            Personalize your dashboard by adding the following widgets
          </p>
          
          {/* Tabs */}
          <div className="flex gap-2 mb-4 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowAddForm(false);
                }}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Add New Widget Button */}
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-sm hover:bg-blue-800 transition-colors"
            >
              <Plus size={16} />
              Create New Widget
            </button>
          )}

          {/* Add New Widget Form */}
          {showAddForm && (
            <div className="mb-5 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
              <h3 className="font-semibold text-sm mb-3 text-gray-800">
                Create New Widget for {activeCategory?.name}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Widget Name *
                  </label>
                  <input
                    type="text"
                    value={newWidget.name}
                    onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                    placeholder="Enter widget name"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Widget Text *
                  </label>
                  <input
                    type="text"
                    value={newWidget.text}
                    onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
                    placeholder="Enter widget description"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Widget Type
                  </label>
                  <select
                    value={newWidget.type}
                    onChange={(e) => setNewWidget({ ...newWidget, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="empty">Empty (No Graph)</option>
                    <option value="donut">Donut Chart</option>
                    <option value="bar">Line Chart</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleAddNewWidget}
                    className="px-4 py-2 bg-blue-900 text-white rounded text-sm hover:bg-blue-800 transition-colors"
                  >
                    Add Widget
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewWidget({ name: '', text: '', type: 'empty' });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Widget List */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-700 mb-2">
              Available Widgets {searchTerm && `(Search: "${searchTerm}")`}
            </h3>
            {filteredWidgets.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                {searchTerm ? 'No widgets found matching your search' : 'No widgets available'}
              </p>
            ) : (
              filteredWidgets.map(widget => {
                const checked = isWidgetChecked(widget.categoryId, widget.id);
                return (
                  <label 
                    key={widget.id} 
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToggleCheckbox(widget.categoryId, widget)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-800">{widget.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{widget.text}</p>
                    </div>
                  </label>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-sm bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;