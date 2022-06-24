import { LockOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button, Avatar, Badge } from 'antd';

import { useAuth0 } from '@auth0/auth0-react';
import './styles.css';

const AccountButton = () => {
  const { user, logout } = useAuth0();

  const menu = (
    <Menu
      items={[
        {
          label: 'Sign out',
          key: '1',
          icon: <LockOutlined />,
          onClick: () => logout({ returnTo: window.location.origin }),
        },
      ]}
    />
  );

  return (
    <Badge size='small' count={0}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          type='text'
          size='large'
          className='account-btn'
          icon={
            <Avatar style={{ backgroundColor: '#e2e2e2' }} src={user.picture} />
          }
        >
          <span className='name-span'>{user.name}</span>
        </Button>
      </Dropdown>
    </Badge>
  );
};

export default AccountButton;
