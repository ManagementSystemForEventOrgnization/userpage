import React, { Component } from 'react';
import { Card } from 'antd';
const { Meta } = Card;
class AboutUs extends Component {
  render() {
    const src = "https://res.cloudinary.com/eventinyourhand/image/upload/v1593275219/Banners/32673433_2093346450919377_276099382758080512_n_bapx1g.jpg?fbclid=IwAR2Y9oDRqjSJawXeYxnIECy3eo1h_DgpAv_zdKrBhWFMZoyvSvxnjQ6ZxRE   "
    const src1 = "https://res.cloudinary.com/eventinyourhand/image/upload/v1593275219/Banners/105510887_595454721100759_3981314115618238483_n_vgv9rk.jpg?fbclid=IwAR3t6LpobIpSVBlw-EAeO9TwcYqnkcy6F_5YaVaV9lCh4WexPPeVGga5ipE"
    const src2 = "https://res.cloudinary.com/dwt4njhmt/image/upload/v1593276316/mo_gcoftr.jpg"
    const src3 = "https://res.cloudinary.com/dwt4njhmt/image/upload/v1593276940/74605500_1426698770810804_5722543837402890240_n_lfdlzc.jpg"
    const src4 = "https://res.cloudinary.com/dwt4njhmt/image/upload/v1593276946/18839681_1960660600835689_3357853079108671791_o_wmcvhn.jpg"
    return (
      <div className="aboutUs">
        <div className="banner"></div>
        {/* https://demo2.wpopal.com/spker/wp-content/uploads/2019/07/rev_sliderhome3.jpg */}
        <h1 style={{ textAlign: 'center', marginTop: '10%' }}>WHY WE ARE HERE</h1>

        <div className="row p-2">
          <div className="col ">
            <img className="img" alt="example" src="https://res.cloudinary.com/eventinyourhand/image/upload/v1593275221/Banners/104668593_743296559750215_2152752397053448867_n_uvzp6i.jpg?fbclid=IwAR0-0GQzM3lt07kX41l8ZkAgxJi4mJMffHPxOgKoXG9conSzzFhIJXy54tI" />
          </div>
          <div className="col">
            <img className="img" alt="example" src={src} />
          </div>
          <div className="col">
            <img className="img" alt="example" src={src1} />
          </div>
        </div>
        <div className="row p-2">
          <div className="col ">
            <img className="img" alt="example" src={src4} />
          </div>
          <div className="col">
            <img className="img" alt="example" src={src2} />
          </div>
          <div className="col">
            <img className="img" alt="example" src={src3} />
          </div>
        </div>





      </div>





    )
  }
}

export default AboutUs;
