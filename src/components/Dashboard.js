import { useReducer, useState } from "react";
import Header from "./Header";
import Widget from "./Widget";
import AddWidgetModal from "./AddWidgetModal";
import { dashboardReducer } from "../store/dashboardReducer";
import { initialDashboardData } from "../store/initialData";
import { Plus, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch({ type: "REMOVE_WIDGET", categoryId, widgetId });
  };

  const handleToggleWidget = (categoryId, widget) => {
    dispatch({ type: "TOGGLE_WIDGET", categoryId, widget });
  };

  const handleAddWidget = (categoryId, widget) => {
    dispatch({ type: "ADD_WIDGET", categoryId, widget });
  };

  const filteredCategories = state.categories
    .map((category) => {
      const filteredWidgets = category.widgets.filter(
        (widget) =>
          widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          widget.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...category, widgets: filteredWidgets };
    })
    .filter((category) => category.widgets.length > 0 || !searchTerm);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="p-4 sm:p-6 pt-20 md:pt-20">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div className="flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">
              CNAPP Dashboard
            </h1>
            {searchTerm && (
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Search results for: "{searchTerm}"
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50 transition-colors whitespace-nowrap"
            >
              Add Widget <Plus size={14} />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              <RefreshCw size={14} />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors hidden sm:block">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="12" cy="5" r="1" />
                <circle cx="12" cy="19" r="1" />
              </svg>
            </button>
            <select className="px-3 sm:px-4 py-2 bg-white border-2 border-blue-900 rounded text-xs sm:text-sm text-blue-900 font-semibold focus:outline-none w-32 sm:w-36 flex-shrink-0">
              <option>Last 2 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>

        {searchTerm &&
        filteredCategories.every((cat) => cat.widgets.length === 0) ? (
          <div className="text-center py-12 px-4">
            <p className="text-gray-500 text-base sm:text-lg">
              No widgets found matching "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.id}>
                <h2 className="text-sm font-bold mb-3 sm:mb-4 text-gray-900">
                  {category.name}
                  {searchTerm && category.widgets.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      ({category.widgets.length} widget
                      {category.widgets.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {category.widgets.map((widget) => (
                    <Widget
                      key={widget.id}
                      widget={widget}
                      categoryId={category.id}
                      onRemove={handleRemoveWidget}
                    />
                  ))}
                  {!searchTerm && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-white rounded-lg p-4 shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center min-h-[180px] sm:min-h-[200px] transition-colors"
                    >
                      <div className="text-center text-gray-400">
                        <Plus size={20} sm-size={24} className="mx-auto mb-2" />
                        <span className="text-xs sm:text-sm">Add Widget</span>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={state.categories}
        state={state}
        onToggleWidget={handleToggleWidget}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
};

export default Dashboard;
