import { NavLink } from 'react-router-dom';

const links = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/new-analysis', label: 'New Analysis' },
  { to: '/app/history', label: 'History' },
  { to: '/app/profile', label: 'Profile' },
];

const Sidebar = () => (
  <aside className="sidebar">
    <h1>Health Intelligence</h1>
    <nav>
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
