
type MenuItem = 'home' | 'transactions' | 'settings';

interface SidebarProps {
    activeMenu: MenuItem;
    onMenuChange: (menu: MenuItem) => void;
  }

const MENU_ITEMS: { id: MenuItem; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];
  
  export function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Menu</h2>
        </div>
        <nav className="sidebar-nav">
          {MENU_ITEMS.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => onMenuChange(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    );
  }
  