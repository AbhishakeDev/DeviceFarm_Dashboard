import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SingleDevice from './components/SingleDevice';
import { Spinner } from 'reactstrap';
import './DeviceInfo.css';

const DeviceInfo = () => {
  const [deviceDetail, setDeviceDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [beingUsed, setBeingUsed] = useState(false);
  const headers = {
    Authorization:
      'Bearer 53ff04c8b4c64e64ad9079c3bf1508e8c565fbb0f3a54c20a5ebf71b3f90cdc3',
  };

  // function timeout(delay) {
  //   return new Promise((res) => setTimeout(res, delay));
  // }

  useEffect(() => {
    const fetchInfo = async () => {
      const result = await axios.get(`api/v1/devices`, {
        headers: headers,
      });
      console.log(result);
      // await timeout(5000);
      let arr = result?.data?.devices.map((el) => el.serial);
      setDeviceDetail(arr);
      setIsLoading(false);
      setBeingUsed(result.data.devices[0].using);
    };
    fetchInfo();
  }, [beingUsed, deviceDetail]);

  return (
    <div className='mid'>
      {isLoading ? (
        <Spinner
          color='dark'
          style={{
            height: '15rem',
            width: '15rem',
          }}
        >
          Loading...
        </Spinner>
      ) : (
        deviceDetail &&
        deviceDetail.map((el, index) => (
          <SingleDevice className='device-card' key={index} deviceSerial={el} />
        ))
      )}
    </div>
  );
};

export default DeviceInfo;
