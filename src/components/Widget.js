import { X } from "lucide-react";

const Widget = ({ widget, categoryId, onRemove }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 relative min-h-[200px]">
      <button
        onClick={() => onRemove(categoryId, widget.id)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded transition-colors"
      >
        <X size={12} className="text-gray-400" />
      </button>

      <h3 className="font-semibold text-sm mb-4 pr-6 text-gray-800">
        {widget.name}
      </h3>

      <div className="text-gray-600 text-xs">
        {widget.type === "empty" && (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <svg
              className="w-12 h-12 mb-3 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-sm text-gray-500">{widget.text}</p>
          </div>
        )}

        {widget.type === "donut" && (
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20">
              {widget.id === "cloud-accounts" ? (
                // Blue donut for Cloud Accounts
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray="201"
                    strokeDashoffset="100"
                  />
                </svg>
              ) : (
                // Multi-color donut for Risk Assessment
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="12"
                    strokeDasharray="201"
                    strokeDashoffset="0"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="40"
                    strokeDashoffset="-50"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray="100"
                    strokeDashoffset="-90"
                  />
                </svg>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-gray-800">
                  {widget.id === "cloud-accounts" ? "2" : "9659"}
                </span>
                <span className="text-xs text-gray-500">Total</span>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {widget.id === "cloud-accounts" ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600">Connected (2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs text-gray-600">
                      Not Connected (2)
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-600"></div>
                    <span className="text-xs text-gray-600">Failed (1689)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600">Warning (681)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <span className="text-xs text-gray-600">
                      Not available (36)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">Passed (7253)</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {widget.type === "bar" && (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold text-lg text-gray-800">
                  {widget.text.split(" ")[0]}
                </span>
                <span className="text-xs text-gray-500">{widget.text}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="flex gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">
                  Critical ({widget.details?.critical || 0})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                <span className="text-gray-600">
                  High ({widget.details?.high || 0})
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Widget;
