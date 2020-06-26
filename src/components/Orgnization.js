import React from 'react';
import { Avatar } from 'antd';

const orgnizations = [
  {
    name: 'HNKH-2019',
    description: 'HNKH - DHQG-HCM',
    src:
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658071/sponsor/hnkh_drqzna.png',
  },
  {
    name: 'Khoa CNTT',
    description: 'Khoa CNTT - DH KHTN',
    src:
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/fit_baduky.png',
  },

  {
    name: 'Khoa CNTT',
    description: 'DH Khoa Hoc Tu Nhien',
    src:
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/git_vumynk.png',
  },
  {
    name: 'DH Khoa Hoc Tu Nhien',
    description: 'DH KHTN - TP HCM',
    src:
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/hcmus_dvegyf.jpg',
  },
  {
    name: 'VNU-HCMUS',
    description: 'DHQG-HCM',
    src:
      'https://res.cloudinary.com/eventinyourhand/image/upload/v1592658069/sponsor/dhqg_bq799b.png',
  },
];

class Orgnization extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-between mt-3 mb-4 pl-5">
        {orgnizations.map((orgnization, index) => (
          <div className="orgnization" key={index}>
            <Avatar src={orgnization.src} size={160} />
            <p className="name">{orgnization.name}</p>
            <p className="description">{orgnization.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Orgnization;
