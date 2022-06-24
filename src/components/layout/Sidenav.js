// import { useState } from "react";
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {
  HomeOutlined,
  TableOutlined,
  CreditCardOutlined,
  UserOutlined,
} from '@ant-design/icons';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <div className='brand'>
        <img src={logo} alt='' />
        <span>Zigzag Inc.</span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        <Menu.Item key='1'>
          <NavLink to='/dashboard'>
            <span
              className='icon'
              style={{
                background: page === 'dashboard' ? color : '',
              }}
            >
              <HomeOutlined />
            </span>
            <span className='label'>Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='2'>
          <NavLink to='/tables'>
            <span
              className='icon'
              style={{
                background: page === 'tables' ? color : '',
              }}
            >
              <TableOutlined />
            </span>
            <span className='label'>Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key='3'>
          <NavLink to='/billing'>
            <span
              className='icon'
              style={{
                background: page === 'billing' ? color : '',
              }}
            >
              <CreditCardOutlined />
            </span>
            <span className='label'>Billing</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item className='menu-item-header' key='5'>
          Account Pages
        </Menu.Item>
        <Menu.Item key='6'>
          <NavLink to='/profile'>
            <span
              className='icon'
              style={{
                background: page === 'profile' ? color : '',
              }}
            >
              <UserOutlined />
            </span>
            <span className='label'>Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
