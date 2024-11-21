import Home from './pages/Home';
import Blank from './pages/Blank';

import { AppstoreAddOutlined, DashboardOutlined } from '@ant-design/icons';

const ROUTES = [
  {
    name: 'dashboard',
    path: '/dashboard',
    exact: true,
    title: 'Dashboard',
    component: Home,
    sidebar: true,
    icon: DashboardOutlined,
  },

  {
    name: 'workflows',
    path: '/workflows',
    title: 'Workflows',
    component: Blank,
    sidebar: true,
    icon: AppstoreAddOutlined,
  },
  {
    name: 'profile',
    path: '/profile',
    exact: true,
    title: 'Profile',
    component: Blank,
    sidebar: false,
  },
];

export default ROUTES;
