import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const AppLayout = () => (
  <div className="app-shell">
    <Sidebar />
    <div className="content-area">
      <Topbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  </div>
);

export default AppLayout;
