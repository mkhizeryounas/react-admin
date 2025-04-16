import { Row, Col } from 'antd';
import AccountButton from '@/components/AccountButton';
import Menu from './Menu';
import './style.scss';

function Header() {
  return (
    <Row gutter={[24, 0]} align='middle'>
      <Col span={24} md={18} style={{ paddingLeft: 0 }}>
        <div className='ant-page-header-heading'>
          <span className='ant-page-header-heading-title'>
            <Menu />
          </span>
        </div>
      </Col>
      <Col span={24} md={6} className='header-control'>
        <AccountButton />
      </Col>
    </Row>
  );
}

export default Header;
