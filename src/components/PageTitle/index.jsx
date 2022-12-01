import { Button } from 'antd';

const PageTitle = ({
  title,
  buttonTitle = 'ADD NEW',
  onClick = () => {},
  hideButton = false,
}) => {
  return (
    <>
      <div className='row'>
        <div className='col'>
          <h2 className='font-semibold m-0'>{title}</h2>
        </div>
        <div className='col-auto'>
          {!hideButton ? (
            <Button type='primary' onClick={onClick}>
              {buttonTitle}
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default PageTitle;
