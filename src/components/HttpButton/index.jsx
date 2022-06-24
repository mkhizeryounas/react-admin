import { Button } from 'antd';
import useAxios from '../../hooks/useAxios';

const HttpButton = () => {
  const axios = useAxios();

  const sendRequest = async () => {
    const data = await axios.get(
      'https://webhook.site/be41d75f-cbf4-4eba-a398-f275bc01997a'
    );
    console.log({ data });
  };

  return (
    <>
      <Button onClick={sendRequest}>Make Http Request</Button>
    </>
  );
};

export default HttpButton;
