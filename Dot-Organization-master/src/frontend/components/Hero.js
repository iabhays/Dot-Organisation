import React, { useState, useEffect } from "react";
import "./style/Hero.css";
import { useNavigate } from "react-router-dom";
import LiquidButton from './config/LiquidButton';
import LiquidButtonMain from './config/LiquidButtonMain';

const Hero = () => {
  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };

  const goCreate = () => {
    navigate("/create");
  };

  const goWatch = () => {
    navigate("/nftdrag");
  };

  return (
    <div id="hero">
      {/* <img id='hero-background' src={list[0].src}/> */}
      <h1 id="header-text-first"> NFT </h1>
      <h1 id="header-text-second"> Dot... Marketplace</h1>
      <h5 id="header-subtext">Craft, hunt and trade NFT's</h5>

      <div id="hero-buttons">
        <img id="NFTIcon2" src={require('./Images/NFTIcon2.png')} ></img>
        <button id="explore" onClick={goExplore}>
          Explore
        </button>
        <LiquidButton class="liquid-button" onClick={goWatch} name="NFT Cards" background="white" firstcolor="##34ebe5" secondcolor="#eb34ba" />
        <button id="create" onClick={goCreate}>Create</button>
        <img id="NFTIcon1" src={require('./Images/NFTIcon1.png')} ></img>
      </div>
    </div>
  );
};

export default Hero;
