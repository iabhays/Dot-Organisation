import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from 'react-bootstrap'
import { FaEthereum } from "react-icons/fa";
import "./style/NFTCard.css"

const NFTCard = ({ item, buyMarketItem }) => {

  return (
    <Card id="Card" style={{background: "black", border: "solid white"}} >
      <Card.Img id="CardImg" variant="top" src={item.image} />
      <Card.Body color="secondary">
      <Card.Title>{item.name}</Card.Title>
      <Card.Text>
          {item.description}
      </Card.Text>
      </Card.Body>
      <Card.Footer>
      <div className='d-grid'>
          <Button id="CardButton" onClick={() => buyMarketItem(item)} variant="primary" size="lg">
              Buy for <FaEthereum/>{ethers.utils.formatEther(item.totalPrice)} DTP
          </Button>
      </div>
      </Card.Footer>
    </Card>
  );
};

export default NFTCard;