export const dashboardReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_WIDGET':
        return {
          ...state,
          categories: state.categories.map(cat =>
            cat.id === action.categoryId
              ? { ...cat, widgets: [...cat.widgets, action.widget] }
              : cat
          )
        };
  
      case 'REMOVE_WIDGET':
        return {
          ...state,
          categories: state.categories.map(cat =>
            cat.id === action.categoryId
              ? { ...cat, widgets: cat.widgets.filter(w => w.id !== action.widgetId) }
              : cat
          )
        };
  
      case 'TOGGLE_WIDGET':
        const widget = action.widget;
        const category = state.categories.find(c => c.id === action.categoryId);
        const exists = category.widgets.some(w => w.id === widget.id);
        
        if (exists) {
          // Remove widget
          return {
            ...state,
            categories: state.categories.map(cat =>
              cat.id === action.categoryId
                ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widget.id) }
                : cat
            )
          };
        } else {
          // Add widget
          return {
            ...state,
            categories: state.categories.map(cat =>
              cat.id === action.categoryId
                ? { ...cat, widgets: [...cat.widgets, widget] }
                : cat
            )
          };
        }
  
      default:
        return state;
    }
  };
  