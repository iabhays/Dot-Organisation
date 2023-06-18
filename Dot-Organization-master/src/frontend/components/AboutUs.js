import React  from "react";
import "./style/AboutUs.css"
import { useNavigate } from "react-router-dom";
import Contact from "./Contact"

import EtherIcon from './Images/ether.svg';

const AboutUs = () => {
  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };

  return (
    // <div className="container-fluid mt-5">
      <div>
          <link rel="stylesheet" href="./About.css" />
          <link rel="stylesheet" href="./font-awesome.css" />
          {/* <link rel="stylesheet" href="./aos.css"> */}
          <section className="about-section sec-padding" id="about">
            <div className="container">
              <div className="row">
                <div className="section-title">
                  <h2 data-title="our story" data-aos="fade-up">about us</h2>
                </div>
              </div>
              <div className="row">
                <div className="about-text" data-aos="fade-right">
                  <h3>Welcome To Dot.. organisation</h3>
                  <p>In our project we are trying to create a decentralized platform based on NFT so that we can make NFT’s of Chandigarh University based on blockchain technology using Etherium Smart- Contract. This will not only help in tokenization but enhance security as these NFT’s are immutable with smooth and speedy transactions.</p>
                  <p>Our Mission</p>
                  <p>With the fast growing digital era it’s the urge of time for us to shift to decentralization, web3, and secured environment so we are planning to start a web3 based environment in our university.</p>
                  <p>Our Vision</p>
                  <p>To regularly collaborate with Management of University to help each and every department in their respective domain using the growing web3, Blockchain Technology through our Decentralized Application </p>
                  <p>All in all,  we would like to point out that the NFT markets represent an excellent and profitable market for all designers, crypto fans, and business owners. We only encourage you to be focused, make educated judgments, and be consistent, since any new platform, and designers in particular, may take time to succeed.</p>
                  <button onClick={goExplore} className="btn btn-default">Explore more</button>
                </div>
                <div className="about-img" data-aos="fade-left">
                  <div className="img-box">
                    <img className="coverImg" src={EtherIcon} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="team-section sec-padding" id="team">
            <div className="container">
              <div className="row">
                <div className="section-title">
                  <h2 data-title="team" data-aos="fade-up">our creaters</h2>
                </div>
              </div>
              <div className="row">
                <div className="team-item" data-aos="flip-left" data-aos-duration={1000}>
                  <img className="profileImg" src={require('./Images/Gaurav.jpeg')} />
                  <div className="team-item-info">
                    <h3>Gaurav Maheshwari</h3>
                    <p>( 20BCS9908 )</p>
                  </div>
                </div>
                <div className="team-item" data-aos="flip-left" data-aos-duration={1000}>
                  <img className="profileImg" src={require('./Images/Abhijeet.jpeg')} />
                  <div className="team-item-info">
                    <h3>Abhijeet kumar</h3>
                    <p>( 20BCS9915 )</p>
                  </div>
                </div>
                <div className="team-item" data-aos="flip-left" data-aos-duration={1000}>
                  <img className="profileImg" src={require('./Images/Muskan.jpeg')} />
                  <div className="team-item-info">
                    <h3>Muskan Deswal</h3>
                    <p>( 20BCS9894 )</p>
                  </div>
                </div>
                <div className="team-item" data-aos="flip-left" data-aos-duration={1000}>
                  <img className="profileImg" src={require('./Images/Rajnish.jpeg')} />
                  <div className="team-item-info">
                    <h3>Rajnish Patel</h3>
                    <p>( 20BCS9921 )</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <footer className="footer" id="footer">
            <div className="container">
                  <Contact/>
              <div className="row">
                <div className="copyright">
                  © 2022 - A Dot Organization Product
                </div>
              </div>
            </div>
          </footer>
        </div>
    // </div>
  );
};

export default AboutUs;
