# CNAPP Dashboard - Installation & Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**

Check your versions:
```bash
node --version
npm --version
```

---

## 🚀 Quick Start

### Method 1: Create from Scratch

#### Step 1: Create React App
```bash
npx create-react-app cnapp-dashboard
cd cnapp-dashboard
```

#### Step 2: Install Dependencies
```bash
npm install lucide-react
```

#### Step 3: Create Folder Structure
```bash
# Create necessary folders
mkdir -p src/components src/store src/utils
```

#### Step 4: Copy Files

Copy the following files to their respective locations:

**Component Files:**
- `src/components/Dashboard.js`
- `src/components/Header.js`
- `src/components/Widget.js`
- `src/components/AddWidgetModal.js`

**Store Files:**
- `src/store/initialData.js`
- `src/store/dashboardReducer.js`

**Utils Files:**
- `src/utils/constants.js`

**Root Files:**
- `src/App.js`
- `src/index.js`
- `src/index.css`

#### Step 5: Start Development Server
```bash
npm start
```

The application will automatically open at `http://localhost:3000`

---

### Method 2: From Provided Files

If you have all files in a zip:

#### Step 1: Extract Files
```bash
unzip cnapp-dashboard.zip
cd cnapp-dashboard
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Start Application
```bash
npm start
```

---

## 📁 Complete File Structure

```
cnapp-dashboard/
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
├── public/
│   ├── index.html
│   └── favicon.ico
└── src/
    ├── index.js              # Application entry point
    ├── index.css             # Global styles with Tailwind
    ├── App.js                # Main App component
    ├── components/
    │   ├── Dashboard.js      # Main dashboard container
    │   ├── Header.js         # Top navigation header
    │   ├── Widget.js         # Individual widget component
    │   └── AddWidgetModal.js # Modal for adding widgets
    ├── store/
    │   ├── dashboardReducer.js  # State management reducer
    │   └── initialData.js       # Initial dashboard data
    └── utils/
        └── constants.js         # Application constants
```

---

## 🔧 Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode at `http://localhost:3000`

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` folder

### Testing
```bash
npm test
```
Launches the test runner

### Eject (Advanced)
```bash
npm run eject
```
⚠️ **Warning:** This is a one-way operation!

---

## 📦 Dependencies

### Production Dependencies
- **react** (^18.2.0) - Core React library
- **react-dom** (^18.2.0) - React DOM rendering
- **lucide-react** (^0.263.1) - Icon library
- **react-scripts** (5.0.1) - Create React App scripts

### Styling
- **Tailwind CSS** (via CDN in index.css)

---

## 🎯 Features

✅ **Dynamic Widget Management**
- Add widgets to categories
- Remove widgets with one click
- Toggle widgets via checkboxes

✅ **State Management**
- React useReducer for centralized state
- Actions: ADD_WIDGET, REMOVE_WIDGET, TOGGLE_WIDGET
- Persistent state during session

✅ **Beautiful UI**
- Responsive grid layout
- Donut charts, bar charts, empty states
- Smooth transitions and hover effects
- Modal with tabs and checkboxes

✅ **Search & Filter**
- Search widgets by name
- Time filter dropdown
- Category-based organization

---

## 🐛 Troubleshooting

### Issue: Module not found
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Use a different port
PORT=3001 npm start
```

### Issue: Tailwind CSS not loading
**Solution:**
Ensure `index.css` has the Tailwind CDN import:
```css
@import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.3.0/dist/tailwind.min.css');
```

---

## 📝 Usage Guide

### Adding a Widget
1. Click **"Add Widget"** button
2. Select a tab (CSPM, CWPP,