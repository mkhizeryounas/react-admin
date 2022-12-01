import Home from './pages/Home';
import Storage from './pages/Storage';
import Profile from './pages/Profile';
import ApiList from './pages/DatabaseManagement/index';

import {
  DatabaseOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
  ExperimentOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

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
    name: 'database',
    path: '/database',
    title: 'Database',
    component: ApiList,
    sidebar: true,
    icon: DatabaseOutlined,
  },
  {
    name: 'storage',
    path: '/storage',
    title: 'Storage',
    component: Storage,
    sidebar: true,
    icon: AppstoreAddOutlined,
  },
  {
    name: 'apis',
    path: '/apis',
    title: 'Playground',
    component: ApiList,
    sidebar: true,
    icon: ExperimentOutlined,
  },
  {
    name: 'settings',
    path: '/settings',
    title: 'Settings',
    component: ApiList,
    sidebar: true,
    icon: SettingOutlined,
  },
  {
    name: 'profile',
    path: '/profile',
    exact: true,
    title: 'Profile',
    component: Profile,
    sidebar: false,
  },
];

export default ROUTES;
