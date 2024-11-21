// import { useState } from "react";
import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import ROUTES from '../../routes';

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <div className='brand'>
        <img src={logo} alt='' c />
        <span
          style={{
            textTransform: 'capitalize',
            marginLeft: '10px',
          }}
        >
          Zigzag
        </span>
      </div>
      <hr />
      <Menu theme='light' mode='inline'>
        {ROUTES.filter((e) => e.sidebar).map((e, i) => {
          const { icon: Icon } = e;
          return (
            <Menu.Item key={i}>
              <NavLink to={e.path}>
                <span
                  className='icon'
                  style={{
                    background: page === e.name ? color : '',
                  }}
                >
                  <Icon />
                </span>
                <span className='label'>{e.title}</span>
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
}

export default Sidenav;
