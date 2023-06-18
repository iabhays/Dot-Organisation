import React from 'react'
import { useNavigate } from "react-router-dom";
import "./style/Page_404.css"

import Rocket from './Images/rocket.svg';
import Earth from './Images/earth.svg';
import Moon from './Images/moon.svg';
import Astronaut from './Images/astronaut.svg';
import IconError from './Images/iconError.svg';

const Page_404 = () => {

    let navigate = useNavigate();

    const goHome = () => {
        navigate("/");
      };

  return (
<div className="stars">
  <div className="central-body">
    <img
      className="image-404"
      src={IconError}
      width="300px"
    />
    <h5>Page Not Found !!</h5>
    <button className="btn-go-home" onClick={goHome}>
        GO BACK HOME
    </button>
  </div>
  <div className="objects">
    <img
      className="object_rocket"
      src={Rocket}
      width="90px"
    />
    <div className="earth-moon">
      <img
        className="object_earth"
        src={Earth}
        width="180px"
      />
      <img
        className="object_moon"
        src={Moon}
        width="80px"
      />
    </div>
    <div className="box_astronaut">
      <img
        className="object_astronaut"
        src={Astronaut}
        width="140px"
      />
    </div>
  </div>
  <div className="glowing_stars">
    <div className="star" />
    <div className="star" />
    <div className="star" />
    <div className="star" />
    <div className="star" />
  </div>
</div>
  )
}

export default Page_404
