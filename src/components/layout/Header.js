import { useEffect } from 'react';

import { Row, Col, Breadcrumb, Button } from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import AccountButton from '../AccountButton';

import { NavLink } from 'react-router-dom';

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
          <AccountButton />

          <Button
            type='link'
            className='sidebar-toggler'
            onClick={() => onPress()}
          >
            <MenuUnfoldOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
