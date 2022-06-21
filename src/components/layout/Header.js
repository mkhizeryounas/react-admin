import { useEffect } from 'react';

import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
} from 'antd';

import { ClockCircleOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
import avtar from '../../assets/images/team-2.jpg';

const data = [
  {
    title: 'New message from Sophie',
    description: (
      <>
        <ClockCircleOutlined /> 2 days ago
      </>
    ),

    avatar: avtar,
  },
];

const menu = (
  <List
    min-width='100%'
    className='header-notifications-dropdown '
    itemLayout='horizontal'
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar shape='square' src={item.avatar} />}
          title={item.title}
          description={item.description}
        />
      </List.Item>
    )}
  />
);

function Header({ name, subName, onPress }) {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to='/'>Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: 'capitalize' }}>
              {name.replace('/', '')}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='ant-page-header-heading'>
            <span
              className='ant-page-header-heading-title'
              style={{ textTransform: 'capitalize' }}
            >
              {subName.replace('/', '')}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className='header-control'>
          <Badge size='small' count={0}>
            <Dropdown overlay={menu} trigger={['click']}>
              <a
                href='#pablo'
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                  style={{ backgroundColor: '#e2e2e2' }}
                  src='https://joeschmoe.io/api/v1/random'
                />
              </a>
            </Dropdown>
          </Badge>

          <Button
            type='link'
            className='sidebar-toggler'
            onClick={() => onPress()}
          >
            <MenuUnfoldOutlined />
          </Button>

          {/* <Link to='/sign-in' className='btn-sign-in'>
            {profile}
            <span>Sign in</span>
          </Link> */}
          {/* <Input
            className='header-search'
            placeholder='Type here...'
            prefix={<SearchOutlined />}
          /> */}
        </Col>
      </Row>
    </>
  );
}

export default Header;
