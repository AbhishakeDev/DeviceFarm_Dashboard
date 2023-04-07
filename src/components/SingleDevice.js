import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Spinner } from 'reactstrap';
import './SingleDevice.css';

const SingleDevice = ({ deviceSerial }) => {
  const [beingUsed, setBeingUsed] = useState(false);
  const [device, setDevice] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    Authorization:
      'Bearer 53ff04c8b4c64e64ad9079c3bf1508e8c565fbb0f3a54c20a5ebf71b3f90cdc3',
  };

  useEffect(() => {
    const fetchInfo = async () => {
      // console.log(deviceSerial);
      const result = await axios.get(`api/v1/devices/` + deviceSerial, {
        headers: headers,
      });
      setDevice(result.data.device);
      setIsLoading(false);
      console.log(result);
      setBeingUsed(device.using);
      console.log(device.using);
    };
    fetchInfo();
  }, []);

  var reserveDevice = async (seriale) => {
    const body = {
      serial: seriale,
    };
    const result = await axios.post(`api/v1/user/devices`, body, {
      headers: headers,
    });
    console.log(result);
    setBeingUsed(true);
  };
  var releaseDevice = async (seriale) => {
    const result = await axios.delete(`api/v1/user/devices/` + seriale, {
      headers: headers,
    });
    console.log(result);
    setBeingUsed(false);
  };

  return (
    <Container className='bg-light mid border' fluid>
      {isLoading ? (
        <Spinner
          color='primary'
          style={{
            height: '3rem',
            width: '3rem',
          }}
        >
          Loading...
        </Spinner>
      ) : (
        <div>
          {device.present ? null : <h5 className='busy text'>Not Available</h5>}
          {device.present && (
            <div>
              <h4 className='text'>
                Battery : <span>{device.battery.level}</span>
              </h4>
              <h4 className='text'>
                Status :
                {beingUsed ? (
                  <h5 className='busy text'>Busy</h5>
                ) : (
                  <h4 className='free text'>Free</h4>
                )}
              </h4>
            </div>
          )}
          {/* <h4 className='text'>{device.product}</h4> */}
          <h4 className='text udid'>UDID : {device.serial}</h4>
          <img
            className='img'
            src='https://rukminim1.flixcart.com/image/416/416/k41mp3k0/mobile/f/k/d/realme-x2-rmx1992-original-imafnfe8gu3ghess.jpeg?q=70'
            alt=''
          />
          {device.present && (
            <div className='btn-container'>
              <Button
                className='btn'
                Button
                color='warning'
                disabled={beingUsed}
                onClick={() => reserveDevice(device.serial)}
                // onClick={() => this.reserveDevice(deviceDetail.devices[0].serial)}
              >
                Reserve Device
              </Button>
              <Button
                className='btn'
                color='danger'
                disabled={!beingUsed}
                onClick={() => releaseDevice(device.serial)}
                // onClick={() => this.reserveDevice(deviceDetail.devices[0].serial)}
              >
                Release Device
              </Button>
              <a
                target='_blank'
                rel='noreferrer'
                href={`http://10.20.3.61:7100/#!/control/` + device.serial}
              >
                <Button className='btn' color='primary'>
                  Realtime View
                </Button>
              </a>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default SingleDevice;
