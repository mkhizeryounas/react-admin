import { Menu } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import ROUTES from '@/routes';
import logo from '@/assets/images/logo.png';

const App = ({ color }) => {
  const { pathname } = useLocation();
  let page = pathname.replace('/', '');

  return (
    <>
      <div className='row menu'>
        <div className='brand col'>
          <img src={logo} alt='' />
          <span
            style={{
              textTransform: 'capitalize',
              marginLeft: '10px',
            }}
          >
            Zigzag
          </span>
        </div>
        <Menu
          className='col'
          theme='light'
          mode='horizontal'
          items={ROUTES.filter((e) => e.sidebar).map((e, i) => {
            const { icon: Icon } = e;
            return {
              key: i,
              label: (
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
              ),
            };
          })}
        />
      </div>
    </>
  );
};

export default App;
