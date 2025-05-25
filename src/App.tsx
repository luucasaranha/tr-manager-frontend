import { useState } from 'react';
import './App.css';
import { FinancialTable } from './components/FinantialTable';
import { Home } from './components/Home';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';

type MenuItem = 'home' | 'transactions' | 'settings';

function App() {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('transactions');

  const renderContent = () => {
    switch (activeMenu) {
      case 'home':
        return <Home />;
      case 'transactions':
        return <FinancialTable />;
      case 'settings':
        return <Settings />;
      default:
        return <FinancialTable />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
