import React, { useReducer, useState } from 'react';
import Header from './Header';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import { dashboardReducer } from '../store/dashboardReducer';
import { initialDashboardData } from '../store/initialData';
import { Plus, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch({ type: 'REMOVE_WIDGET', categoryId, widgetId });
  };

  const handleToggleWidget = (categoryId, widget) => {
    dispatch({ type: 'TOGGLE_WIDGET', categoryId, widget });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
            >
              Add Widget <Plus size={14} />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <RefreshCw size={14} />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
            <select className="px-4 py-2 bg-white border-2 border-blue-900 rounded text-sm text-blue-900 font-semibold focus:outline-none">
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {state.categories.map(category => (
            <div key={category.id}>
              <h2 className="text-sm font-bold mb-4 text-gray-900">{category.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.widgets.map(widget => (
                  <Widget
                    key={widget.id}
                    widget={widget}
                    categoryId={category.id}
                    onRemove={handleRemoveWidget}
                  />
                ))}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center min-h-[200px] transition-colors"
                >
                  <div className="text-center text-gray-400">
                    <Plus size={24} className="mx-auto mb-2" />
                    <span className="text-sm">Add Widget</span>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={state.categories}
        state={state}
        onToggleWidget={handleToggleWidget}
      />
    </div>
  );
};

export default Dashboard;